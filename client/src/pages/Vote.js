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
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Auth from "../utils/auth";
import { Nav, Modal, Tab } from "react-bootstrap";
import ShareIcons from "../components/ShareIcons";

const Vote = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  //const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  //const [state, dispatch] = useStoreContext();
  //const { currentRestaurants } = state;

  const [addVote, { error }] = useMutation(ADD_VOTE, {
    onCompleted: () => {
      history.push("/thankyou");
    },
  });
  const [showModal, setShowModal] = useState(false);
  let history = useHistory();
  const { id: eventId } = useParams();
  const { loading, data } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });

  //console.log(data);
  const eventData = data?.event || {};

  if (loading) {
    return <h2>LOADING...</h2>;
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

  //console.log(eventData);
  /*   const shareModal = async (event) => {
    setShowModal(true);
  }; */

  const handleVote = async (event) => {
    event.preventDefault();
    const restaurantId = event.target.getAttribute("value");

    /*     const { currentRestaurants } = state;
    const tempArr = [];
    const index = event.target.getAttribute("value");
    tempArr.push(currentRestaurants[index]);
    console.log(tempArr); */

    //modify this
    if (!Auth) {
      console.log("please log in or sign up");
      return false;
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
            <Button
              onClick={() => setShowModal(true)}
              type="submit"
              variant="success"
              size="lg"
              id="shareButton"
            >
              Share this poll
            </Button>
            <h1 id="eventheader" style={{ color: "#212529" }}>
              Where would you like to eat?
            </h1>{" "}
            <br />
            {/* <h3>Pre-game dinner</h3> */}
            <h3>{eventData.title}</h3>
            <h5>
              {eventData.note}
              <br />
              Check the box of your restaurant of choice.
              <br />
              Then click Vote!
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
              show={showModal}
              onHide={() => setShowModal(false)}
              aria-labelledby="signup-modal"
            >
              {/* tab container to do either signup or login component */}
              <Tab.Container defaultActiveKey="login">
                <Modal.Header closeButton>
                  <Modal.Title id="signup-modal">
                    <h2>Share your TasteBuds poll</h2>
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
                  <ShareIcons />
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      {/* <LoginForm handleModalClose={() => setShowModal(false)} /> */}
                    </Tab.Pane>
                    <Tab.Pane eventKey="signup">
                      {/* <SignUpForm
                        handleModalClose={() => setShowModal(false)}
                      /> */}
                    </Tab.Pane>
                  </Tab.Content>
                </Modal.Body>
              </Tab.Container>
            </Modal>
          </div>
        </div>
      </div>
      <div id="footer">
        {/* <Link to="/thankyou"> */}
        <Button
          //onClick={(event) => handleVote(event)}
          type="submit"
          variant="success"
          size="lg"
        >
          Vote
        </Button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default Vote;
