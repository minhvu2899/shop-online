import { NextApiRequest, NextApiResponse } from "next";
interface Data {
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
    status: string;
    slug: string;
  }[];
}
const getProductById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  return { products: [] };
};
