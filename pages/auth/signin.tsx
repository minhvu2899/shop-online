import React, { useContext, useEffect, useState } from "react";
import FormSignIn from "../../components/form/signIn";
import { signIn } from "next-auth/react";
import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import LayOutAuth from "../../components/laypout/layout-auth";
import { useRouter } from "next/router";
import NotificationContext from "../../store/notification-context";
import AuthContext from "../../store/auth-context";
import useSWR from "swr";
import axios from "axios";
import Loading from "../../components/loading";
interface IResult {
  error: string;
  status: number;
  ok: number;
  url: string;
}

const SignInPage = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const fetcher = async (url: string) => {
  //   setLoading(true);
  //   const result = await axios.get(url);
  //   setLoading(false);
  //   return result.data;
  // };

  // const { data: userInfo, error } = useSWR("/api/user/jwt", fetcher);
  // if (error) {
  //   console.log(error);
  // }
  // useEffect(() => {
  //   if (userInfo) {
  //     authCtx.login(userInfo);
  //   }
  // }, [userInfo, authCtx]);
  const notificationCtx = useContext(NotificationContext);
  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const result: IResult | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    const { error } = result!;
    if (!error) {
      notificationCtx.showNotification({
        message: "Login Successfully",
        status: "success",
      });
      console.log(result);
      setLoading(false);
      // authCtx.login({})
      router.replace("/");
    } else {
      notificationCtx.showNotification({
        message: "Some thing went wrong! Please try again",
        status: "error",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <FormSignIn onSubmit={handleSubmit} />
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
SignInPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};

export default SignInPage;
