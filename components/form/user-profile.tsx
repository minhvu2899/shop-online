import Image from "next/image";
import React from "react";
import Input from "../ui/input";
import styles from "../../styles/form.module.scss";
interface FormUserProfileProps {
  userInfo: {
    name: string;
    email: string;
    picture: string;
  };
}
const FormUserProfile = ({ userInfo }: FormUserProfileProps) => {
  const { name, email, picture } = userInfo;
  return (
    <React.Fragment>
      <Input name="name" label="Name" id="name" value={name} />
      <Input name="email" label="Email" id="email" value={email} />
      <div className={styles["form-profile-image"]}>
        <Image
          src={picture}
          width="150"
          height="150"
          alt="Avatar"
          layout="responsive"
        />
      </div>
      <button className={styles["form-profile-btn"]}>Update</button>
    </React.Fragment>
  );
};

export default FormUserProfile;
