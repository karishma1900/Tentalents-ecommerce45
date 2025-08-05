// pages/api/verify-token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../supabaselogin/supabaseClient'; // ✅ Now it exists

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = req.body;

const { data, error } = await supabaseAdmin.auth.getUser(accessToken); // ✅ This works now

  if (error || !data.user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.status(200).json({ user: data.user });
}
