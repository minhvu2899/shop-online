import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXTAUTH_SECRET;
interface Data {
  accessToken: string;
  userInfo: {
    name: string;
    email: string;
    userId: string;
    picture: string;
  };
}
const getUserInfo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const userInfo = (await getToken({ req, secret })) as {
    name: string;
    email: string;
    userId: string;
    picture: string;
  };
  res.json({
    accessToken: req.cookies["next-auth.session-token"],
    userInfo,
  });
};
export default getUserInfo;
