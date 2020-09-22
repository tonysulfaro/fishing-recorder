import React from "react";
import "./AddFishButton.css";
import { Button, Modal, Form } from "react-bootstrap";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    this.alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  document.getElementById("lat").value = position.coords.latitude;
  document.getElementById("lon").value = position.coords.longitude;
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a new Fish Entry
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Fish Type</Form.Label>
            <Form.Control as="select">
              <option>Walleye</option>
              <option>Perch</option>
              <option>Drum</option>
              <option>Goby</option>
              <option>Catfish</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Fish Length</Form.Label>
            <Form.Control type="number" placeholder="Fish Length" />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Lat</Form.Label>
            <Form.Control id="lat" disabled type="text" placeholder="Lat" />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Lon</Form.Label>
            <Form.Control id="lon" disabled type="text" placeholder="Lon" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.onHide}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const AddFishButton = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        className="add-fish"
        variant="primary"
        onClick={() => {
          getLocation();
          setModalShow(true);
        }}
      >
        Add Fish
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddFishButton;
