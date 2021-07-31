//import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
//global state imports
import { useStoreContext } from "../utils/GlobalState";
import { ADD_EVENT } from "../utils/mutations";
import { useQuery, useMutation, onCompleted, error } from "@apollo/client";
import "./style.css";
import { useHistory } from "react-router-dom";
import Home from "./Home";
import { Redirect } from "react-router-dom";
const Event = () => {
  let history = useHistory();

  //get currentRestaurants from global state
  const [state, dispatch] = useStoreContext();
  const { currentRestaurants } = state;

  // create state for holding our search field data
  const [eventTitleInput, setEventTitleInput] = useState("");
  const [eventNotesInput, setEventNotesInput] = useState("");
  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    onCompleted: (data) => {
      //const { eventId } = await addEvent;
      //console.log((data.addEvent.events.length - 1)._id); undefined
      //const eventId = (data.addEvent.events.length - 1)._id; i think this is right
      const _id = data.addEvent.events[data.addEvent.events.length - 1]._id;
      //console.log(data.addEvent.events.length - 1);
      //console.log(data);
      console.log(_id); //UNDEFINED
      history.push(`/events/${_id}`);
      const saveEventId = (_id) => {
        dispatch({
          type: "UPDATE_EVENT_ID",
          eventId: _id,
        });
      };
      saveEventId(_id);
    },
  });
  //const _id =  handleAddEvent();

  const handleAddEvent = async (event) => {
    event.preventDefault();

    const title = eventTitleInput;
    const note = eventNotesInput;
    const restaurants = currentRestaurants;

    //event.preventDefault();
    console.log(eventTitleInput);
    if (!eventTitleInput) {
      //add modal
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

      console.log(data);
      //console.log(data.data.addEvent.events);
      const newEvent = data.data.addEvent.events.length - 1;
      console.log(newEvent); //logs the event index needed
      //console.log(data.data.addEvent.events[newEvent]);
      //console.log(data.data.addEvent.events[newEvent]._id);
      const _id = data.data.addEvent.events[newEvent]._id;
      console.log(_id); //logs event ID
      //return _id;
      //setSavedEvents...
    } catch (err) {
      console.error(err);
    }

    //global state
    //TITLE AND NOTES EMPTY ARRAY IN STATE, REGARDLESS OF THE LINES BELOW
    /*  const saveEventNotes = (eventNotesInput) => {
      dispatch({
        type: "UPDATE_EVENT_NOTES",
        eventNote: eventNotesInput,
      });
    };
    saveEventNotes(eventNotesInput);

    const saveEventTitle = (eventTitleInput) => {
      dispatch({
        type: "UPDATE_EVENT_TITLE",
        eventTitle: eventTitleInput,
      });
    };
    //
    saveEventTitle(eventTitleInput); */
    //console.log(state);
    //setEventTitleInput("");
    //setEventNotesInput("");
    //return data.data.addEvent.events[newEvent]._id;
  };
  //OUT OF SCOPE:
  //const _id = data.data.addEvent.events[newEvent]._id;

  return (
    <>
      <div>
        <header>
          <div id="homephoto">
            <div id="eventdiv">
              <div id="event">
                <h1 id="eventheader" style={{ color: "#212529" }}>
                  Create Your Event
                </h1>
                <br />
                <h5>
                  Add details about your event.
                  <br />
                  Then invite your friends to help choose the restaurant!
                </h5>

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
                        <h5>The choices you selected:</h5>

                        <ul>
                          {currentRestaurants.map((restaurant) => {
                            return (
                              <li styl={{ paddingLeft: "3px" }}>
                                {restaurant.name}
                              </li>
                            );
                          })}
                        </ul>
                        {/* <Link to={`/events/${_id}`}> */}
                        {/* <Link to={"/vote"}> */}
                        <Button
                          id="invitebutton"
                          onClick={handleAddEvent}
                          //onCompleted = {data => console.log("Hi World")
                          //onCompleted={history.push(`/events/${_id}`)}
                          type="submit"
                          variant="success"
                          size="lg"
                        >
                          Invite your friends
                        </Button>
                        {/* </Link> */}
                      </Col>
                    </Form.Row>
                  </Form>
                  {/* <div id="restaurantCards">
                    {currentRestaurants.map((restaurant) => {
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
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div> */}
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
