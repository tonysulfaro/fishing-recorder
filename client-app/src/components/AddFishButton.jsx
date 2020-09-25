import React, { useState } from "react";
import "./AddFishButton.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

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
  const [fishType, setfishType] = useState("walleye");
  const [lengthInches, setlengthInches] = useState();
  const { getAccessTokenSilently } = useAuth0();

  async function handleSubmit() {
    const domain = "rallyokr.us.auth0.com";
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user",
    });

    console.log(accessToken);

    var payload = {
      token: accessToken, //hardcoded for now
      FishType: fishType,
      lat: document.getElementById("lat").value,
      lon: document.getElementById("lon").value,
      lengthInches: lengthInches,
    };

    console.log(payload);

    var resp = await fetch(
      "https://fishing-recorder-api.herokuapp.com/api/FishRecord/save",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
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
                setfishType(e.target.value);
              }}
            >
              <option value="walleye">Walleye</option>
              <option value="perch">Perch</option>
              <option value="large-mouth-bass">Large Mouth Bass</option>
              <option value="small-mouth-bass">Small Mouth Bass</option>
              <option value="rock-bass">Rock Bass</option>
              <option value="drum">Drum</option>
              <option value="catfish">Catfish</option>
              <option value="muskie">Muskie</option>
              <option value="pike">Pike</option>
              <option value="steelhead">Steelhead</option>
              <option value="king-salmon">King Salmon</option>
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

  const fishtypes = [
    {
      Walleye: "walleye",
    },
  ];

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
