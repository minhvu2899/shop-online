import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { FormEventHandler } from "react";
import "../../styles/form.module.scss";
interface FormSignInProps {
  onSubmit: (data: { email: string; password: string }) => void;
}
const FormSignIn = ({ onSubmit }: FormSignInProps) => {
  const handelFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    console.log(e);
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
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="signup">
      <div className="signup__content">
        <h1 className="signup__heading">Sign Up</h1>
        <h2 className="signup__caption">Sign up with</h2>
        <div className="signup-social">
          <div className="signup-social__item" onClick={() => signIn("google")}>
            <Image
              src="/icons/google.svg"
              width={20}
              height={20}
              alt="Google"
              className="signup-social__icon"
            ></Image>

            <span className="signup-social__text">Login with Google</span>
          </div>
          <div
            className="signup-social__item"
            onClick={() => signIn("facebook")}
          >
            <Image
              src="/icons/facebook.svg"
              width={20}
              height={20}
              alt="Google"
              className="signup-social__icon"
            ></Image>

            <span className="signup-social__text">Login with FaceBook </span>
          </div>
        </div>
        <form
          onSubmit={handelFormSubmit}
          className="signup-htmlForm"
          method="post"
          //   autocomplete="off"
        >
          <div className="signup-form__group">
            <label htmlFor="email" className="signup-form__label">
              Username
            </label>
            <input
              type="text"
              className="signup-form__input"
              id="username"
              name="username"
              ref={emailRef}
            />
          </div>
          <div className="signup-form__group">
            <label htmlFor="password" className="signup-form__label">
              Password
            </label>
            <input
              type="password"
              className="signup-form__input"
              id="password"
              name="password"
              ref={passwordRef}
            />
          </div>
          <button className="signup-form__submit " type="submit" name="login">
            <Image
              src="/icons/login.svg"
              alt="Login"
              width={30}
              height={30}
              className="fa fa-arrow-right"
            ></Image>
          </button>
        </form>
        <p className="signup__already">
          Already Signin have an account?<a href="signup">Sign up</a>
        </p>
      </div>
      <div className="signup__image">
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
