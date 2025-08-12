import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '../../../../../generated/prisma';
import { AuthPayload, ROLES, UserRole } from '@shared/middlewares/auth/src/lib/types';
import { signToken } from '@shared/middlewares/auth/src/lib/jwt';

dotenv.config({ path: path.resolve(__dirname, '../../../../..', '.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret';

if (!JWT_SECRET || JWT_SECRET === 'super_secret') {
  console.error('❌ JWT_SECRET not set correctly in .env');
  process.exit(1);
}

const prisma = new PrismaClient();

async function generateTokenForEmail(email?: string): Promise<string> {
  try {
    let user = null;
    let vendor = null;

    if (!email) {
      vendor = await prisma.vendor.findFirst({ orderBy: { createdAt: 'desc' } });

      if (vendor?.userId) {
        user = await prisma.user.findUnique({ where: { id: vendor.userId } });
      } else {
        user = await prisma.user.findFirst({ orderBy: { createdAt: 'desc' } });
      }
    } else {
      user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        vendor = await prisma.vendor.findUnique({ where: { email } });

        if (vendor?.userId) {
          user = await prisma.user.findUnique({ where: { id: vendor.userId } });
        }
      }
    }

    if (!vendor && user?.id) {
      vendor = await prisma.vendor.findFirst({ where: { userId: user.id } });
    }

    let payload: AuthPayload;

    if (vendor) {
      if (!vendor.email) throw new Error('Vendor email is null');

      payload = {
        userId: vendor.userId ?? undefined,
        email: vendor.email,
        role: ROLES.VENDOR,
        vendorId: vendor.id,
      };
    } else if (user) {
      if (!user.email) throw new Error('User email is null');

      const role = user.role ?? ROLES.BUYER;

      payload = {
        userId: user.id,
        email: user.email,
        role: role as UserRole,
      };
    } else {
      throw new Error(`❌ No valid user or vendor data found for ${email}`);
    }

    // ✅ Now safe to generate token
    const token = signToken(payload, JWT_SECRET);

    // ✅ Store token in UserToken table
    await prisma.userToken.create({
      data: {
        token,
        userId: payload.userId ?? null,
        vendorId: payload.vendorId ?? null,
        revoked: false,
        createdAt: new Date(),
        // expiresAt: null,
      },
    });

    console.log('\n🔐 Generated JWT Token:\n');
    console.log(token);
    console.log('\n👉 Use in Authorization header:\n');
    console.log(`Authorization: Bearer ${token}`);

    return token;
  } catch (err) {
    console.error('❌ Error generating token:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
(async () => {
  try {
    await generateTokenForEmail(); // or pass an email string
  } catch (err) {
    console.error('❌ Failed to generate token:', err);
  }
})();