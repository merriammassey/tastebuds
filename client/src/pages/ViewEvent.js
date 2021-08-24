import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import { GET_EVENT } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { useHistory } from "react-router-dom";
import Auth from "../utils/auth";

const ViewEvent = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  //rerender this component each time... add
  // const [voteCount, setVoteCount] = useState("");
  let history = useHistory();

  const { id: eventId } = useParams();
  const [state, dispatch] = useStoreContext();
  const { currentEvent } = state;
  //console.log(eventId);

  const saveEventData = (eventData) => {
    dispatch({
      type: "UPDATE_EVENTDATA",
      currentEvent: eventData,
    });
  };

  const { loading, data, error } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    onCompleted: (data) => {
      //console.log("query data", data);
      saveEventData(data);
      //history.push(window.location);
      //window.location.reload(false);
      //history.goBack();
      //history.push(`/viewevent/${eventId}`);
    },
  });

  //console.log(eventData);
  const eventData = data?.event || {};

  /* useEffect(() => {
    setVoteCount(1);
  }, [error]); */

  //const eventData = { currentEvent };
  //console.log(eventData);
  //const currentEventData = currentEvent.event;
  //console.log(currentEventData);
  //const [restaurants] = currentEventData.restaurants;
  //console.log(currentEventData.restaurants); //logs only one
  //const restaurants = currentEvent.event.restaurants;
  //console.log(currentEvent.event.restaurants);
  if (loading) {
    return <h2>loading your event</h2>;
  }
  /* let i = 0;
  let tempArr = [];
  while (i < eventData.restaurants.length) {
    tempArr.push(eventData.restaurants[i].votes);
    //console.log(tempArr);
    var flat = tempArr.flat(Infinity);
    //sum += eventData.restaurants[i].votes.length;
    //let array = eventData.restaurants[i].votes;
    //var reduce = tempArr.reduce((sum, array) => sum + array.length, 0);
    i++;
  }
  //setVoteCount(flat.length);
  if (flat.length) {
    history.push(`/viewevent/${eventId}`);
  } */

  //setVoteCount(false);
  //add up total votes so state will update....sum of total votes
  //console.log(eventData.restaurants[0].votes.length);
  //let sum = 0;

  //voteCount = flat.length;
  //console.log("tempArr: ", tempArr);
  //console.log("sum: ", sum);
  //console.log("reduce: ", reduce);
  //console.log("flat: ", flat.length);

  //const currentEventData = { currentEvent };
  //const restaurantList = currentEventData.currentEvent.event.restaurants;
  //console.log(restaurantList);

  return (
    <>
      <div id="homephoto">
        <div id="eventdiv">
          <div id="event">
            <Link to={`/vote/${eventId}`}>
              <Button
                type="submit"
                variant="success"
                size="lg"
                id="shareButton"
              >
                Share again
              </Button>
            </Link>
            <h3 id="eventheader" style={{ color: "#212529" }}>
              Your poll results
              <br />
              for {eventData.title}
            </h3>
            <h5>Your note: {eventData.note}</h5>
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
                          {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              // onClick={(event) => vote(event)}
                              type="checkbox"
                              label="Click to select"
                              value={index}
                              name={restaurant}
                            />
                          </Form.Group> */}
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
