import React, { useState } from "react";
import { Nav, Modal, Tab } from "react-bootstrap";
import ShareIcons from "../components/ShareIcons";

const ShareModal = () => {
  const [showModal, setShowModal] = useState();

  return (
    <Modal
      id="shareModal"
      size="lg"
      show={setShowModal}
      //show={setShowShareModal}
      onHide={() => setShowModal(false)}
      aria-labelledby="signup-modal"
    >
      <Tab.Container defaultActiveKey="login">
        <Modal.Header closeButton>
          <Modal.Title id="signup-modal">
            <h2>Share your TasteBuds poll</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShareIcons />
          <Tab.Content>
            <Tab.Pane eventKey="login"></Tab.Pane>
            <Tab.Pane eventKey="signup"></Tab.Pane>
          </Tab.Content>
        </Modal.Body>
      </Tab.Container>
    </Modal>
  );
};

export default ShareModal;
