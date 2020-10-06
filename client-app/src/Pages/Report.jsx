import React from "react";
import "./Report.css";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Table } from "react-bootstrap";
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
      <div className="report-container">
        <h1>Fishing Report</h1>
        <h2>Records</h2>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Fish Record ID</th>
              <th>Fish Type</th>
              <th>Length (inches)</th>
              <th>Water Temp (F)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {props.fish.map((fish) => (
              <tr>
                <td>{fish.fishRecordId}</td>
                <td>{fish.fishType}</td>
                <td>{fish.lengthInches}</td>
                <td>{fish.waterTemp}</td>
                <td>{fish.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Report;
