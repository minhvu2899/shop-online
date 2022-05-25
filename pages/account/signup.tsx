import axios from "axios";
import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import FormSignUp from "../../components/form/signUp";
import LayOutAuth from "../../components/laypout/layout-auth";
import Loading from "../../components/loading";
import NotificationContext from "../../store/notification-context";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const notificationCtx = useContext(NotificationContext);
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
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`, {
        name,
        email,
        password,
        passwordConfirm,
      });
      setLoading(false);
      notificationCtx.showNotification({
        message: "Signup Successfully",
        status: "success",
      });

      router.replace("/account/signin");
    } catch (e) {
      console.log(e);

      setLoading(false);
      if (axios.isAxiosError(e)) {
        console.log("error message: ");
        notificationCtx.showNotification({
          message: `Something went wrong`,
          // message: `${e.response?.data?.message}`,
          status: "error",
        });
      } else {
        notificationCtx.showNotification({
          message: `Something went wrong`,
          status: "error",
        });
      }
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <FormSignUp onSubmit={handleSubmit} />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const req = context.req as NextApiRequest;
  const token = await getToken({ req, secret });

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
