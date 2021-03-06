import React, { useState } from "react";
import { Button, Nav, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";
import "./style.css";
import Event from "../pages/Event";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";

const Footer = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useStoreContext();
  const { yelpRestaurants } = state;

  /*const handleCreateEvent = async (restaurantData) => {
    get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      setShowModal(true);
    } else {
      console.log("render event");
      //send props to event
      return <Event />;
    } 
  };*/

  return (
    <>
      <div id="footer">
        <Link to="/event">
          {yelpRestaurants.length ? (
            <Button
              type="submit"
              variant="success"
              size="lg"
              //onClick={handleCreateEvent}
            >
              {" "}
              {/*pass saved rest here*/}
              Create your Event
            </Button>
          ) : (
            <div></div>
          )}
        </Link>
      </div>

      {/* modal data */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default Footer;
