import React from "react";
import classes from "./navbar.module.css";
import NavigationItems from "../NavigationItems/navigation-items";
import { NavLink } from "react-router-dom";
const Navbar = props => {
  return (
    <div className={classes.Navbar}>
      <div className={classes.Container}>
        <h1>
          <NavLink to="/">DevConnector</NavLink>
        </h1>
        <div className={classes.Navigation}>
          <div className={classes.SearchBar}>
            <input type="search" placeholder="Search Developers" />
            <button type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <NavigationItems isAuth={props.isAuth} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
