/* eslint-disable no-unused-vars */
import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>Coursera</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/employees" className="nav-link">
              Employees
            </Link>
            <Link to="/departments" className="nav-link">
              Departments
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className="ml-2" variant="light">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
