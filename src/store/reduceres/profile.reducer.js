import * as actionTypes from "../actions/actionTypes";
import {
  updateObject
} from "../../shared/utility";

const initialState = {
  profileData: null,
  loading: false,
  error: null,
  profileNotFound: false,
  otherPersonProfile: null
};

const fetchUserProfileStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    profileData: null,
    error: null,
    profileNotFound: false,
  });
};

const fetchUserProfileSuccess = (state, action) => {
  return updateObject(state, {
    profileData: action.payload.profileData,
    loading: false,
  });
};
const fetchUserProfileFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error
  });
};
const fetchOtherPersonProfileStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    otherPersonProfile: null
  });
};

const fetchOtherPersonProfileSuccess = (state, action) => {
  return updateObject(state, {
    laoding: false,
    otherPersonProfile: action.payload.otherPersonProfile
  });
};
const fetchOtherPersonProfileFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error
  });
};

const profileNotFound = (state, action) => {
  return updateObject(state, {
    loading: false,
    profileNotFound: true
  });
};

const addSkillsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    profileData: null
  });
};
const addSkillsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    profileData: action.payload.profileData,
  });
};
const addSkillsFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error,
    profileData: null,
  });
};
const addEducationStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    profileData: null,
  });
};
const addEducationSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    profileData: action.payload.profileData,
    error: null,
  });
};
const addEducationFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error,
  });
};
const addExperienceStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    profileData: null,
  });
};
const addExperienceSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    profileData: action.payload.profileData,
    error: null,
  });
};
const addExperienceFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PROFILE_START:
      return fetchUserProfileStart(state, action);
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
      return fetchUserProfileSuccess(state, action);
    case actionTypes.FETCH_USER_PROFILE_FAILED:
      return fetchUserProfileFailed(state, action);
    case actionTypes.FETCH_OTHER_PERSON_PROFILE_START:
      return fetchOtherPersonProfileStart(state, action);
    case actionTypes.FETCH_OTHER_PERSON_PROFILE_SUCCESS:
      return fetchOtherPersonProfileSuccess(state, action);
    case actionTypes.FETCH_OTHER_PERSON_PROFILE_FAILED:
      return fetchOtherPersonProfileFailed(state, action);
    case actionTypes.PROFILE_NOT_FOUND:
      return profileNotFound(state, action);
    case actionTypes.ADD_SKILLS_START:
      return addSkillsStart(state, action);
    case actionTypes.ADD_SKILLS_SUCCESS:
      return addSkillsSuccess(state, action);
    case actionTypes.ADD_SKILLS_FAILED:
      return addSkillsFailed(state, action);
    case actionTypes.ADD_EDUCATION_START:
      return addEducationStart(state, action);
    case actionTypes.ADD_EDUCATION_SUCCESS:
      return addEducationSuccess(state, action);
    case actionTypes.ADD_EDUCATION_FAILED:
      return addEducationFailed(state, action);
    case actionTypes.ADD_EXPERIENCE_START:
      return addExperienceStart(state, action);
    case actionTypes.ADD_EXPERIENCE_SUCCESS:
      return addExperienceSuccess(state, action);
    case actionTypes.ADD_EXPERIENCE_FAILED:
      return addExperienceFailed(state, action);
    default:
      return state;
  }
};

export default reducer;