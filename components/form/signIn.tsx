import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "../../styles/form.module.scss";
interface FormSignInProps {
  onSubmit: (data: { email: string; password: string }) => void;
}
const FormSignIn = ({ onSubmit }: FormSignInProps) => {
  const authCtx = useContext(AuthContext);
  const handelFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let email = "",
      password = "";
    if (emailRef.current) {
      email = emailRef.current.value;
    }
    if (passwordRef.current) password = passwordRef.current.value;
    if (!onSubmit) return;
    onSubmit({ email, password });
  };
  const handelLoginProvider = async (provider: string) => {
    try {
      await signIn(provider, { redirect: false });
      const { data } = await axios.get("/api/user/jwt");
      authCtx.login(data);
    } catch (error) {}
  };
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={styles["signup"]}>
      <div className={styles["signup__content"]}>
        <h1 className={styles["signup__heading"]}>Sign In</h1>
        <h2 className={styles["signup__caption"]}>Sign In with</h2>
        <div className={styles["signup-social"]}>
          <div
            className={styles["signup-social__item"]}
            onClick={() => handelLoginProvider("google")}
          >
            <Image
              src="/icons/google.svg"
              width={20}
              height={20}
              alt="Google"
              className={styles["signup-social__icon"]}
            ></Image>

            <span className={styles["signup-social__text"]}>
              Login with Google
            </span>
          </div>
          <div
            className={styles["signup-social__item"]}
            onClick={() => handelLoginProvider("facebook")}
          >
            <Image
              src="/icons/facebook.svg"
              width={20}
              height={20}
              alt="Google"
              className={styles["signup-social__icon"]}
            ></Image>

            <span className={styles["signup-social__text"]}>
              Login with FaceBook
            </span>
          </div>
        </div>
        <form
          onSubmit={handelFormSubmit}
          className={styles["signup-htmlForm"]}

          //   autocomplete={styles["off"
        >
          <div className={styles["signup-form__group"]}>
            <label htmlFor="email" className={styles["signup-form__label"]}>
              Username
            </label>
            <input
              type="text"
              className={styles["signup-form__input"]}
              id="username"
              name="username"
              ref={emailRef}
            />
          </div>
          <div className={styles["signup-form__group"]}>
            <label htmlFor="password" className={styles["signup-form__label"]}>
              Password
            </label>
            <input
              type="password"
              className={styles["signup-form__input"]}
              id="password"
              name="password"
              ref={passwordRef}
            />
          </div>
          <button
            className={styles["signup-form__submit"]}
            type="submit"
            name="login"
          >
            <Image
              src="/icons/login.svg"
              alt="Login"
              width={30}
              height={30}
              className={styles["fa fa-arrow-right"]}
            ></Image>
          </button>
        </form>
        <p className={styles["signup__already"]}>
          Already Signin have an account?<a href="signup">Sign in</a>
        </p>
      </div>
      <div className={styles["signup__image"]}>
        <Image
          src="/bg-login.jpg"
          alt="Background Image"
          width={1000}
          height={700}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default FormSignIn;
