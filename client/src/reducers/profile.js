import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  GET_EDUCATION,
  GET_PROJECT,
  GET_EXPERIENCE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  education: null,
  project: null,
  experience: null,
  loading: false
};

export default function(state = initialState, action) {
  
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_EDUCATION:
      return {
        ...state,
        education: action.payload,
        loading: false
      };

    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };

    case GET_EXPERIENCE:
      return {
        ...state,
        experience: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
