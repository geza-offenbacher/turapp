import axios from 'axios';

import {
    ADD_HIKE,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_HIKES,
    GET_HIKE,
    HIKE_LOADING,
    DELETE_HIKE
} from './types';

export const addHike = hikeData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/hikes', hikeData)
        .then(res =>
            dispatch({
                type: ADD_HIKE,
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

export const getHikes = () => dispatch => {
    dispatch(setHikeLoading());
    axios
        .get('/api/hikes')
        .then(res =>
            dispatch({
                type: GET_HIKES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_HIKES,
                payload: null
            })
        );
};

export const getHike = id => dispatch => {
    dispatch(setHikeLoading());
    axios
        .get(`/api/hikes/${id}`)
        .then(res =>
            dispatch({
                type: GET_HIKE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_HIKE,
                payload: null
            })
        );
};

export const deleteHike = id => dispatch => {
    axios
        .delete(`/api/hikes/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_HIKE,
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

export const addHikeLike = id => dispatch => {
    axios
        .post(`/api/hikes/hikeLike/${id}`)
        .then(res => dispatch(getHikes()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const removeHikeLike = id => dispatch => {
    axios
        .post(`/api/hikes/unHikeLike/${id}`)
        .then(res => dispatch(getHikes()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const addHikeComment = (hikeId, hikeCommentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/hikes/hikeComment/${hikeId}`, hikeCommentData)
        .then(res =>
            dispatch({
                type: GET_HIKE,
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

export const deleteHikeComment = (hikeId, hikeCommentId) => dispatch => {
    axios
        .delete(`/api/hikes/hikeComment/${hikeId}/${hikeCommentId}`)
        .then(res =>
            dispatch({
                type: GET_HIKE,
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

export const setHikeLoading = () => {
    return {
        type: HIKE_LOADING
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
