import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://vhm:vhm020899@cluster0.s1iv0.mongodb.net/ShopOnline"
  );

  return client;
}
