import Image from "next/image";
import React, { useEffect } from "react";
import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import LayOutAuth from "../../components/laypout/layout-auth";
import FormUserProfile from "../../components/form/user-profile";
import styles from "../../styles/form.module.scss";
interface UserProps {
  userInfo: {
    name: string;
    email: string;
    picture: string;
  };
}
const UserProfilePage = ({ userInfo }: UserProps) => {
  return (
    <div className={styles["form-profile"]}>
      <h3 className={styles["form-profile-title"]}>Thông tin cá nhân</h3>
      <FormUserProfile userInfo={userInfo} />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const secret = process.env.NEXTAUTH_SECRET;

  const req = context.req as NextApiRequest;
  const token = await getToken({ req, secret });

  if (!token) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { userInfo: token } };
};
UserProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};
export default UserProfilePage;
