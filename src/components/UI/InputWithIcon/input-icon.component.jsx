import React from "react";
import classes from "./input-icon.module.css";

const input = props => {
  let inputClasses = [classes.InputWithIcon];
  if (!props.valid && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  let inputWIthIcon = (
    <div className={inputClasses.join(" ")}>
      <i className={props.iconClass}></i>
      <input
        {...props.elementConfig}
        onChange={props.changed}
        value={props.value}
      />
    </div>
  );
  return inputWIthIcon;
};

export default input;
