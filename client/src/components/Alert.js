import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";

const Alert = (props) => {
  const [showModal2, setShowModal2] = useState(false);

  return (
    <Modal show={showModal2}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default Alert;
