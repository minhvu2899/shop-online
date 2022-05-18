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
  // const [userInfo, setUserInfo] = React.useState<{
  //   name: string;
  //   picture: string;
  //   email: string;
  // }>();
  // useEffect(() => {
  //   const fetchU = async () => {
  //     const user = await fetch("/api/user/jwt");
  //     const data = await user.json();
  //     setUserInfo(data);
  //     console.log("data", data);
  //   };
  //   fetchU();
  // }, []);
  console.log(userInfo);
  return (
    <div className={styles["form-profile"]}>
      <h3 className={styles["form-profile-title"]}>Thông tin cá nhân</h3>
      <FormUserProfile userInfo={userInfo} />
      {/* {userInfo && (
        <>
          <p>{userInfo.name}</p>
          <Image
            src={userInfo.picture}
            // className={styles["header__user-avatar"]}
            width={200}
            height={200}
            alt={userInfo.name}
          />
          <p>{userInfo.email}</p>
        </>
      )} */}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const secret = process.env.NEXTAUTH_SECRET;
  // console.log(req.cookies["next-auth.session-token"]);
  const req = context.req as NextApiRequest;
  const token = await getToken({ req, secret });
  console.log("token", token);
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
