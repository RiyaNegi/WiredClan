
import { CREATE_POST, UPDATE_POST, FETCH_EMAIL_USER } from '../actions/types';
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST:
            return { ...state, post: action.payload }
        case UPDATE_POST:
            return { ...state, post: action.payload, edit: true }
        case FETCH_EMAIL_USER:
            return { ...state, searchedUser: action.payload }
        default:
            return state;
    }
}
