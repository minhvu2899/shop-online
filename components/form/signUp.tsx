import React from "react";

const FormSignUp = () => {
  return (
    <div>
      <div className="signup">
        <div className="signup__content">
          <h1 className="signup__heading">Sign Up</h1>
          <h2 className="signup__caption">Sign up with</h2>
          <div className="signup-social">
            <div className="signup-social__item">
              <i className="fab fa-google signup-social__icon"></i>
              <span className="signup-social__text">Login with Google</span>
            </div>
            <div className="signup-social__item">
              <i className="fab fa-facebook signup-social__icon"></i>
              <span className="signup-social__text">Login with Google</span>
            </div>
          </div>
          <form
            action="Register/RegisterUser"
            className="signup-form"
            method="post"
          >
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
                  />
                  <div className="signup-form__check">
                    <i className="fa fa-check"></i>
                  </div>
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
                  name="username"
                />
              </div>
            </div>
            <div className="signup-form__group">
              <label htmlFor="password" className="signup-form__label">
                Password
              </label>
              <input
                type="text"
                className="signup-form__input"
                id="password"
                name="password"
              />
            </div>
            <button
              className="signup-form__submit"
              type="submit"
              name="register"
            >
              <i className="fa fa-arrow-right"></i>
            </button>
          </form>
          <p className="signup__already">
            Already Signin have an account?<a href="Login">Sign in</a>
          </p>
        </div>
        <div className="signup__image">
          <img
            src="https://images.unsplash.com/photo-1613520054193-d09b13a03aab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FormSignUp;
