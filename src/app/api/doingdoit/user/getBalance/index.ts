//import { getUserBalance } from '@/utils/models/user-model';
//import { authFromServer } from '@/utils/services/useAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;
  if (!token)
    return res
      .status(400)
      .json({ status: false, message: 'Missing parameters.' });

  /*
  const { _id: userId } = await authFromServer(token);

  const balance = await getUserBalance(userId);
  */

  const balance = { success: true, userBalance: 1000, message: 'Success' };

  if (!balance.success)
    return res.status(400).json({ status: false, message: balance.message });

  return res.status(200).json({ status: true, balance: balance.userBalance });

}
