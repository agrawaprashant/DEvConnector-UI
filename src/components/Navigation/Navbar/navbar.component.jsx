import React from "react";
import classes from "./navbar.module.css";
import NavigationItems from "../NavigationItems/navigation-items";
import { NavLink } from "react-router-dom";
import Hamburger from "./Hamburger/hamburger.component";
import Logo from "../../../assets/img/logo.png";
// import HamburgerMenu from "./Hamburger/HamburgerMenu/hamburger-menu.component";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHamburgerManu: false,
    };
  }

  hamburgerOpenHandler = () => {
    this.setState({ showHamburgerManu: true });
  };

  hamburgerClosedHandler = () => {
    this.setState({ showHamburgerManu: false });
  };

  render() {
    const { props } = this;

    return (
      <div className={classes.Navbar}>
        <NavLink to="/">
          <img className={classes.Logo} src={Logo} alt="logo" />
        </NavLink>
        <Hamburger clicked={this.hamburgerOpenHandler} />

        <div className={classes.NavItems}>
          <NavigationItems isAuth={props.isAuth} />
        </div>
      </div>
    );
  }
}

export default Navbar;
