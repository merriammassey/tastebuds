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
import { ADD_EVENT } from "../utils/mutations";
import { searchYelp } from "../utils/yelpAPI";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import {
  saveRestaurantIds,
  getSavedRestaurantIds,
} from "../utils/localStorage";
//import { SAVE_EVENT } from "../utils/mutations";
import "./style.css";

const Event = () => {
  const [state, dispatch] = useStoreContext();
  const { currentRestaurants } = state;
  console.log = "current restaurants include" + currentRestaurants;
  // create state for holding our search field data
  const [eventNameInput, setEventNameInput] = useState("");
  const [eventNotesInput, setEventNotesInput] = useState("");
  const [addEvent, { error }] = useMutation(ADD_EVENT);

  // create state to hold saved restaurant values
  /* const [savedRestaurantIds, setSavedRestaurantIds] = useState(
    getSavedRestaurantIds()
  ); */

  //added for restaurant data
  /* const [savedRestaurantData, setSavedRestaurantData] = useState(
    getSavedRestaurantData()
  ); */
  // create event to save event in db and set state on form submit
  /* const handleSaveEvent = async (eventData) => {
    // find the restaurants in state / global state?
    const restaurantsToSave = currentRestaurants;
    //and get the other data from the form?
    const noteToSave = eventNotesInput;
    const nameToSave = eventNameInput;

    //searchedBooks.find((book) => book.bookId === bookId);
    if (!token) {
      return false;
    }

    try {
      await saveEvent({
        variables: {
          name: eventNameInput,
          restaurants: currentRestaurants,
          notes: eventNotesInput,
        },
      });

      setEventData([...eventData, otherthings]);
    } catch (err) {
      console.log(err);
    }
  };
 */
  const handleAddEvent = async (eventData) => {
    if (!eventNameInput) {
      //add modal
      console.log("please enter a location");
      return false;
    }
    try {
      await addEvent({
        variables: {
          title: eventNameInput,
          note: eventNotesInput,
          restaurants: [currentRestaurants],
        },
      });
      setEventNameInput("");
      setEventNotesInput("");
      //setSavedEvents...
    } catch (err) {
      console.error(err);
    }

    //global state
    const saveEventNotes = (eventNotesInput) => {
      dispatch({
        type: "UPDATE_EVENT_NOTES",
        eventNote: eventNotesInput,
      });
    };
    saveEventNotes(eventNotesInput);

    const saveEventTitle = (eventNameInput) => {
      dispatch({
        type: "UPDATE_EVENT_TITLE",
        eventTitle: eventNameInput,
      });
    };
    saveEventTitle(eventNameInput);
  };

  return (
    <>
      <div>
        <header>
          <div id="homephoto">
            <div id="eventdiv">
              <div id="event">
                <h1 id="eventheader" style={{ color: "#212529" }}>
                  Create your Event
                </h1>
                <br />
                <h5>
                  Add details about your event.
                  <br />
                  Then invite friends to help choose the restaurant!
                </h5>

                <div id="form">
                  <Form>
                    <Form.Row>
                      <Col xs={12} md={8}>
                        <Form.Control
                          name="eventNameInput"
                          value={eventNameInput}
                          onChange={(e) => setEventNameInput(e.target.value)}
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
                          id="paragraph"
                          placeholder="Add a note to your friends"
                        />
                        <br />
                        {currentRestaurants.map((restaurant) => {
                          return (
                            <Card
                              key={restaurant.id}
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
                                  {restaurant.location}, {restaurant.city}{" "}
                                  <br />
                                  {restaurant.phone} <br />
                                  <a href={restaurant.url}>Website</a>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          );
                        })}
                      </Col>
                      <Col xs={12} md={4}>
                        <Link to="/viewevent">
                          <Button
                            onClick={handleAddEvent}
                            type="submit"
                            variant="success"
                            size="lg"
                          >
                            Invite your friends
                          </Button>
                        </Link>
                        {/* </Link> */}
                      </Col>
                    </Form.Row>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </header>
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

export default Event;
