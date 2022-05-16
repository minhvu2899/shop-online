import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXTAUTH_SECRET;
interface Data {
  name?: string;
  picture?: string;
  message?: string;
}
const getUserInfo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const token = await getToken({ req, secret });
  res.json(token as Data);
};
export default getUserInfo;
