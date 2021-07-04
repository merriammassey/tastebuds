//import React, { useState, useEffect } from "react";
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

const ViewEvent = (props) => {
  return (
    <>
      <div id="homephoto">
        <div id="eventdiv">
          <div id="event">
            <h1 id="eventheader" style={{ color: "#212529" }}>
              Where would you like to eat?
            </h1>{" "}
            <br />
            <h3>Pre-game dinner</h3>
            <h5>
              Tom's vegan, so let's pick a place he can <br />
              eat too for dinner before the game tomorrow night.
            </h5>
            <div id="form">
              <form id="vote-form">
                <h5>
                  <input
                    type="radio"
                    name="restaurant"
                    id="maskadores"
                    value="Maskadores"
                  />
                  <label for="maskadores"> Maskadores</label>
                </h5>
                <h5>
                  <input
                    type="radio"
                    name="restaurant"
                    id="munichgyro"
                    value="MunichGyro"
                  />
                  <label for="munichgyro"> MunichGyro</label>
                </h5>
                <h5>
                  <input
                    type="radio"
                    name="restaurant"
                    id="starbucks"
                    value="Starbucks"
                  />
                  <label for="starbucks"> Starbucks</label>
                </h5>
                <h5>
                  <input
                    type="radio"
                    name="restaurant"
                    id="other"
                    value="Other"
                  />
                  <label for="other"> Other</label>
                </h5>
                <Button type="submit" variant="success" size="lg">
                  Vote
                </Button>
                {/* <input type="submit" value="Vote" class="btn" /> */}
              </form>
              <br />
              <div id="chartContainer" style={{ height: "300px" }}></div>
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
