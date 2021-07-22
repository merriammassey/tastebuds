import React, { useState } from "react";
import "../App.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Container, Col, Row, Button, Card } from "react-bootstrap";

const MyEvents = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data, error } = useQuery(GET_ME, {
    variables: { token },
  });
  //when get_me is run, repsonse returns our data; query_user returns data in user property
  const userData = data?.me || data?.user || {};
  console.log(userData);
  //console.log(error); //undefined
  /*     const handleDeleteEvent = async (bookId) => {
        try {
          //replace deleteBook() with REMOVE_BOOK mutation
          await deleteBook({
            variables: { bookId },
          });
          // upon success, remove book's id from localStorage
    
          removeBookId(bookId);
        } catch (error) {
          console.error(error);
        }
      }; */
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <div style={{ backgroundColor: "#343a40" }}>
        <h1 id="eventsheader">Your Events</h1>
        <Container>
          <Row>
            <Col style={{ alignItems: "center" }}>
              {userData.events.map((event) => {
                return (
                  <Card key={event.title}>
                    <Card.Header as="h5">{event.title}</Card.Header>
                    <Card.Body>
                      <Card.Title>{event.createdAt}</Card.Title>
                      <Card.Text>{event.note}</Card.Text>
                      <Button variant="primary">View Event</Button>
                    </Card.Body>
                  </Card>
                );
              })}
              <Card style={{ margin: "10px" }}>
                <Card.Header id="cardheader" as="h5">
                  Bev's Goodbye Dinner Tuesday <br /> July 16, 2021
                </Card.Header>
                <Card.Body>
                  <Card.Title>created 7.10.21</Card.Title>
                  <Card.Text>
                    Note: Please let us know where you'd prefer to eat!
                  </Card.Text>
                  <div id="buttondiv">
                    <Button
                      id="buttons"
                      style={{ margin: "5px" }}
                      variant="success"
                      size="lg"
                    >
                      View Event
                    </Button>
                    <Button
                      id="buttons"
                      variant="primary"
                      size="lg"
                      style={{ margin: "5px" }}
                    >
                      Delete Event
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              <Card style={{ margin: "10px" }}>
                <Card.Header id="cardheader" as="h5">
                  Coffee Saturday <br /> July 1, 2021
                </Card.Header>
                <Card.Body>
                  <Card.Title>created 6.28.21</Card.Title>
                  <Card.Text>
                    Note: Do you prefer local or chain? Here's a few options.
                    9ish?
                  </Card.Text>
                  <div id="buttondiv">
                    <Button
                      id="buttons"
                      style={{ margin: "5px" }}
                      variant="success"
                      size="lg"
                    >
                      View Event
                    </Button>
                    <Button
                      id="buttons"
                      variant="primary"
                      size="lg"
                      style={{ margin: "5px" }}
                    >
                      Delete Event
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MyEvents;
