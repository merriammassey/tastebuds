/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { Component } from "react";
import FacebookMessengerShareButton from '../utils/FacebookMessengerShareButton';
import FacebookMessengerIcon from '../utils/FacebookMessengerIcon';
import EmailShareButton from '../utils/EmailShareButton';
import FacebookIcon from '../utils/FacebookIcon';
import WhatsappIcon from '../utils/WhatsappIcon' 
import WhatsappShareButton from '../utils/WhatsappShareButton';
import EmailIcon from '../utils/EmailIcon';
import { Col, Form, Button, Card } from "react-bootstrap";

import "./style.css";
//import exampleImage from "./react-share-pin-example.png";

class ShareIcons extends Component {
  render() {
    const shareUrl = window.location.href;
    const title = 'Please complete my TasteBuds poll';

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
      <h3>or         
          <Button id="copy" 
  onClick={() =>  navigator.clipboard.writeText(window.location.href)}
>
  Copy link
</Button></h3> </div></div></div>
    );
  }
}

export default ShareIcons;
