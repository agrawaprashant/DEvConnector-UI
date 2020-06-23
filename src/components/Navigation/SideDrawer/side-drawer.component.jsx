import React from "react";

import classes from "./side-drawer.module.css";
import Logo from "../../../assets/img/logo.png";
import NavigationItems from "../NavigationItems/navigation-items";
import Backdrop from "../../UI/Backdrop/backdrop.component";
import Aux from "../../../hoc/Auxilliary/auxilliary";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <img src={Logo} alt="logo" />
        </div>

        <nav>
          <NavigationItems isAuth={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
