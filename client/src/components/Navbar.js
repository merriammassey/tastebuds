import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import AuthContext from "../utils/auth-context.js";

import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useStoreContext();

  /*  const saveToken = () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    dispatch({
      type: "UPDATE_NAV",
      token: token,
    });
  };
  saveToken(); */
  return (
    <AuthContext.Consumer>
      {({ loggedIn, setLoggedIn }) => (
        <>
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
                      <Nav.Link as={Link} to="/myevents">
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
      )}
    </AuthContext.Consumer>
  );
};

export default AppNavbar;
