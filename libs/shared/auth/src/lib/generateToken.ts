import { signToken } from './jwt';
import { AuthPayload } from './types';
import dotenv from 'dotenv';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Load .env from root
dotenv.config({ path: path.resolve(__dirname, '../../../../..', '.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret';

if (!JWT_SECRET || JWT_SECRET === 'super_secret') {
  console.error('❌ JWT_SECRET not set correctly in .env');
  process.exit(1);
}

const payload: AuthPayload = {
  userId: 'abc123',
  email: 'admin@example.com',
  role: 'super_admin',
};

const token = signToken(payload, JWT_SECRET, '1h');

console.log('\n🔐 Generated JWT Token:\n');
console.log(token);
console.log('\n👉 Use in Authorization header:\n');
console.log(`Authorization: Bearer ${token}`);
