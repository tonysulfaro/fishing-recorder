import React from "react";
import "./Navigation.css";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

const Navigation = (props) => {
  return (
    <Navbar bg="dark" variant="dark" className="nav">
      <Navbar.Brand href="#home">Fishing Recorder</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link active href="#home">
          All Fish
        </Nav.Link>
        <Nav.Link href="#features">My Fish</Nav.Link>
      </Nav>
      <Form inline>
        <LogoutButton></LogoutButton>
      </Form>
    </Navbar>
  );
};

export default Navigation;
