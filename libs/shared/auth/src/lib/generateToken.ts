import { signToken } from './jwt';
import { AuthPayload, UserRole } from './types';
import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '../../../../../apps/backend/user-service/generated/user-service';

dotenv.config({ path: path.resolve(__dirname, '../../../../..', '.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret';

if (!JWT_SECRET || JWT_SECRET === 'super_secret') {
  console.error('❌ JWT_SECRET not set correctly in .env');
  process.exit(1);
}

const prisma = new PrismaClient();

async function generateTokenForEmail(email?: string) {
  try {
    let user;

    if (email) {
      user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }
    } else {
      // No email provided — fetch the latest created user in DB
      user = await prisma.user.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      if (!user) {
        throw new Error('No users found in the database');
      }
    }

    // Use actual user UUID here for token
    const payload: AuthPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const token = signToken(payload, JWT_SECRET, '1h');

    console.log('\n🔐 Generated JWT Token:\n');
    console.log(token);
    console.log('\n👉 Use in Authorization header:\n');
    console.log(`Authorization: Bearer ${token}`);

    return token;
  } catch (err) {
    console.error('Error generating token:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function immediately (no email means first user in DB)
(async () => {
  try {
    await generateTokenForEmail();
  } catch (err) {
    console.error('Failed to generate token:', err);
  }
})();
