import axios from "axios";

export const updateObject = (oldObject, newObject) => {
  return {
    ...oldObject,
    ...newObject,
  };
};

export const setAuthorizationToken = (token) => {
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
    valid: value.value !== "" || !validationRules.required ? true : false,
    validationRules: validationRules,
    touched: false,
    styles: styles,
  };
};

export const checkMimeType = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = (e) => {
    const arr = new Uint8Array(e.target.result).subarray(0, 4);
    let header = "";
    let isValid = false;
    for (let i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
    console.log(header);
    switch (header) {
      case "89504e47": //image/png
        isValid = true;
        break;
      case "47494638": //image/gif
        isValid = true;
        break;
      case "ffd8ffe0":
      case "ffd8ffe1":
      case "ffd8ffe2":
      case "ffd8ffe3":
      case "ffd8ffe8": // image/jpeg
        isValid = true;
        break;
      default:
        isValid = false;
        break;
    }
    callback(isValid);
  };
  reader.readAsArrayBuffer(file);
};
