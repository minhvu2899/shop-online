import Image from "next/image";
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";
const UserProfilePage = ({ userInfo }) => {
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
    <div>
      {userInfo && (
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
      )}
    </div>
  );
};
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const secret = process.env.NEXTAUTH_SECRET;
//   const req: NextRequest = context.req;
//   // console.log(req.cookies["next-auth.session-token"]);
//   const token = await getToken({ req, secret });
//   console.log("token", token);
//   if (!token) {
//     return {
//       props: {},
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     };
//   }
//   return { props: { userInfo: token } };
// };
export default UserProfilePage;
