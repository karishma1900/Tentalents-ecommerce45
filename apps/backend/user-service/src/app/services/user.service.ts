import { PrismaClient, UserRole } from '../../../generated/user-service';
import { hashPassword, comparePassword, generateJWT } from '@shared/auth';
import { produceKafkaEvent as publishEvent } from '@shared/kafka';
import { KAFKA_TOPICS } from '@shared/kafka';
import { supabase } from '@shared/middlewares/auth/supabaselogin/supabaseClient';
import { sendEmail } from '@shared/middlewares/email/src/index';
import { logger } from '@shared/logger';
import { response } from 'express';

const prisma = new PrismaClient();

interface RegisterUserParams {
  email: string;
  password: string;
  phone: string;
  name: string;
  role?: UserRole;
}

interface LoginUserParams {
  email: string;
  password: string;
}

export const userService = {
   // Step 1: Send OTP
  initiateRegistrationOtp: async (email: string) => {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error('User already exists');

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

      await prisma.pendingUserOtp.upsert({
        where: { email },
        update: { otp, expiresAt },
        create: { email, otp, expiresAt },
      });

      await sendEmail({
        to: email,
        subject: 'Your OTP Code for Registration',
        html: `<p>Your OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
      });

      logger.info(`[UserService] OTP sent to ${email}`);
      return { message: 'OTP sent to email' };
    } catch (err: any) {
      // response.status(400).json({ error: err.message || 'Something went wrong' });
      logger.error('[UserService] initiateRegistrationOtp error:', err);
      throw err;
    }
  },
  // resen otp 
resendRegistrationOtp: async (email: string) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    // Optionally, check if there's a recent OTP request to throttle resends (rate limiting)
    const recentOtp = await prisma.pendingUserOtp.findUnique({ where: { email } });
    if (recentOtp && recentOtp.expiresAt > new Date(Date.now() - 1 * 60 * 1000)) {
      // Prevent resend if OTP was sent less than 1 min ago (example)
      throw new Error('Please wait before requesting a new OTP');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await prisma.pendingUserOtp.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt },
    });

    await sendEmail({
      to: email,
      subject: 'Your OTP Code for Registration (Resent)',
      html: `<p>Your new OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    logger.info(`[UserService] OTP resent to ${email}`);
    return { message: 'OTP resent to email' };
  } catch (err) {
    logger.error('[UserService] resendRegistrationOtp error:', err);
    throw err;
  }
},

  // Step 2: Verify OTP
  verifyEmailOtp: async (email: string, otp: string) => {
    try {
      const record = await prisma.pendingUserOtp.findUnique({ where: { email } });
      if (!record || record.otp !== otp || record.expiresAt < new Date()) {
        throw new Error('Invalid or expired OTP');
      }

      logger.info(`[UserService] OTP verified for ${email}`);
      return { verified: true };
    } catch (err) {
      logger.error('[UserService] verifyEmailOtp error:', err);
      throw err;
    }
  },

  // Step 3: Complete registration after OTP verified
  completeRegistration: async ({
    email,
    password,
    name,
    phone,
    role = UserRole.buyer,
  }: {
    email: string;
    password: string;
    name?: string;
    phone?: string;
    role?: UserRole;
  }) => {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error('User already exists');

      const otpRecord = await prisma.pendingUserOtp.findUnique({ where: { email } });
      if (!otpRecord || otpRecord.expiresAt < new Date()) {
        throw new Error('OTP verification expired or not found');
      }

      const hashed = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashed,
          name: name || '',
          phone: phone || '',
          role,
        },
      });

      await prisma.pendingUserOtp.delete({ where: { email } });

      const kafkaPayload = { userId: user.id, email: user.email, role: user.role };
      await publishEvent({
        topic: KAFKA_TOPICS.USER.CREATED,
        messages: [{ value: JSON.stringify(kafkaPayload) }],
      });

      await publishEvent({
        topic: KAFKA_TOPICS.EMAIL.USER_CREATED,
        messages: [{ value: JSON.stringify({ email: user.email }) }],
      });

      if (user.role === UserRole.seller) {
        await publishEvent({
          topic: KAFKA_TOPICS.USER.VENDOR_REGISTERED,
          messages: [
            {
              value: JSON.stringify({
                userId: user.id,
                email: user.email,
                phone: user.phone,
                status: 'pending',
              }),
            },
          ],
        });
      }

      logger.info(`[UserService] ✅ OTP-based registration complete for ${email}`);
      return { id: user.id, email: user.email, role: user.role };
    } catch (err) {
      logger.error('[UserService] completeRegistration error:', err);
      throw err;
    }
  },


  loginUser: async ({ email, password }: LoginUserParams) => {
    try {
      logger.info('[UserService] 🔑 Login attempt for:', email);
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        logger.warn('[UserService] ❌ Email not found');
        throw new Error('Invalid credentials');
      }

      if (!user.password) {
        logger.warn('[UserService] ❌ User has no password (OAuth account)');
        throw new Error('This account uses Google Login. Please sign in with Google.');
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        logger.warn('[UserService] ❌ Password mismatch');
        throw new Error('Invalid credentials');
      }

      logger.info('[UserService] ✅ Authenticated:', user.email);
      return generateJWT({ userId: user.id, email: user.email, role: user.role });
    } catch (err: any) {
      logger.error('[UserService] ❌ Login error:', err.message || err);
      throw err;
    }
  },

  getUserProfile: async (userId: string) => {
    try {
      if (!userId) throw new Error('User ID is required');

      logger.info('[UserService] 📄 Fetching profile for ID:', userId);

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, role: true, name: true, phone: true },
      });

      if (!user) throw new Error(`User with ID ${userId} not found`);

      return user;
    } catch (err: any) {
      logger.error('[UserService] ❌ getUserProfile error:', err.message || err);
      throw err;
    }
  },

  updateUserRole: async (userId: string, newRole: UserRole) => {
    try {
      if (!userId || !newRole) throw new Error('userId and newRole are required');

      logger.info(`[UserService] 🔄 Updating role for ${userId} to ${newRole}`);
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
      });

      return updated;
    } catch (err: any) {
      logger.error('[UserService] ❌ updateUserRole error:', err.message || err);
      throw err;
    }
  },

  googleLoginWithSupabase: async (accessToken: string) => {
    try {
      if (!accessToken) throw new Error('Access token is required');

      const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(accessToken);

      if (error) {
        logger.error('[UserService] Supabase getUser error:', error);
        throw new Error('Invalid Supabase token');
      }

      if (!supabaseUser) throw new Error('User not found from Supabase token');

      const email = supabaseUser.email;
      const phone = supabaseUser.phone ?? null;
      const userMetadata = supabaseUser.user_metadata || {};
      const name = userMetadata.full_name || userMetadata.name || 'Google User';

      if (!email) throw new Error('Email is required from Supabase');

      logger.info('[UserService] Supabase user info:', { email, name, phone });

      let existingUser = await prisma.user.findUnique({ where: { email } });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email,
            phone,
            name,
            password: '', // OAuth user has no password
            role: UserRole.buyer,
          },
        });
        logger.info('[UserService] New user created:', existingUser.id);
      } else {
        logger.info('[UserService] Existing user found:', existingUser.id);
      }

      const token = generateJWT({
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      });

      return { token, user: existingUser };
    } catch (err) {
      logger.error('[UserService] googleLoginWithSupabase error:', err);
      throw err;
    }
  },

  // Placeholder for Firebase or other OAuth login
  oauthLogin: async (provider: string, accessToken: string) => {
    try {
      // Example: you can extend this method to support Firebase or others
      logger.info(`[UserService] OAuth login attempt with provider: ${provider}`);

      // TODO: Add logic for Firebase or other OAuth provider to validate token,
      // get user info, create/find user in DB, and return JWT.

      throw new Error('OAuth login not implemented yet');
    } catch (err) {
      logger.error(`[UserService] oauthLogin error:`, err);
      throw err;
    }
  },
};
