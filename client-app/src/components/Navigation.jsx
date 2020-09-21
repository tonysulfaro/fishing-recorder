import React from "react";
import "./Navigation.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

const Navigation = (props) => {
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
          <Nav.Link href="#features">All Fish</Nav.Link>
          <Nav.Link href="#pricing">My Fish</Nav.Link>
        </Nav>
        <Nav>
          <LogoutButton></LogoutButton>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
