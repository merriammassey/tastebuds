/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { useState, Component } from "react";
import FacebookMessengerShareButton from "../utils/FacebookMessengerShareButton";
import FacebookMessengerIcon from "../utils/FacebookMessengerIcon";
import EmailShareButton from "../utils/EmailShareButton";
import FacebookIcon from "../utils/FacebookIcon";
import WhatsappIcon from "../utils/WhatsappIcon";
import WhatsappShareButton from "../utils/WhatsappShareButton";
import EmailIcon from "../utils/EmailIcon";
import { Col, Form, Button, Card, Alert, Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";

import "./style.css";
//import exampleImage from "./react-share-pin-example.png";

const ShareIcons = ({ eventid }) => {
  const [showAlert, setShowAlert] = useState(false);

  //const id = useParams();
  //console.log(id.id, "this is the id");
  const props = { eventid };
  console.log(eventid);
  const title = "Please complete my TasteBuds poll";
  //const shareUrl = `https://whereyouwannaeat.herokuapp.com/vote/${eventid}`;
  console.log(shareUrl);
  /*  const shareUrl = () => {
    if (window.location.toString().includes("viewevent")) {
      const shareUrl = `https://www.whereyouwannaeat.herokuapp.com/vote/${eventid}`;
    } else {
      const shareUrl = window.location.href;
    }
    console.log(shareUrl); 

    return shareUrl;
  };*/
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowAlert(true);
    setTimeout(function () {
      //document.getElementById("shareModal").style.display = "none";
      window.location.reload();
    }, 3000);
    //try
    /* var modal = document.getElementById('modal');
 modal.parentNode.removeChild(modal); */
    //or
    //document.getElementById("alert").innerHTML = ''
  };
  return (
    <div>
      <div className="Demo__container">
        {/*<div className="Demo__some-network">
           <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton> */}

        {/*  <div>
            <FacebookShareCount
              url={shareUrl}
              className="Demo__some-network__share-count"
            >
              {(count) => count}
            </FacebookShareCount>
          </div> 
        </div>*/}

        {/* <div className="Demo__some-network">
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="368110118285486"
            className="Demo__some-network__share-button"
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <br />
          <h5>Messenger</h5>

        </div>

        <div className="Demo__some-network">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <br />
          <h5>Whatsapp</h5>
          <div className="Demo__some-network__share-count">&nbsp;</div>
        </div> */}

        <div className="Demo__some-network">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="Where would you like to meet? See the options here:"
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
          <br />
          <h5>Email</h5>
        </div>
        <div id="copyButton">
          <h3>
            or
            <Button id="copy" onClick={handleCopyLink}>
              Copy link
            </Button>
          </h3>{" "}
        </div>
      </div>
      <div>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="success"
          style={{ textAlign: "center" }}
        >
          Link copied to clipboard!{" "}
        </Alert>
      </div>
    </div>
  );
};

export default ShareIcons;
