//import React, { useState, useEffect } from "react";
//import { makeChart, getVotes } from "../utils/chartapi";
import React, { useState } from "react";
import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
//global state imports
import { useStoreContext } from "../utils/GlobalState";
import "./style.css";
//import VoteChart from "../components/Chart";
import { ADD_VOTE } from "../utils/mutations";
import { useQuery, useMutation, error } from "@apollo/client";
import VoteChart from "../components/Chart";
import { GET_EVENT } from "../utils/queries";
import { GET_ME } from "../utils/queries";
import SignUpForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Auth from "../utils/auth";
import { Nav, Modal, Tab } from "react-bootstrap";
import ShareIcons from "../components/ShareIcons2";

const Vote = () => {
  //const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [state, dispatch] = useStoreContext();
  const id = useParams();
  let history = useHistory();
  const { id: eventId } = useParams();
  const { currentUser } = state;

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  //const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  //const [state, dispatch] = useStoreContext();
  //const { currentRestaurants } = state;
  const { userData } = useQuery(GET_ME, {
    //removed loading
    variables: { token },
    onCompleted: (userData) => {
      const saveUserData = (userData) => {
        dispatch({
          type: "SAVE_USERDATA",
          currentUser: userData,
        });
      };
      //console.log("query data", data);
      saveUserData(userData);
      //history.push(`/viewevent/${eventId}`);
    },
  });
  // if token, do get me and compare all eventIds to param
  const shareButton = () => {
    if (token) {
      //compare userData.events _ids to params
      const user = userData?.me || userData?.user || {};
      //const userId = data._id;
      //console.log(userId);
      console.log(currentUser.me.events);
      //collect all the user's event id's in an array
      let i = 0;
      let tempArr = [];
      while (i < currentUser.me.events.length) {
        tempArr.push(currentUser.me.events[i]._id);
        i++;
      }
      console.log(tempArr);
      //check to see if it includes the current event to determine if logged in user owns event
      console.log(id.id.toString());
      const shareButton = tempArr.includes(id.id);
      console.log(shareButton);
      // add conditional to share button below
    }
    return shareButton;
  };
  //if there is no token, trigger sign up modal

  const [addVote, { error }] = useMutation(ADD_VOTE, {
    onCompleted: () => {
      history.push("/thankyou");
    },
  });

  const { loading, data } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });

  //console.log(data);
  const eventData = data?.event || {};

  if (loading) {
    return <h2>loading your options</h2>;
  }
  //if not logged in, toggle modal
  //const token = Auth.loggedIn() ? Auth.getToken() : null;
  //if (!token) {
  //setShowModal(true)};
  //CALL GET EVENT QUERY THEN ADD VOTES MUTATION
  //const [state, dispatch] = useStoreContext();
  //const { eventId } = state;
  //console.log(eventId);
  //const { currentRestaurants, eventTitle, eventNote } = state;

  console.log(eventData);

  const handleVote = async (event) => {
    event.preventDefault();
    const restaurantId = event.target.getAttribute("value");

    /*     const { currentRestaurants } = state;
    const tempArr = [];
    const index = event.target.getAttribute("value");
    tempArr.push(currentRestaurants[index]);
    console.log(tempArr); */

    if (!token) {
      setShowModal1(true);
      //setShowModal(true);
    }
    try {
      // const restaurantId = event.target.getAttribute("value");
      const vote = await addVote({
        variables: {
          restaurantId: restaurantId,
          //restaurantId: tempArr[index],
          eventId: eventId,
        },
      });
      //tempArr.forEach(vote);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    const title = document.title;
    const url = document.querySelector("link[rel=canonical]")
      ? document.querySelector("link[rel=canonical]").href
      : document.location.href;
    const text = "Please check out my TasteBuds poll!";
    if (!navigator.share) {
      //shareDialog.classList.add("is-open");
      setShowModal2(true);
    } else {
      navigator
        .share(
          url,
          title,
          text
          /* url: "",
          title: "Sharing Cool things",
          text: "Checkout my really cool website.", */
        )
        .then(() => {
          console.log("Shared YEEEE!!!!!");
        })
        .catch((error) => {
          console.log("Sharing Failed");
        });
    }
  };

  /*
    let dataPoints = [
      { y: votesCounts.Maskadores, label: "Maskadores" },
      { y: votesCounts.MunichGyro, label: "MunichGyro" },
      { y: votesCounts.Starbucks, label: "Starbucks" },
      { y: votesCounts.Other, label: "Other" },
    ];
    //chart, passing dataPoints and totalVotes
  };
 */
  return (
    <>
      <div id="homephoto">
        <div id="eventdiv">
          <div id="event">
            {/* make this render only for event owner or if previous component was event */}
            {/*        {() =>
              shareButton() === true ? ( */}
            <Button
              //onClick={() => setShowModal2(true)}
              onClick={handleShare}
              /* onClick={() =>
                this.setShowModal({
                  setShowShareModal: true,
                  setShowEventModal: false,
                })
              } */
              type="submit"
              variant="success"
              size="lg"
              id="shareButton"
            >
              Share this poll
            </Button>
            {/* ) : (
                <div></div>
              )
            } */}
            {/* <h1 id="eventheader" style={{ color: "#212529" }}>
              Where would you like to eat?
            </h1>{" "}
            <br />

            <h3>{eventData.title}</h3> */}
            <br />
            <h3>
              Vote for your preferred venue <br />
              for {eventData.title}!
            </h3>
            <br />
            <h5>
              {eventData.note}
              {/* Here are a few places close to the stadium. <br />
              Please vote by 3pm today, and I'll make reservations. */}
            </h5>
            {/* MAP CARDS */}
            <Container id="restaurantCards">
              <Row>
                <Col style={{ alignItems: "center" }}>
                  {eventData.restaurants.map((restaurant, index) => {
                    return (
                      <Card
                        key={restaurant.id}
                        index={index}
                        style={{ width: "35rem" }}
                      >
                        <Card.Img
                          variant="left"
                          width={"250"}
                          height={"250"}
                          src={restaurant.image_url}
                        />
                        <Card.Body>
                          <Card.Title>{restaurant.name}</Card.Title>
                          <Card.Text>
                            Rating: {restaurant.rating} <br />
                            <a href={restaurant.url} target="_blank">
                              Read the reviews
                            </a>
                            <br />
                            Price: {restaurant.price} <br />
                            {restaurant.location}, {restaurant.city}
                            <br />
                            <a href="tel:{restaurant.phone}">
                              {restaurant.phone}
                            </a>{" "}
                            <br />
                          </Card.Text>
                          <Button
                            onClick={(event) => handleVote(event)}
                            type="submit"
                            value={restaurant._id}
                            name={restaurant}
                            variant="success"
                          >
                            Vote
                          </Button>
                          <p>for {restaurant.name}</p>
                          {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              type="checkbox"
                              label="Click to select"
                              value={restaurant._id}
                              name={restaurant}
                              onClick={(event) => handleVote(event)}
                            />
                          </Form.Group> */}
                          {/* <div
                            // onClick={(event) => addRestaurant(event)}
                            value={index}
                            name={restaurant}
                          >
                            Click to select
                          </div> */}
                        </Card.Body>
                      </Card>
                    );
                  })}
                </Col>
              </Row>
            </Container>
            <div id="buttons">
              {/* <Link to="/thankyou">
                <Button
                  // onSubmit={handleVote}
                  type="submit"
                  variant="success"
                  size="lg"
                >
                  Vote
                </Button>
              </Link> */}
            </div>
            {/* <VoteChart props={eventData} /> */}
            {/* <VoteChart eventTitle={eventTitle} /> */}
            {/*   <div id="form">
              <form id="vote-form">
                <h5>
                  <input
                    type="radio"
                    name="restaurant"
                    id="maskadores"
                    value="Maskadores"
                  />
                  <label htmlFor="maskadores"> Maskadores</label>
                </h5>
                <h5>
                  <input
                    type="radio"
                    name="restaurant"
                    id="munichgyro"
                    value="MunichGyro"
                  />
                  <label htmlFor="munichgyro"> MunichGyro</label>
                </h5>
                <h5>
                  <input
                    type="radio"
                    name="restaurant"
                    id="starbucks"
                    value="Starbucks"
                  />
                  <label htmlFor="starbucks"> Starbucks</label>
                </h5>
                <h5>
                  <input
                    type="radio"
                    name="restaurant"
                    id="other"
                    value="Other"
                  />
                  <label htmlFor="other"> Other</label>
                </h5> */}
            {/* </form>
              <br /> */}
            {/* set modal data up */}
            <Modal
              id="shareModal"
              size="lg"
              show={showModal2}
              eventid={eventId}
              //show={setShowShareModal}
              onHide={() => setShowModal2(false)}
              aria-labelledby="signup-modal"
            >
              <Tab.Container defaultActiveKey="login">
                <Modal.Header closeButton>
                  <Modal.Title id="signup-modal">
                    <h2>Share your TasteBuds poll</h2>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ShareIcons eventid={eventId} />
                  <Tab.Content>
                    <Tab.Pane eventKey="login"></Tab.Pane>
                    <Tab.Pane eventKey="signup"></Tab.Pane>
                  </Tab.Content>
                </Modal.Body>
              </Tab.Container>
            </Modal>
            {/* login/signup modal */}
            <Modal
              id="eventModal"
              size="lg"
              show={showModal1}
              onHide={() => setShowModal1(false)}
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
                        handleModalClose={() => setShowModal1(false)}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="signup">
                      <SignUpForm
                        handleModalClose={() => setShowModal1(false)}
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
      {/* <div id="footer">
     
        <Button
          //onClick={(event) => handleVote(event)}
          type="submit"
          variant="success"
          size="lg"
        >
          Vote
        </Button>
        
      </div> */}
    </>
  );
};

export default Vote;
