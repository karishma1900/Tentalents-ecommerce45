import { signToken } from './jwt';
// Remove this import because you'll import UserRole from Prisma client
// import { AuthPayload, UserRole } from './types';  

import dotenv from 'dotenv';
import path from 'path';

// Import PrismaClient and UserRole enum from generated Prisma client
import { PrismaClient, UserRole } from '../../../../../apps/backend/user-service/generated/user-service';

dotenv.config({ path: path.resolve(__dirname, '../../../../..', '.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret';

if (!JWT_SECRET || JWT_SECRET === 'super_secret') {
  console.error('❌ JWT_SECRET not set correctly in .env');
  process.exit(1);
}

const prisma = new PrismaClient();

// Use Prisma enum UserRole for role here:
const DUMMY_USER = {
  email: 'dummy@example.com',
  name: 'Dummy User',
  role: UserRole.buyer,  // <-- Use enum value, not string literal
};

async function generateTokenForEmail(email?: string) {
  try {
    let user;

    if (email) {
      user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error(`❌ User with email ${email} not found`);
      }
    } else {
      // No email provided — get the most recent user
      user = await prisma.user.findFirst({
        orderBy: { createdAt: 'desc' },
      });

      if (!user) {
        console.warn('⚠️ No users found. Creating dummy user...');

        user = await prisma.user.create({
          data: {
            email: DUMMY_USER.email,
            name: DUMMY_USER.name,
            role: DUMMY_USER.role,
          },
        });

        console.log(`✅ Dummy user created: ${user.email}`);
      }
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,  // Typecast just in case, but should be correct from DB
    };

    const token = signToken(payload, JWT_SECRET, '1h');

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

// Run the function
(async () => {
  try {
    await generateTokenForEmail();
  } catch (err) {
    console.error('❌ Failed to generate token:', err);
  }
})();
