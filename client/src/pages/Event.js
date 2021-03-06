import React, { useState, useEffect } from "react";
import { Col, Form, Button, Card } from "react-bootstrap";
//global state imports
import { useStoreContext } from "../utils/GlobalState";
import { ADD_EVENT } from "../utils/mutations";
import { useMutation, onCompleted, error } from "@apollo/client";
import "./style.css";
import { useHistory } from "react-router-dom";
import Auth from "../utils/auth";
import { Nav, Modal, Tab } from "react-bootstrap";
import SignUpForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const Event = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  let history = useHistory();

  //get currentRestaurants from global state
  const [state, dispatch] = useStoreContext();
  const { currentRestaurants } = state;

  // create state for holding our search field data
  const [eventTitleInput, setEventTitleInput] = useState("");
  const [eventNotesInput, setEventNotesInput] = useState("");
  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    onCompleted: (data) => {
      const _id = data.addEvent.events[data.addEvent.events.length - 1]._id;

      //console.log(_id);
      history.push(`/vote/${_id}`);
      const saveEventId = (_id) => {
        dispatch({
          type: "UPDATE_EVENT_ID",
          eventId: _id,
        });
      };
      saveEventId(_id);
    },
  });

  const handleAddEvent = async (event) => {
    event.preventDefault();
    //if not logged in, toggle modal
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const title = eventTitleInput;
    const note = eventNotesInput;
    const restaurants = currentRestaurants;
    if (!token) {
      setShowModal(true);

      if (!eventTitleInput) {
        console.log("please enter a name for your event");
        return false;
      }
      try {
        const data = await addEvent({
          variables: {
            title: title,
            note: note,
            restaurants: restaurants,
          },
        });
        const newEvent = data.data.addEvent.events.length - 1;
        //console.log(newEvent);

        const _id = data.data.addEvent.events[newEvent]._id;
        //console.log(_id);
      } catch (err) {
        console.error(err);
      }
    }

    //event.preventDefault();
    //console.log(eventTitleInput);
    if (!eventTitleInput) {
      console.log("please enter a name for your event");
      return false;
    }
    try {
      console.log(title, note, currentRestaurants);
      const data = await addEvent({
        variables: {
          title: title,
          note: note,
          restaurants: restaurants,
        },
      });

      //console.log(data);
      const newEvent = data.data.addEvent.events.length - 1;
      console.log(newEvent);

      const _id = data.data.addEvent.events[newEvent]._id;
      console.log(_id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <header>
          <div id="homephoto">
            <div id="eventdiv">
              <div id="event">
                <h3 id="eventheader" style={{ color: "#212529" }}>
                  Add a few details{" "}
                </h3>
                <br />
                {/* <h5>
                  Give your event a name
                  <br />
and ...               </h5> */}

                <div id="form">
                  <Form>
                    <Form.Row>
                      <Col xs={12} md={8}>
                        <Form.Control
                          name="eventTitleInput"
                          value={eventTitleInput}
                          onChange={(e) => setEventTitleInput(e.target.value)}
                          type="text"
                          size="lg"
                          placeholder="Give your event a name"
                        />
                        <br />
                        <Form.Control
                          name="eventNotesInput"
                          value={eventNotesInput}
                          onChange={(e) => setEventNotesInput(e.target.value)}
                          type="text"
                          size="lg"
                          id="longanswer"
                          style={{ textAlign: "left" }}
                          placeholder="Add a note to your friends"
                        />
                        <br />
                      </Col>
                      <Col xs={12} md={4}>
                        <h5>The venues you selected:</h5>

                        <ul>
                          {currentRestaurants.map((restaurant) => {
                            return (
                              <li styl={{ paddingLeft: "3px" }}>
                                {restaurant.name}
                              </li>
                            );
                          })}
                        </ul>

                        <Button
                          id="invitebutton"
                          onClick={handleAddEvent}
                          type="submit"
                          variant="success"
                          size="lg"
                        >
                          Invite your friends
                        </Button>
                      </Col>
                    </Form.Row>
                  </Form>

                  {/* set modal data up */}
                  <Modal
                    //backdrop={false}
                    id="eventModal"
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
                            <LoginForm
                              handleModalClose={() => setShowModal(false)}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="signup">
                            <SignUpForm
                              handleModalClose={() => setShowModal(false)}
                            />
                          </Tab.Pane>
                          {/*   {token ? (
                            <Button
                              type="submit"
                              variant="success"
                              size="lg"
                              onClick={() => setShowModal(false)}
                            >
                              {" "}
                              Return to your Event{" "}
                            </Button>
                          ) : (
                            <div></div>
                          )} */}
                        </Tab.Content>
                      </Modal.Body>
                    </Tab.Container>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Event;
