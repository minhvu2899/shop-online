import React, { useContext } from "react";
import FormSignIn from "../../components/form/signIn";
import { signIn } from "next-auth/react";
import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import LayOutAuth from "../../components/laypout/layout-auth";
import { useRouter } from "next/router";
import NotificationContext from "../../store/notification-context";
interface IResult {
  error: string;
  status: number;
  ok: number;
  url: string;
}

const SignInPage = () => {
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
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
      router.replace("/");
    } else {
      notificationCtx.showNotification({
        message: "Some thing went wrong! Please try again",
        status: "error",
      });
      return;
    }
  };
  return (
    <div>
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
