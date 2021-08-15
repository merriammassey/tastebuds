import React, { useState } from "react";
import { Link, useParams, matchPath } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import Event from "../pages/Event";
import { useStoreContext } from "../utils/GlobalState";

function Signup(props) {
  const [state, dispatch] = useStoreContext();

  const handleClose = () => props.setShowModal(false);
  //const [showModal, setShowModal] = useState();

  //let { id } = useParams();
  const [formState, setFormState] = useState({ email: "", password: "" });

  //To do: check to see if user exists, and alert them to log in instead of sign up
  const [addUser] = useMutation(ADD_USER);
  const saveToken = () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    dispatch({
      type: "UPDATE_NAV",
      token: token,
    });
  };

  const handleFormSubmit = async (event) => {
    console.log();
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    saveToken();
    handleClose();
    //Event.setShowModal(false);
    //redirect
    //if current page is /, stay /
    //if current page is /events, stay /
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
