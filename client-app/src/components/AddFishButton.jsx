import React, { useState, useEffect } from "react";
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
  const [fishTypeId, setfishTypeId] = useState(11);
  const [lengthInches, setlengthInches] = useState();

  async function handleSubmit() {
    var payload = {
      userId: 1, //hardcoded for now
      FishTypeId: fishTypeId,
      lat: document.getElementById("lat").value,
      lon: document.getElementById("lon").value,
      lengthInches: lengthInches,
    };

    console.log(payload);

    var resp = await fetch(
      "https://fishingrecorderapi.azurewebsites.net/api/FishRecord/save",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (resp.status !== 200) {
      alert("Fish Save Failed");
    }
  }

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
            <Form.Control
              as="select"
              onChange={(e) => {
                setfishTypeId(e.target.value);
              }}
            >
              {props.fishtypes.map((fishtype) => {
                return (
                  <option key={fishtype.fishTypeId} value={fishtype.fishTypeId}>
                    {fishtype.type}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Fish Length</Form.Label>
            <Form.Control
              type="number"
              placeholder="Fish Length"
              onChange={(e) => {
                setlengthInches(e.target.value);
              }}
            />
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
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
            props.onHide();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const AddFishButton = () => {
  const [modalShow, setModalShow] = useState(false);
  const [fishtypes, setfishtypes] = useState([]);

  useEffect(() => {
    async function getFishTypes() {
      const resp = await fetch(
        "https://fishingrecorderapi.azurewebsites.net/api/FishType"
      );
      const data = await resp.json();

      console.log(data);
      setfishtypes(data);
    }

    getFishTypes();
  }, []);

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
        fishtypes={fishtypes}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddFishButton;
