import {
    ADD_HIKE,
    GET_HIKES,
    GET_HIKE,
    DELETE_HIKE,
    HIKE_LOADING
} from '../actions/types';

const initialState = {
    hikes: [],
    hike: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case HIKE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_HIKES:
            return {
                ...state,
                hikes: action.payload,
                loading: false
            };
        case GET_HIKE:
            return {
                ...state,
                hike: action.payload,
                loading: false
            };
        case ADD_HIKE:
            return {
                ...state,
                hikes: [action.payload, ...state.hikes]
            };
        case DELETE_HIKE:
            return {
                ...state,
                hikes: state.hikes.filter(hike => hike._id !== action.payload)
            };
        default:
            return state;
    }
}
