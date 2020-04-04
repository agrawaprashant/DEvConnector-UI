import * as actionTypes from "./actionTypes";
import { setAuthorizationToken } from "../../shared/utility";
import axios from "axios";
const registrationStart = () => {
  return {
    type: actionTypes.REGISTRATION_START
  };
};

const registrationSuccess = token => {
  return {
    type: actionTypes.REGISTRATION_SUCCESS,
    payload: {
      token: token
    }
  };
};

const registrationFailed = error => {
  return {
    type: actionTypes.REGISTRATION_FAILED,
    payload: {
      error: error
    }
  };
};

export const register = (name, email, password) => {
  return async dispatch => {
    try {
      dispatch(registrationStart());
      const registrationdata = {
        name: name,
        email: email,
        password: password
      };

      const result = await axios.post(
        "http://localhost:5000/api/users",
        registrationdata
      );
      localStorage.setItem("jwtToken", result.data.token);
      dispatch(registrationSuccess(result.data.token));
    } catch (err) {
      console.log(err);
      dispatch(registrationFailed(err));
    }
  };
};

const fetchUserDetailsStart = () => {
  return {
    type: actionTypes.FETCH_USER_DETAILS_START
  };
};
const fetchUserDetailsSuccess = userData => {
  return {
    type: actionTypes.FETCH_USER_DETAILS_SUCCESS,
    payload: {
      name: userData.name,
      id: userData._id,
      email: userData.email,
      avatar: userData.avatar
    }
  };
};
const fetchUserDetailsFailed = error => {
  return {
    type: actionTypes.FETCH_USER_DETAILS_FAILED,
    payload: {
      error: error
    }
  };
};

export const fetchUser = token => {
  return async dispatch => {
    try {
      dispatch(fetchUserDetailsStart());
      setAuthorizationToken(token);
      const result = await axios.get("http://localhost:5000/api/auth");
      console.log(result);
      dispatch(fetchUserDetailsSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchUserDetailsFailed(err));
    }
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token
    }
  };
};
const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: {
      error: error
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      dispatch(authStart());
      setAuthorizationToken();
      const loginData = {
        email: email,
        password: password
      };
      const result = await axios.post(
        "http://localhost:5000/api/auth",
        loginData
      );
      dispatch(authSuccess(result.data.token));
    } catch (err) {
      console.log(err);
      dispatch(authFailed(err));
    }
  };
};

const authLogout = () => {
  localStorage.removeItem("jwtToken");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(authLogout());
  };
};

const addBioStart = () => {
  return {
    type: actionTypes.ADD_BIO_START
  };
};
const addBioSuccess = profileData => {
  return {
    type: actionTypes.ADD_BIO_SUCCESS,
    payload: {
      profileData: profileData
    }
  };
};
const addBioFailed = error => {
  return {
    type: actionTypes.ADD_BIO_FAILED,
    payload: {
      error: error
    }
  };
};
const addEducationStart = () => {
  return {
    type: actionTypes.ADD_EDUCATION_START
  };
};
const addEducationSuccess = profileData => {
  return {
    type: actionTypes.ADD_EDUCATION_SUCCESS,
    payload: {
      profileData: profileData
    }
  };
};
const addEducationFailed = error => {
  return {
    type: actionTypes.ADD_EDUCATION_FAILED,
    payload: {
      error: error
    }
  };
};
const addExperienceStart = () => {
  return {
    type: actionTypes.ADD_EXPERIENCE_START
  };
};
const addExperienceSuccess = profileData => {
  return {
    type: actionTypes.ADD_EXPERIENCE_SUCCESS,
    payload: {
      profileData: profileData
    }
  };
};
const addExpirienceFailed = error => {
  return {
    type: actionTypes.ADD_EXPERIENCE_FAILED,
    payload: {
      error: error
    }
  };
};
