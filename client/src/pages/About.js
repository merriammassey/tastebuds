import React from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import logo from "../assets/images/tblogo.png";
import utensils from "../assets/images/utensils.png";
import friends from "../assets/images/friends.png";
import poll from "../assets/images/poll.png";
import { useSpring, animated, set, config, flip } from "react-spring";
import "../App.css";
import Typing from "../components/Typing";
import brunch from "../assets/images/brunch.jpg";
import text1 from "../assets/images/text1.png";
import text2b from "../assets/images/text2b.png";
import texts from "../assets/images/texts.png";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
//import { makeStyles } from "@material-ui/core/styles";
/* const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
})); */

const About = () => {
  const intro = useSpring({
    to: { opacity: 0, paddingRight: 1 },
    from: { opacity: 1, paddingRight: 0 },
    reset: true,
    reverse: flip,
    delay: 2000,
    //config: config.molasses,
    onRest: () => set(!flip),
  });

  const close = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 2200,
    //config: config.molasses,
    onRest: () => set(!flip),
  });

  const select = useSpring({
    to: { opacity: 1, paddingTop: 0 },
    from: { opacity: 0, paddingTop: 200 },
    reset: true,
    reverse: flip,
    delay: 200,
    //config: config.molasses,
    onRest: () => set(!flip),
  });

  const invite = useSpring({
    to: { opacity: 1, paddingTop: 0 },
    from: { opacity: 0, paddingTop: 200 },
    reset: true,
    reverse: flip,
    delay: 800,
    //config: config.molasses,
    onRest: () => set(!flip),
  });

  const results = useSpring({
    to: { opacity: 1, paddingTop: 0 },
    from: { opacity: 0, paddingTop: 200 },
    reset: true,
    reverse: flip,
    delay: 1200,
    //config: config.molasses,
    onRest: () => set(!flip),
  });

  const mm = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 1300,
    //config: config.molasses,
    onRest: () => set(!flip),
  });
  return (
    <Carousel>
      <Carousel.Item interval={2500}>
        <div id="slide">
          <Carousel.Caption>
            <h3 id="iconText">Get more of this</h3>
          </Carousel.Caption>
          <img className="d-block w-100" id="brunchdate" />
        </div>
      </Carousel.Item>

      <Carousel.Item interval={2500}>
        {/*  <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        /> */}
        <div id="slide">
          <Carousel.Caption>
            <h3>with less of this</h3>
            {/* <p>Where do you want to eat?</p>
          <p>I don't know, what about you?</p> */}
          </Carousel.Caption>
          <img
            className="d-block w-100"
            id="textimage"
            src={text2b}
            alt="text asking where you want to eat"
          />
        </div>
      </Carousel.Item>

      <Carousel.Item interval={4000}>
        <div id="icons">
          {/* <Container className="justify-content-md-center"> */}
          {/* <Row className="justify-content-md-center"> */}
          <div className="icon">
            {/* <animated.div style={select}> */}
            <img src={utensils} id="icon1" alt="logo" className="icon" />
            <h4 className="iconText">
              Select <br /> restaurants
            </h4>{" "}
            {/* </animated.div> */}
          </div>
          <div className="icon">
            {/* <animated.div style={invite}> */}
            <img src={friends} id="icon" alt="logo" className="icon" />
            <h4 className="iconText">Invite friends to vote</h4>{" "}
            {/* </animated.div> */}
          </div>
          <div className="icon">
            {/* <animated.div style={results}> */}
            <img src={poll} id="icon" alt="logo" className="icon" />

            <h4 className="iconText">See poll results</h4>
            {/* </animated.div> */}
          </div>
        </div>

        <Carousel.Caption>
          <h3>in just 3 steps</h3>
          {/*  <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2500}>
        {/* <Container className="justify-content-md-center"> */}
        {/* <Row className="justify-content-md-center"> */}
        <div className="start">
          <Link to="/">
            <Button
              id="startbutton"
              type="submit"
              variant="success"
              size="lg"
              style={invite}
            >
              Get started now
            </Button>
          </Link>
        </div>
        <Carousel.Caption>
          {/* <h3>in just 3 steps</h3> */}
          {/*  <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default About;
