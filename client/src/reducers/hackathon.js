import {
    CREATE_HACKATHON_POST, SET_LOADING, FETCH_HACKATHON_DETAILS
} from '../actions/types';
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_HACKATHON_POST:
            debugger;
            return { ...state, isLoading: false }
        case SET_LOADING:
            return { ...state, isLoading: true }
        case FETCH_HACKATHON_DETAILS:
            return {
                ...state, postByCurrentUser: action.payload.postByCurrentUser, hackathonPosts: action.payload.posts,
                hackathonId: action.payload.id
            }
        default:
            return state;
    }
}
