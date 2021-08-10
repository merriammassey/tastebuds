//import React, { useState, useEffect } from "react";
//import { makeChart, getVotes } from "../utils/chartapi";
import React from "react";
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

const Vote = (props) => {
  let history = useHistory();

  const [addVote, { error }] = useMutation(ADD_VOTE, {
    onCompleted: () => {
      history.push("/thankyou");
    },
  });

  //if not logged in, toggle modal
  //const token = Auth.loggedIn() ? Auth.getToken() : null;
  //if (!token) {
  //setShowModal(true)};
  //CALL GET EVENT QUERY THEN ADD VOTES MUTATION
  const { id: eventId } = useParams();
  //const [state, dispatch] = useStoreContext();
  //const { eventId } = state;
  console.log(eventId);
  //const { currentRestaurants, eventTitle, eventNote } = state;

  const { loading, data } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });

  console.log(data);
  const eventData = data?.event || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  //console.log(eventData);

  const handleVote = async (event) => {
    event.preventDefault();

    //modify this
    if (!Auth) {
      console.log("please enter a name for your event");
      return false;
    }
    try {
      //const eventId = eventId.toObjectId();
      const restaurantId = event.target.getAttribute("value");
      console.log(event.target.getAttribute("value"));
      console.log(restaurantId); //null
      //console.log(eventId);
      const vote = await addVote({
        variables: {
          restaurantId: restaurantId,
          eventId: eventId,
        },
      });
      console.log(vote);
    } catch (err) {
      console.error(err);
    }
  };

  //const index = event.target.getAttribute("value");
  //console.log(event.target.getAttribute("value"));

  //const data = { restaurant: choice };
  //const data = choice;
  //console.log(data);

  //const { votes, totalVotes, votesCounts } = await getVotes(voteData);
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
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              onClick={(event) => handleVote(event)}
                              type="checkbox"
                              label="Click to select"
                              value={restaurant._id}
                              name={restaurant}
                            />
                          </Form.Group>
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
          </div>
        </div>
      </div>
      <div id="footer">
        {/* <Link to="/thankyou"> */}
        <Button
          onClick={() => handleVote()}
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