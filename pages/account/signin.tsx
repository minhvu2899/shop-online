import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import FormSignIn from "../../components/form/signIn";
import LayOutAuth from "../../components/laypout/layout-auth";
import Loading from "../../components/loading";
import AuthContext from "../../store/auth-context";
import NotificationContext from "../../store/notification-context";
interface IResult {
  error: string;
  status: number;
  ok: number;
  url: string;
}

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(false);
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
