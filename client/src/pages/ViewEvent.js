//import React, { useState, useEffect } from "react";
import { makeChart, getVotes } from "../utils/chartapi";
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { Link } from "react-router-dom";
//global state imports
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SEARCHED_RESTAURANTS } from "../utils/actions";
import { QUERY_RESTAURANTS } from "../utils/queries";
import { searchYelp } from "../utils/yelpAPI";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import {
  saveRestaurantIds,
  getSavedRestaurantIds,
} from "../utils/localStorage";
import { SAVE_RESTAURANT } from "../utils/mutations";
import "./style.css";
import VoteChart from "../components/Chart";
import { propTypes } from "react-bootstrap/esm/Image";

const ViewEvent = () => {
  const [state, dispatch] = useStoreContext();
  const { currentRestaurants, eventTitle, eventNote } = state;
  /* 
  const handleVote = async (event) => {
    const index = event.target.getAttribute("value");
    console.log(event.target.getAttribute("value"));
    //

    const data = { restaurant: choice };
    //const data = choice;
    console.log(data);

    const { votes, totalVotes, votesCounts } = await getVotes(voteData);

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
            <h3>{eventTitle}</h3>
            <h5>
              {eventNote}
              {/* Here are a few places close to the stadium. <br />
              Please vote by 3pm today, and I'll make reservations. */}
            </h5>
            {/* MAP CARDS */}
            <Container id="restaurantCards">
              <Row>
                <Col style={{ alignItems: "center" }}>
                  {currentRestaurants.map((restaurant, index) => {
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
                            Price: {restaurant.price} <br />
                            {restaurant.location}, {restaurant.city} <br />
                            {restaurant.phone} <br />
                            <a href={restaurant.url}>Website</a>
                          </Card.Text>
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              // onClick={(event) => vote(event)}
                              type="checkbox"
                              label="Click to select"
                              value={index}
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
                          {/*                     <Button variant="primary">Add to event</Button>
                           */}{" "}
                        </Card.Body>
                      </Card>
                    );
                  })}
                </Col>
              </Row>
            </Container>
            <VoteChart eventTitle={eventTitle} />
            <div id="form">
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
                </h5>
                <Button
                  // onSubmit={handleVote}
                  type="submit"
                  variant="success"
                  size="lg"
                >
                  Vote
                </Button>
                {/* <input type="submit" value="Vote" class="btn" /> */}
              </form>
              <br />
              {/* <Chart {...props} /> */}
              {/* <div id="chartContainer" style={{ height: "300px" }}></div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <Container id="restaurantCards">
        <Row>
          <Col style={{ alignItems: "center" }}>
            {searchedRestaurants.map((restaurant) => {
              return (
                <Card key={restaurant.id} style={{ width: "35rem" }}>
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
                      Price: {restaurant.price} <br />
                      {restaurant.location}, {restaurant.city} <br />
                      {restaurant.phone} <br />
                      <a href={restaurant.url}>Website</a>
                    </Card.Text>
                    <Button variant="primary">Add to event</Button>
                  </Card.Body>
                </Card> 
                
              );
            })}
          </Col>
        </Row>
      </Container>*/}
    </>
  );
};

export default ViewEvent;
