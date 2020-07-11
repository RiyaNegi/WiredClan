import {
    CREATE_HACKATHON_POST, SET_LOADING, FETCH_HACKATHON_DETAILS, DELETE_HACKATHON_POST
} from '../actions/types';
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_HACKATHON_POST:
            return { ...state, isLoading: false }
        case SET_LOADING:
            return { ...state, isLoading: true }
        case FETCH_HACKATHON_DETAILS:
            return {
                ...state, postByCurrentUser: action.payload.postByCurrentUser, hackathonPosts: action.payload.posts,
                hackathonId: action.payload.id
            }
        case DELETE_HACKATHON_POST:
            return { ...state, postByCurrentUser: undefined };
        default:
            return state;
    }
}
