import React from "react";
import classes from "./navigation-items.module.css";
import NavigationItem from "./NavigationItem/navigation-item.component";
import Aux from "../../../hoc/Auxilliary/auxilliary";

const NavigationItems = props => {
  let navigationItems = null;
  if (!props.isAuth) {
    navigationItems = <NavigationItem link="/signup">Register</NavigationItem>;
  } else {
    navigationItems = (
      <Aux>
        <NavigationItem link="/logout">Logout</NavigationItem>
        <NavigationItem link="/profile">Profile</NavigationItem>
      </Aux>
    );
  }
  return <ul className={classes.NavigationItems}>{navigationItems}</ul>;
};

export default NavigationItems;
