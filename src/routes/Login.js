import React from "react";
import axios from "axios";
import { useFormik } from "formik";

import { store } from "../data/store";
import { LoadingSpinner } from "../components/LoadingSpinner";

import "../styles.css";
import * as SC from "../styled/index";

const URL_BASE = `https://character-companion.glitch.me/api`;
const URL_USERS = `${URL_BASE}/users`;
const URL_LOGIN = `${URL_BASE}/login`;

const DEFAULT_VIEW = ["CHAT", "CHARACTER_SHEET"];

export const useUser = () => {
  const [userData, setUserData] = React.useState({
    user: {},
    isFetching: false
  });
  return [userData, setUserData];
};

export const Login = () => {
  const { state, dispatch } = React.useContext(store);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [isRegistering, setIsRegistering] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState(null);
  const formik = useFormik({
    initialValues: {
      userName: "name",
      password: "password",
      confirmPassword: "password",
      email: "email"
    },
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const validate = () => {
    let validationErrs = [];
    if (formik.email === formik.initialValues.email)
      validationErrs.push("Enter an email address");
    if (formik.password === formik.initialValues.password)
      validationErrs.push("Enter a password");
    if (isRegistering) {
      if (formik.userName === formik.initialValues.userName)
        validationErrs.push("Enter a name");
      if (formik.password !== formik.confirmPassword)
        validationErrs.push("Passwords do not match");
    }
    return validationErrs;
  };

  const handleSubmit = () => {
    const register = async () => {
      let validationErrs = validate();
      if (validationErrs.length > 0) return;
      try {
        const user = JSON.stringify({
          userName: formik.values.userName,
          email: formik.values.email,
          password: formik.values.password
        });
        const response = await axios.post(URL_USERS, user, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setServerMessage("Registration Successful!");
        setIsSubmitting(false);
        formik.resetForm();
        formik.values.email = response.email;
      } catch (e) {
        setIsSubmitting(false);
        setServerMessage("Could not Register");
      }
    };

    const login = async () => {
      let validationErrs = validate();
      if (validationErrs.length > 0) return;
      try {
        const user = JSON.stringify({
          email: formik.values.email,
          password: formik.values.password
        });
        const response = await axios.post(URL_LOGIN, user, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setServerMessage("Success!");
        dispatch({
          type: "LOGIN",
          payload: await response.data.user
        });
        dispatch({
          type: "SET_SESSION",
          payload: await response.data.accessToken
        });
        setIsSubmitting(false);
        dispatch({
          type: "SET_VIEW",
          payload: DEFAULT_VIEW
        });
        // ["CHAT", "ACCOUNT", "FRIENDS", "CHARACTER_SHEET"]
      } catch (e) {
        setIsSubmitting(false);
        setServerMessage("Could not login");
      }
    };
    setIsSubmitting(true);
    isRegistering ? register() : login();
  };

  const handleRegisterToggle = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="d-flex t c">
      <SC.SmallCard className="p-1 bdr-b bdr-t bdr-rad">
        <form onSubmit={formik.handleSubmit}>
          <SC.CardHeader className="p-1">
            <ul className="w">Email</ul>
            <div className="w c">
              <SC.CardInput
                className="w c tc"
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                placeholder={formik.values.email}
              />
            </div>
            <div className="p-1" />

            <ul className=" w">Password</ul>
            <div className="w c">
              <SC.CardInput
                className="w c  tc"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                placeholder="password"
                autoComplete="off"
              />
            </div>
            <div className="p-1" />

            {isRegistering && (
              <React.Fragment>
                <ul className=" w">Confirm password</ul>
                <div className="w c">
                  <SC.CardInput
                    className="w c tc"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    placeholder="password"
                    autoComplete="off"
                  />
                </div>
                <div className="p-1" />

                <ul className="w">Display Name</ul>
                <div className="w c">
                  <SC.CardInput
                    className="w c tc"
                    type="text"
                    id="userName"
                    name="userName"
                    onChange={formik.handleChange}
                    placeholder={formik.values.userName}
                    autoComplete="off"
                  />
                </div>
                <div className="p-1" />
              </React.Fragment>
            )}
          </SC.CardHeader>
          <SC.CardFooter className="d-flex w">
            {/* <SC.Button
              type="reset"
              className="m-1 p-1"
              onMouseUp={handleCancel}
              style={{
                background: "rgb(176, 147, 152",
                color: "rgb(235, 252, 251"
              }}
            >
              Nevermind
            </SC.Button> */}
            <SC.Button
              disabled={!(formik.isValid && formik.dirty)}
              className="m-1 p-1"
              type="submit"
            >
              {isSubmitting ? (
                <LoadingSpinner />
              ) : isRegistering ? (
                "Register"
              ) : (
                "Enter"
              )}
            </SC.Button>
            <div>
              <input
                type="checkbox"
                id="register"
                name="register"
                onMouseUp={handleRegisterToggle}
              />
              <label htmlFor="register">I'm new</label>
            </div>
          </SC.CardFooter>
        </form>
        {serverMessage && (
          <SC.CardFooter className="d-flex w">
            <div className="d-flex w c p-1 m-1">{serverMessage}</div>
          </SC.CardFooter>
        )}
      </SC.SmallCard>
    </div>
  );
};
