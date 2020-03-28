import React from "react";
import classes from "./input.module.css";

const input = props => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];

  if (!props.valid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  inputClasses = inputClasses.join(" ");
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses}
          onChange={props.changed}
          defaultValue={props.elementConfig.placeholder}
        >
          <option value={props.elementConfig.placeholder} disabled>
            {props.elementConfig.placeholder}
          </option>
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayName}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
