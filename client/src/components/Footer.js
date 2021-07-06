import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";
=======
import { Button, Nav, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";
import "./style.css";
import Event from "../pages/Event";
import { Link } from "react-router-dom";
>>>>>>> createevent

const Footer = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

<<<<<<< HEAD
  return (
    <>
      <Footer>
        <footer>
          <Button type="submit" variant="success" size="lg">
            Create Event
          </Button>
        </footer>
      </Footer>

      {/* set modal data up */}
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

      {/* if user is logged in, direct to events page on button click */}
      {Auth.loggedIn() ? (
        <>
          <Nav.Link as={Link} to="/saved">
            See Your Events
          </Nav.Link>
          <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
        </>
      ) : (
        <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
      )}

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            TasteBuds
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {/* <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link> */}
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/saved">
                    See Your Events
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
=======
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
          <Button
            type="submit"
            variant="success"
            size="lg"
            //onClick={handleCreateEvent}
          >
            {" "}
            {/*pass saved rest here*/}
            Invite your friends
          </Button>
        </Link>
      </div>

      {/* modal data */}
>>>>>>> createevent
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

<<<<<<< HEAD
export default AppNavbar;
=======
export default Footer;
>>>>>>> createevent
