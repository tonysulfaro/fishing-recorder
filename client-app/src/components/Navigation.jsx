import React from "react";
import "./Navigation.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Nav } from "react-bootstrap";
import LogoutButton from "./LogoutButton";
import AddFishButton from "./AddFishButton";

const Navigation = (props) => {
  const { getAccessTokenSilently } = useAuth0();

  async function getAllFish() {
    const domain = "rallyokr.us.auth0.com";
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user",
    });

    fetch(`https://fishing-recorder-api.herokuapp.com/api/fishrecord`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.setfish(data);
      });
  }

  async function getMyFish() {
    const domain = "rallyokr.us.auth0.com";
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user",
    });

    fetch(
      `https://fishing-recorder-api.herokuapp.com/api/fishrecord/myfish?token=${accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.setfish(data);
      });
  }

  return (
    <Navbar
      className="nav"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand href="#home">Fishing Recorder</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features" onClick={getAllFish}>
            All Fish
          </Nav.Link>
          <Nav.Link href="#myfish" onClick={getMyFish}>
            My Fish
          </Nav.Link>
        </Nav>
        <Nav>
          <AddFishButton></AddFishButton>
          <LogoutButton></LogoutButton>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
