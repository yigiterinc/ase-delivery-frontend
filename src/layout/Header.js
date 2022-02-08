import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast } from '@fortawesome/free-solid-svg-icons'
import {userActions} from "../store/actions/userAction";
import {useDispatch} from "react-redux";

export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand>
        <FontAwesomeIcon icon={faShippingFast}/> ASE Delivery
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>

          <Nav.Link onClick={()  => {
              dispatch(userActions.logout());
          }
          }>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
