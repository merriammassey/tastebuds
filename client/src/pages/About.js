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
  //const utensils = <FontAwesomeIcon icon={faUtensils} />;
  //const classes = useStyles();
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
    <div id="aboutBox">
      {/* INTRO */}
      <animated.div style={intro}>
        {/* <img src={logo} id="logo" alt="logo" className="logoLarge" /> */}
        <br />
        <h1 id="b" className="steps">
          In three steps...
        </h1>
      </animated.div>

      <animated.div style={intro}>
        {/* <animated.div style={close}>
        <img src={logo} id="logo" alt="logo" className="logoLarge" />
        <h1 id="b">TasteBuds gives you more of this...</h1>
      </animated.div> */}

        <div id="icons">
          {/* <Container className="justify-content-md-center"> */}
          {/* <Row className="justify-content-md-center"> */}
          <div className="icon">
            <animated.div style={select}>
              <img src={utensils} id="icon" alt="logo" className="icon" />{" "}
              <h4 className="iconText">
                Select <br /> restaurants
              </h4>{" "}
            </animated.div>
          </div>
          <div className="icon">
            <animated.div style={invite}>
              <img src={friends} id="icon" alt="logo" className="icon" />
              <h4 className="iconText">
                Invite friends <br /> to vote
              </h4>{" "}
            </animated.div>
          </div>
          <div className="icon">
            <animated.div style={results}>
              <img src={poll} id="icon" alt="logo" className="icon" />

              <h4 className="iconText">
                See poll
                <br /> results
              </h4>
            </animated.div>
          </div>
        </div>
      </animated.div>
      <animated.div style={close}>
        <div id="brunch" alt="brunch date" />

        <br />
        <h1 id="b" className="steps">
          TasteBuds gives you more of this...
        </h1>
      </animated.div>
    </div>
  );
};

export default About;
