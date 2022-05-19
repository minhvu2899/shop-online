import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
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
    console.log(e);
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
        <form className="signup-form" method="post" onSubmit={handelFormSubmit}>
          <div className="signup-form__row">
            <div className="signup-form__group">
              <label htmlFor="name" className="signup-form__label">
                Name
              </label>
              <div className="signup-form__validate">
                <input
                  type="text"
                  className="signup-form__input"
                  id="name"
                  name="name"
                  ref={nameRef}
                />
              </div>
            </div>
            <div className="signup-form__group">
              <label htmlFor="email" className="signup-form__label">
                Email
              </label>
              <input
                type="text"
                className="signup-form__input"
                id="email"
                name="email"
                ref={emailRef}
              />
            </div>
          </div>
          <div className="signup-form__row">
            <div className="signup-form__group">
              <label htmlFor="password" className="signup-form__label">
                Password
              </label>
              <div className="signup-form__validate">
                <input
                  type="password"
                  className="signup-form__input"
                  id="password"
                  name="password"
                  ref={passwordRef}
                />
              </div>
            </div>
            <div className="signup-form__group">
              <label htmlFor="passwordConfirm" className="signup-form__label">
                Password Confirm
              </label>
              <input
                type="password"
                className="signup-form__input"
                id="passwordConfirm"
                name="passwordConfirm"
                ref={passwordConfirmRef}
              />
            </div>
          </div>

          <button className="signup-form__submit" type="submit" name="register">
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
          Already Signin have an account?<a href="signin">Sign in</a>
        </p>
      </div>
      <div className="signup__image">
        <Image
          src="/bg-login.jpg"
          alt="Background Image"
          width={1200}
          height={1000}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default FormSignUp;
