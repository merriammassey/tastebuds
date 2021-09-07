import React from "react";
import ReactDOM from "react-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
//import { faUsers } from "@fortawesome/free-solid-svg-icons";
//import { faPoll } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/tblogo.png";
import utensils from "../assets/images/utensils.png";
import friends from "../assets/images/friends.png";
import poll from "../assets/images/poll.png";
import { useSpring, animated, set, config, flip } from "react-spring";
import "../App.css";

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
  //ReactDOM.render(utensils, document.body);
  return (
    <>
      {/* <animated.div style={close}> */}

      <div id="brunch" alt="brunch date">
        <br />
        <h1 id="b" className="steps">
          TasteBuds gives you more of this...
        </h1>
      </div>
      <div id="brunch" alt="brunch date">
        <br />
        <h1 id="b" className="steps">
          with less of this.
        </h1>
      </div>
      {/* </animated.div> */}
    </>
  );
};

export default About;
