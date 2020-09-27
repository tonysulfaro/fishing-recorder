import React from "react";
import "./Report.css";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import LogoutButton from "../components/LogoutButton";

const Report = (props) => {
  const history = useHistory();

  function goToMap() {
    history.push("/protected");
  }

  return (
    <div>
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
            <Nav.Link href="#allfish" onClick={goToMap}>
              Fish Map
            </Nav.Link>
          </Nav>
          <Nav>
            <LogoutButton></LogoutButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1>Fishing Report</h1>
    </div>
  );
};

export default Report;
