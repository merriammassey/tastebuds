// see SignupForm.js for comments
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import GoogleButton from "react-google-button";
import { GoogleLogin } from "react-google-login";

//import { loginUser } from "../utils/API";
import Auth from "../utils/auth";
//add useMutation
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { ADD_USER } from "../utils/mutations";
import Icon from "./Icon";

const axios = require("axios").default;
require("dotenv").config();

const LoginForm = () => {
  const [addUser] = useMutation(ADD_USER);

  //const [showModal, setShowModal] = useState();

  //const [userFormData, setUserFormData] = useState(variant ? true : false);
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //const [showReturn, setShowReturn] = useState(false);
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (err) {
        console.log(err);
      }
    };
    loadOauthUrl();
  }, []);
  const [login, { error }] = useMutation(LOGIN);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      //setShowReturn(true);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      //const response = await loginUser(userFormData);
      const { data } = await login({
        variables: { ...userFormData },
      });

      /*     if (!response.ok) {
        throw new Error("something went wrong!");
      } */
      //didn't add:
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
    /* const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    } */

    setUserFormData({
      email: "",
      password: "",
    });
  };
  const googleSuccess = async (res) => {
    console.log("success", res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    //get a username and email
    const username = res?.profileObj.givenName;
    const email = res?.profileObj.email;
    const password = res?.profileObj.googleId;
    try {
      //dispatch({ type: "AUTH", data: { result, token } });
      //make a
      //history.push("/");
      const { data } = await addUser({
        variables: { username, email, password },
      });

      //added
      Auth.login(data.addUser.token);
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) =>
    console.log(error, "Google Sign In was unsuccessful. Try again later");
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
          style={{ marginBottom: "10px" }}
        >
          Submit
        </Button>
      </Form>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <GoogleButton
            // className={classes.googleButton}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            color="primary"
            fullWidth
            onClick={renderProps.onClick}
            //disabled={renderProps.disabled}
            startIcon={<Icon />}
            variant="contained"
            style={{ width: "100%" }}
          >
            Google Sign In
          </GoogleButton>
        )}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy="single_host_origin"
      />{" "}
    </>
  );
};

export default LoginForm;
