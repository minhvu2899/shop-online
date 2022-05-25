import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { connectDatabase } from "../../../lib/db";
const secret = process.env.NEXTAUTH_SECRET;
interface Data {
  userId: string;
  name: string;
  picture: string;
  email: string;
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    const db = client.db();
    const token = await getToken({ req, secret });

    if (token) {
      const userId = token.userId as string;

      const carts = await db
        .collection("carts")
        .find({ user: new ObjectId(userId) })
        .sort({ _id: -1 })
        .toArray();
      client.close();
      res.status(200).json({ carts });
    } else {
      res.status(401).json({ message: "Please login" });
    }
  } catch (error) {
    res.status(500).json({ message: "Get data failed!" });
    return;
  }
}

export default handler;
