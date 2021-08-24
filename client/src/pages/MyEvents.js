import React, { useState } from "react";
import "../App.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { DELETE_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container, Col, Row, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { Modal, Tab } from "react-bootstrap";

const MyEvents = () => {
  const [showModal, setShowModal] = useState(false);
  //const reload = () => window.location.reload();
  const [state, dispatch] = useStoreContext();
  const { currentUser } = state;
  const [deleteEvent, error] = useMutation(DELETE_EVENT);
  function sortByDate(a, b) {
    return b.createdAt - a.createdAt;
  }
  const handleDeleteEvent = async (_id) => {
    try {
      await deleteEvent({
        variables: { _id },
      });
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data } = useQuery(GET_ME, {
    variables: { token },
    onCompleted: (data) => {
      const saveUserData = (userData) => {
        dispatch({
          type: "SAVE_USERDATA",
          currentUser: userData,
        });
      };
      console.log("query data", data);
      saveUserData(data);
      //history.push(`/viewevent/${eventId}`);
    },
  });
  const userData = data?.me || data?.user || {};
  /* let eventsArr = [];
  eventsArr.push(userData.events);
  eventsArr.sort(sortByDate);
  console.log(eventsArr.sort(sortByDate)); */

  console.log(userData);
  //console.log(userData.events[0].restaurants[0].votes.length);
  //console.log(currentUser.events[0].restaurants[0].votes.length);
  //console.log(currentUser.me.events[0]);
  if (loading) {
    return <h2>loading your events</h2>;
  }

  //calculate total votes
  /*  let i = 0;
  let tempArr = [];
  //let restaurants = userData.events[1]
  while (i < userData.events[1].restaurants.length) {
    tempArr.push(userData.events[1].restaurants[i].votes);
    console.log(tempArr);
    const flat = tempArr.flat(Infinity);
    //sum += eventData.restaurants[i].votes.length;
    //let array = eventData.restaurants[i].votes;
    //var reduce = tempArr.reduce((sum, array) => sum + array.length, 0);
    i++;
    console.log(flat.length);
  } */
  return (
    <>
      <div style={{ backgroundColor: "#343a40" }}>
        <h3 id="eventsheader">Welcome, {userData.username}!</h3>{" "}
        <Container>
          <Row>
            <Col style={{ alignItems: "center" }}>
              {userData.events.map((event) => {
                // console.log(event.restaurants[0]);
                return (
                  <Card key={event._id}>
                    <Card.Header as="h5">{event.title}</Card.Header>
                    <Card.Body>
                      <Card.Title></Card.Title>

                      <Card.Text>Created on {event.createdAt}</Card.Text>
                      <Card.Text>{event.note}</Card.Text>
                      {/* <Card.Text>{event.restaurants}</Card.Text> */}

                      {/* <Card.Text>
                        Current Vote Count:{" "}
                        {() => {
                          let i = 0;
                          let tempArr = [];
                          while (i < event.restaurants.length) {
                            tempArr.push(event.restaurants[i].votes);
                            //console.log(tempArr);
                            const flat = tempArr.flat(Infinity);
                            //sum += eventData.restaurants[i].votes.length;
                            //let array = eventData.restaurants[i].votes;
                            //var reduce = tempArr.reduce((sum, array) => sum + array.length, 0);
                            i++;
                            return flat.length;
                          }
                        }} 
                      </Card.Text>*/}
                      <Link to={`/viewevent/${event._id}`}>
                        <Button id="myEventButtons" variant="success">
                          View Event
                        </Button>
                      </Link>
                      <Button
                        id="myEventButtons"
                        variant="secondary"
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete Event
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Container>
        <Modal
          id="shareModal"
          size="lg"
          show={showModal}
          onHide={() => {
            setShowModal(false);
            window.location.reload();
          }}
          aria-labelledby="signup-modal"
        >
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <h4>Your event has been deleted.</h4>
                {/*    <Nav variant="pills">
                      <Nav.Item>
                        <Nav.Link eventKey="login">Login</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                      </Nav.Item>
                    </Nav> */}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <ShareIcons /> 
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <LoginForm handleModalClose={() => setShowModal(false)} /> 
                    </Tab.Pane>
                    <Tab.Pane eventKey="signup">
                      {<SignUpForm
                        handleModalClose={() => setShowModal(false)}
                      /> 
                    </Tab.Pane>
                  </Tab.Content>*/}
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </div>
    </>
  );
};

export default MyEvents;
