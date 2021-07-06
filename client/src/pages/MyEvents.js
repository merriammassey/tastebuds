import React, { useState } from "react";
import SearchRestaurants from "./SearchRestaurants";
import "../App.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
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

const MyEvents = () => {
  /*   const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data } = useQuery(GET_ME, {
    variables: { token },
  });
  //when get_me is run, repsonse returns our data; query_user returns data in user property
  const userData = data?.me || data?.user || {};
  console.log(userData); */

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
  return (
    <>
      <div>
        <header>
          <div>
            <div>
              <h1 style={{ color: "#343a40" }}>Your Events</h1>
              {/*  <CardColumns>
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
              </CardColumns> */}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default MyEvents;
