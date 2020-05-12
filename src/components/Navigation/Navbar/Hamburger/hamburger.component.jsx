import React from "react";
import classes from "./hamburger.module.css";
const Hamburger = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Hamburger;
