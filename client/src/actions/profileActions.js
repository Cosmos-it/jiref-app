import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_EDUCATION,
  SET_CURRENT_USER,
  GET_PROFILES,
  GET_EXPERIENCE,
  GET_PROJECT
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api.jiref.com/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};


/**
 * 
 * @param {*} data 
 */
export const search = (data) => dispatch => {
  axios.get("/api.jiref.com/profile/search").then(search => {
    dispatch({
      type: GET_PROFILES,
      payload: search.data
    }).catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: {}
      })
    );
  })

}

/**
 * @param {userA, userB } userA, userB)
 */
export const onFollow = (userA, userB) => dispatch => {

  const data = {
    userA: userA,
    userB: userB
  }
  axios.post(`/api.jiref.com/profile/followers`, data)
    .then(res => { });
}


/**
 * @param {id} me
 */
export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api.jiref.com/profile/user/${id}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

/**
 * @param {me} me
 */
export const getProfileByHandle = me => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api.jiref.com/profile/me/${me}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

/**
 * Get all profiles
 */
export const getProfiles = (search = '') => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api.jiref.com/profile/all?me=${search}`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: {}
      })
    );
};

/**
 * Create Profile
 * @param {Create Profile} profileData
 * @param {*} history
 */
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api.jiref.com/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/**
 *
 * @param {Add experience} expData
 * @param {*} history
 */
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api.jiref.com/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/**
 *
 * @param {Add education} id
 */
export const getEducationById = id => dispatch => {
  dispatch(setProfileLoading());

  axios.get(`/api.jiref.com/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_EDUCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EDUCATION,
        payload: err.response.data
      })
    );
};

/**
 *
 * @param {*} id
 * @param {*} data
 */
export const updateEducation = (id, data) => dispatch => {
  console.log("Updating education");

};

/**
 *
 * @param {*} id
 * @param {*} data
 */
export const updateExperience = (id, data) => dispatch => {

  console.log("Updating experience");

};


export const getExperienceById = (id) => (dispatch) => {
  dispatch(setProfileLoading());
  axios.get(`/api.jiref.com/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: err.response.data
      })
    );
}


/**
 *
 * @param {Update experience by id} id
 * @param {Pass new data} data
 */
export const updateProject = (id, data) => dispatch => {
  console.log("Updating project");

};


/**
 * 
 * @param {Get project by id} id 
 */
export const getProjectById = (id) => (dispatch) => {
  dispatch(setProfileLoading());
  axios.get(`/api.jiref.com/profile/project/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_PROJECT,
        payload: err.response.data
      })
    );
}


/**
 * Add new data
 * @param {Post new data} data
 * @param {Redirect user to dashboard} history
 */
export const addEducation = (data, history) => dispatch => {
  axios.post("/api.jiref.com/profile/education", data)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


/**
 *
 * @param {Post project data} project
 * @param {Redirect user to dashboard} history
 */
export const addProject = (project, history) => dispatch => {
  axios.post("/api.jiref.com/profile/project", project)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/**
 * Delete Experience
 * @param {Delete project by id} id
 */
export const deleteProject = id => dispatch => {
  axios.delete(`/api.jiref.com/profile/project/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


/**
 * Delete Experience
 * @param {*} id
 */
export const deleteExperience = id => dispatch => {
  axios.delete(`/api.jiref.com/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


/**
 * Delete Education
 * @param {Delete Education} id
 */
export const deleteEducation = id => dispatch => {
  axios.delete(`/api.jiref.com/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


/**
 * Delete account & profile
 */
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios.delete("/api.jiref.com/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};


/**
 * Profile loading
 */
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};


/**
 * Clear profile
 */
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
