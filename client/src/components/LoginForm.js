// see SignupForm.js for comments
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import GoogleLogin from "./GoogleLogin";
import GoogleLogout from "./GoogleLogout";

//import { loginUser } from "../utils/API";
import Auth from "../utils/auth";
//add useMutation
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";

const LoginForm = () => {
  //const [showModal, setShowModal] = useState();

  //const [userFormData, setUserFormData] = useState(variant ? true : false);
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //const [showReturn, setShowReturn] = useState(false);

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
        >
          Submit
        </Button>
      </Form>
      {/* <GoogleLogin /> */}
    </>
  );
};

export default LoginForm;
