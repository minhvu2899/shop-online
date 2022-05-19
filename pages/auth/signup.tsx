import axios from "axios";
import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import React from "react";
import FormSignUp from "../../components/form/signUp";
import LayOutAuth from "../../components/laypout/layout-auth";

const SignUp = () => {
  const router = useRouter();
  const handleSubmit = async ({
    email,
    password,
    name,
    passwordConfirm,
  }: {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
  }): Promise<any> => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/users/signup",
        {
          name,
          email,
          password,
          passwordConfirm,
        }
      );

      localStorage.setItem("access-token", data.token);
      router.replace("/auth/signin");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <FormSignUp onSubmit={handleSubmit} />
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
