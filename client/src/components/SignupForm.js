import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
//replace addUser() with ADD_USER mutation
//import { createUser } from "../utils/API";
import Auth from "../utils/auth";
//add useMutation
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
//import { useDispatch} from
import { useStoreContext } from "../utils/GlobalState";
import { useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";
require("dotenv").config();
const SignupForm = () => {
  const [addUser, { error }] = useMutation(ADD_USER);
  //const [showModal, setShowModal] = useState();
  //const [showReturn, setShowReturn] = useState(false);
  const [state, dispatch] = useStoreContext();
  const history = useHistory();
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  //added

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
      //const response = await createUser(userFormData);
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      //added
      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }
    setUserFormData({
      username: "",
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
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
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
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
          style={{ marginBottom: "10px" }}
        >
          Submit
        </Button>
        {/* <Button
      
          type="submit"
          variant="success"
          size="lg"
          onClick={() => setShowModal(false)}
        >
          {" "}
          Return to your Event{" "}
        </Button> */}
      </Form>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <GoogleButton
            // className={classes.googleButton}
            clientId={process.env.GOOGLE_CLIENT_ID}
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

export default SignupForm;
