import React, { useEffect } from "react";
// import Layout from "../components/layout";
import AccessDenied from "../../components/AccessDenied";

export default function Category() {
  const [userInfo, setUserInfo] = React.useState<{
    name: string;
    picture: string;
    email: string;
  }>();
  useEffect(() => {
    const fetchU = async () => {
      const user = await fetch("/api/user/jwt");
      const data = await user.json();
      setUserInfo(data);
    };
    fetchU();
  }, []);

  // When rendering client side don't display anything until loading is complete
  // if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!userInfo) {
    return (
      <>
        <AccessDenied />
      </>
    );
  }

  // If session exists, display content
  return (
    <React.Fragment>
      <h1>Protected Page</h1>
      <p>
        <strong>{userInfo.name ?? "\u00a0"}</strong>
      </p>
    </React.Fragment>
  );
}
