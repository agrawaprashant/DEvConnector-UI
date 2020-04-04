import axios from "axios";

export const updateObject = (oldObject, newObject) => {
  return {
    ...oldObject,
    ...newObject
  };
};

export const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const buildFormControl = (
  elementType,
  elementConfig,
  value,
  validationRules,
  styles
) => {
  return {
    elementType: elementType,
    elementConfig: elementConfig,
    value: value.value,
    valid: false,
    validationRules: validationRules,
    touched: false,
    styles: styles
  };
};
