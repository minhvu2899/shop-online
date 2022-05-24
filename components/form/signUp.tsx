import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import styles from "../../styles/form.module.scss";
interface FormSignUpProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => void;
}
const FormSignUp = ({ onSubmit }: FormSignUpProps) => {
  const handelFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !passwordConfirmRef.current?.value
    ) {
      return;
    }
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let passwordConfirm = passwordConfirmRef.current.value;

    if (!onSubmit) return;
    onSubmit({ email, password, name, passwordConfirm });
  };
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const passwordConfirmRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={styles["signup"]}>
      <div className={styles["signup__content"]}>
        <h1 className={styles["signup__heading"]}>Sign Up</h1>
        <h2 className={styles["signup__caption"]}>Sign up with</h2>
        <div className={styles["signup-social"]}>
          <div
            className={styles["signup-social__item"]}
            onClick={() => signIn("google")}
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
            onClick={() => signIn("facebook")}
          >
            <Image
              src="/icons/facebook.svg"
              width={20}
              height={20}
              alt="Google"
              className={styles["signup-social__icon"]}
            ></Image>

            <span className={styles["signup-social__text"]}>
              Login with FaceBook{" "}
            </span>
          </div>
        </div>
        <form
          onSubmit={handelFormSubmit}
          className={styles["signup-htmlForm"]}

          //   autocomplete={styles["off"
        >
          <div className={styles["signup-form__row"]}>
            <div className={styles["signup-form__group"]}>
              <label htmlFor="name" className={styles["signup-form__label"]}>
                Name
              </label>
              <div className={styles["signup-form__validate"]}>
                <input
                  type="text"
                  className={styles["signup-form__input"]}
                  id="name"
                  name="name"
                  ref={nameRef}
                />
              </div>
            </div>
            <div className={styles["signup-form__group"]}>
              <label htmlFor="email" className={styles["signup-form__label"]}>
                Email
              </label>
              <input
                type="text"
                className={styles["signup-form__input"]}
                id="email"
                name="email"
                ref={emailRef}
              />
            </div>
          </div>
          <div className={styles["signup-form__row"]}>
            <div className={styles["signup-form__group"]}>
              <label
                htmlFor="password"
                className={styles["signup-form__label"]}
              >
                Password
              </label>
              <div className={styles["signup-form__validate"]}>
                <input
                  type="password"
                  className={styles["signup-form__input"]}
                  id="password"
                  name="password"
                  ref={passwordRef}
                />
              </div>
            </div>
            <div className={styles["signup-form__group"]}>
              <label
                htmlFor="passwordConfirm"
                className={styles["signup-form__label"]}
              >
                Password Confirm
              </label>
              <input
                type="password"
                className={styles["signup-form__input"]}
                id="passwordConfirm"
                name="passwordConfirm"
                ref={passwordConfirmRef}
              />
            </div>
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
          Already Signin have an account?<a href="signin">Sign in</a>
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

export default FormSignUp;
