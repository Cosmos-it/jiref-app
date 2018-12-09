import axios from "axios";
import { ADD_POST, GET_POSTS, GET_ERRORS,GET_POST, POST_LOADING, DELETE_POST,CLEAR_ERRORS } from './types';

const API_ENDPOINT = '/api.jiref.com/';

export const add_post = (post_data) => dispatch => {
  axios.post(`${API_ENDPOINT}posts/post`, post_data)
    .then(post =>
      dispatch({
        type: ADD_POST,
        payload: post.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const get_posts = () => dispatch => {
  // dispatch(setPostLoading());
  axios.get(`${API_ENDPOINT}posts`)
    .then(post => {
      dispatch({
        type: GET_POSTS,
        payload: post.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    })
}

export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`${API_ENDPOINT}posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};


export const deletePost = id => dispatch => {
  axios
    .delete(`${API_ENDPOINT}posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addLike = id => dispatch => {
  axios
    .post(`${API_ENDPOINT}posts/like/${id}`)
    .then(res => dispatch(get_posts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`${API_ENDPOINT}posts/unlike/${id}`)
    .then(res => dispatch(get_posts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${API_ENDPOINT}posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
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

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`${API_ENDPOINT}posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
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

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};


