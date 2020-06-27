import React from "react";
import classes from "./navigation-items.module.css";
import NavigationItem from "./NavigationItem/navigation-item.component";
import Aux from "../../../hoc/Auxilliary/auxilliary";

const NavigationItems = (props) => {
  let navigationItems = null;
  if (!props.isAuth) {
    navigationItems = <NavigationItem link="/signup">Register</NavigationItem>;
  } else {
    navigationItems = (
      <Aux>
        {/* <div className={classes.SearchBar}>
          <input type="search" />
          <button>
            <i class="fas fa-search"></i>
          </button>
        </div> */}

        <NavigationItem link="/profile">Dashboard</NavigationItem>

        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
    );
  }
  return <div className={classes.NavigationItems}>{navigationItems}</div>;
};

export default NavigationItems;
