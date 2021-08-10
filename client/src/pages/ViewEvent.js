import React, { useState } from "react";
import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import { GET_EVENT } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const ViewEvent = () => {
  const { id: eventId } = useParams();
  console.log(eventId);

  const { loading, data, error } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });
  console.log(data);

  const eventData = data?.event || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div id="homephoto">
        <div id="eventdiv">
          <div id="event">
            <h1 id="eventheader" style={{ color: "#212529" }}>
              Here are your event poll results
            </h1>{" "}
            <br />
            <h3>{eventData.title}</h3>
            <h5>{eventData.note}</h5>
            {/* MAP CARDS */}
            <Container id="restaurantCards">
              <Row>
                <Col style={{ alignItems: "center" }}>
                  {eventData.restaurants.map((restaurant, index) => {
                    return (
                      <Card
                        key={restaurant._id}
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
                          <Card.Title>
                            Votes for {restaurant.name}:{" "}
                            {restaurant.votes.length}
                          </Card.Title>
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
                              // onClick={(event) => vote(event)}
                              type="checkbox"
                              label="Click to select"
                              value={index}
                              name={restaurant}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </Col>
              </Row>
            </Container>
            <div id="buttons"></div>
          </div>
        </div>
      </div>
      <div id="footer">
        <Link to="/myevents">
          <Button type="submit" variant="success" size="lg">
            Return to your events
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ViewEvent;
