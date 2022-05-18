import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import React from "react";
import FormSignUp from "../../components/form/signUp";
import LayOutAuth from "../../components/laypout/layout-auth";

const SignUp = () => {
  return (
    <div>
      <FormSignUp />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const req = context.req as NextApiRequest;
  const token = await getToken({ req, secret });
  console.log("token", token);
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};
SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};
export default SignUp;
