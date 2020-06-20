import * as actions from "./actionTypes";
import axios from "axios";
import { setAuthorizationToken } from "../../shared/utility";
import config from "../../config/app-config.json";

const fetchUserProfileStart = () => {
  return {
    type: actions.FETCH_USER_PROFILE_START,
  };
};
const fetchUserProfileSuccess = (profileData) => {
  return {
    type: actions.FETCH_USER_PROFILE_SUCCESS,
    payload: {
      profileData: profileData,
    },
  };
};
const fetchUserProfileFailed = (error) => {
  return {
    type: actions.FETCH_USER_PROFILE_FAILED,
    payload: {
      error: error,
    },
  };
};

const profileNotFound = () => {
  return {
    type: actions.PROFILE_NOT_FOUND,
  };
};

export const fetchUserProfile = (token) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserProfileStart());
      setAuthorizationToken(token);
      const result = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.profile}/me`
      );
      dispatch(fetchUserProfileSuccess(result.data));
    } catch (err) {
      if (err.response.status === 400) {
        dispatch(profileNotFound());
      } else {
        dispatch(fetchUserProfileFailed(err.response));
      }
    }
  };
};

const fetchOtherPersonProfileStart = () => {
  return {
    type: actions.FETCH_OTHER_PERSON_PROFILE_START,
  };
};
const fetchOtherPersonProfileFailed = (error) => {
  return {
    type: actions.FETCH_OTHER_PERSON_PROFILE_FAILED,
    payload: {
      error: error,
    },
  };
};
const fetchOtherPersonProfileSuccess = (profileData) => {
  return {
    type: actions.FETCH_OTHER_PERSON_PROFILE_SUCCESS,
    payload: {
      otherPersonProfile: profileData,
    },
  };
};

export const fetchOtherPersonProfile = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(fetchOtherPersonProfileStart());
      const response = await axios.get(
        `${config.api.baseURL}/${config.api.endPoints.profile}/${userId}`
      );
      dispatch(fetchOtherPersonProfileSuccess(response.data));
    } catch (err) {
      dispatch(fetchOtherPersonProfileFailed(err.response.data));
    }
  };
};

const editUserProfileStart = () => {
  return {
    type: actions.EDIT_USER_PROFILE_START,
  };
};
const editUserProfileSuccess = (profileData) => {
  return {
    type: actions.EDIT_USER_PROFILE_SUCCESS,
    payload: profileData,
  };
};
const editUserProfileFailed = (error) => {
  return {
    type: actions.EDIT_USER_PROFILE_FAILED,
    payload: {
      error: error,
    },
  };
};

export const editProfile = (profileData, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch(editUserProfileStart());
      setAuthorizationToken(token);
      const result = await axios.post(
        `${config.api.baseURL}/${config.api.endPoints.profile}/`,
        profileData
      );
      callback();
      dispatch(editUserProfileSuccess(result.data));
    } catch (err) {
      console.log(err);
      callback();
      dispatch(editUserProfileFailed(err.response.data));
    }
  };
};

const addSkillsStart = () => {
  return {
    type: actions.ADD_SKILLS_START,
  };
};
const addSkillsSuccess = (profileData) => {
  return {
    type: actions.ADD_SKILLS_SUCCESS,
    payload: {
      profileData: profileData,
    },
  };
};
const addSkillsFailed = (error) => {
  return {
    type: actions.ADD_SKILLS_FAILED,
    payload: {
      error: error,
    },
  };
};

export const addSkills = (token, skillData) => {
  return async (dispatch) => {
    try {
      dispatch(addSkillsStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        `${config.api.baseURL}/${config.api.endPoints.profile}/skills`,
        skillData
      );
      dispatch(addSkillsSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(addSkillsFailed(err.response.data));
    }
  };
};

const addBioStart = () => {
  return {
    type: actions.ADD_BIO_START,
  };
};
const addBioSuccess = (profileData) => {
  return {
    type: actions.ADD_BIO_SUCCESS,
    payload: {
      profileData: profileData,
    },
  };
};
const addBioFailed = (error) => {
  return {
    type: actions.ADD_BIO_FAILED,
    payload: {
      error: error,
    },
  };
};

export const addBio = (token, bioData) => {
  return async (dispatch) => {
    try {
      dispatch(addBioStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        `${config.api.baseURL}/${config.api.endPoints.profile}/bio`,
        bioData
      );
      dispatch(addBioSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(addBioFailed(err.response.data));
    }
  };
};

const addEducationStart = () => {
  return {
    type: actions.ADD_EDUCATION_START,
  };
};
const addEducationSuccess = (profileData) => {
  return {
    type: actions.ADD_EDUCATION_SUCCESS,
    payload: {
      profileData: profileData,
    },
  };
};
const addEducationFailed = (error) => {
  return {
    type: actions.ADD_EDUCATION_FAILED,
    payload: {
      error: error,
    },
  };
};

export const addEducation = (token, educationData) => {
  return async (dispatch) => {
    try {
      dispatch(addEducationStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        `${config.api.baseURL}/${config.api.endPoints.profile}/education`,
        educationData
      );
      dispatch(addEducationSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(addEducationFailed(err.response.data));
    }
  };
};
const addExperienceStart = () => {
  return {
    type: actions.ADD_EXPERIENCE_START,
  };
};
const addExperienceSuccess = (profileData) => {
  return {
    type: actions.ADD_EXPERIENCE_SUCCESS,
    payload: {
      profileData: profileData,
    },
  };
};
const addExperienceFailed = (error) => {
  return {
    type: actions.ADD_EXPERIENCE_FAILED,
    payload: {
      error: error,
    },
  };
};

export const addExperience = (token, expData) => {
  return async (dispatch) => {
    try {
      dispatch(addExperienceStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        `${config.api.baseURL}/${config.api.endPoints.profile}/experience`,
        expData
      );
      dispatch(addExperienceSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(addExperienceFailed(err.response.data));
    }
  };
};

const deleteEducationStart = () => {
  return {
    type: actions.DELETE_EDUCATION_START,
  };
};
const deleteEducationSuccess = (profileData) => {
  return {
    type: actions.DELETE_EDUCATION_SUCCESS,
    payload: {
      profileData: profileData,
    },
  };
};
const deleteEducationFailed = (error) => {
  return {
    type: actions.DELETE_EDUCATION_FAILED,
    payload: {
      error: error,
    },
  };
};

export const deleteEducation = (token, educationId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteEducationStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        `${config.api.baseURL}/${config.api.endPoints.profile}/education/${educationId}`
      );
      dispatch(deleteEducationSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(deleteEducationFailed(err.response.data));
    }
  };
};
const deleteExperienceStart = () => {
  return {
    type: actions.DELETE_EXPERIENCE_START,
  };
};
const deleteExperienceSuccess = (profileData) => {
  return {
    type: actions.DELETE_EXPERIENCE_SUCCESS,
    payload: {
      profileData: profileData,
    },
  };
};
const deleteExperienceFailed = (error) => {
  return {
    type: actions.DELETE_EXPERIENCE_FAILED,
    payload: {
      error: error,
    },
  };
};

export const deleteExperience = (token, expId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteExperienceStart());
      setAuthorizationToken(token);
      const result = await axios.put(
        `${config.api.baseURL}/${config.api.endPoints.profile}/experience/${expId}`
      );
      dispatch(deleteExperienceSuccess(result.data));
    } catch (err) {
      console.log(err);
      dispatch(deleteExperienceFailed(err.response.data));
    }
  };
};
