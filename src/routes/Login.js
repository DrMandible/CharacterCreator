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

  console.log(state);

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
    // console.log("** handleSubmit values**\n", values, "\n** **\n");
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
        console.log("isSubmitting", false);
        setIsSubmitting(false);
        formik.resetForm();
        formik.values.email = response.email;
      } catch (e) {
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
        console.log(response);
        dispatch({
          type: "LOGIN",
          payload: await response.data.user
        });
        dispatch({
          type: "SET_SESSION",
          payload: await response.data.accessToken
        });
        dispatch({
          type: "ADD_VIEW",
          payload: "FRIENDS"
        });
        dispatch({
          type: "REMOVE_VIEW",
          payload: "LOGIN"
        });
        console.log("isSubmitting", false);
        setIsSubmitting(false);
      } catch (e) {
        setServerMessage("Could not login");
      }
    };
    console.log("isSubmitting", true);
    setIsSubmitting(true);
    isRegistering ? register() : login();
  };

  const handleCancel = (values) => {
    // console.log(values);
  };

  const handleRegisterToggle = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="d-flex t c">
      <SC.SmallCard className="p-1 bdr-b bdr-t bdr-rad">
        <form onSubmit={formik.handleSubmit}>
          <SC.CardHeader className="p-1">
            <ul className="bdr-b w">Email</ul>
            <div className="w c">
              <SC.CardInput
                className="w c bdr-b tc"
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                placeholder={formik.values.email}
              />
            </div>
            <div className="p-1" />

            <ul className="bdr-b w">Password</ul>
            <div className="w c">
              <SC.CardInput
                className="w c bdr-b tc"
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
                <ul className="bdr-b w">Confirm password</ul>
                <div className="w c">
                  <SC.CardInput
                    className="w c bdr-b tc"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    placeholder="password"
                    autoComplete="off"
                  />
                </div>
                <div className="p-1" />

                <ul className="bdr-b w">Display Name</ul>
                <div className="w c">
                  <SC.CardInput
                    className="w c bdr-b tc"
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
            <SC.Button
              type="reset"
              className="m-1 p-1"
              onMouseUp={handleCancel}
            >
              Nevermind
            </SC.Button>
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
        {serverMessage && <div className="d-flex w c">{serverMessage}</div>}
      </SC.SmallCard>
    </div>
  );
};
