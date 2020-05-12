import React from "react";
import classes from "./hamburger-menu.module.css";
import NavigationItems from "../../../NavigationItems/navigation-items";

const HamburgerMenu = (props) => {
  return (
    <div className={classes.HamburgerMenu}>
      <NavigationItems />
    </div>
  );
};

export default HamburgerMenu;
