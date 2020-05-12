import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const NavigationItem = (props) => {
  return (
    <Nav.Link as={NavLink} to={props.link}>
      {props.children}
    </Nav.Link>
  );
};

export default NavigationItem;
