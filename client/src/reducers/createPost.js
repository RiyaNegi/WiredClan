
import {
    CREATE_POST, UPDATE_POST, FETCH_EMAIL_USER,
    REMOVE_SEARCHED_USER, REMOVE_ERROR_MESSAGE, SET_LOADING
} from '../actions/types';
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST:
            return { ...state, post: action.payload, isLoading: false }
        case UPDATE_POST:
            return { ...state, post: action.payload, edit: true, isLoading: false }
        case FETCH_EMAIL_USER:
            var search = action.error ? { errorMessage: action.payload } : { searchedUser: action.payload }
            return { ...state, ...search }
        case REMOVE_SEARCHED_USER:
            return { ...state, searchedUser: undefined }
        case REMOVE_ERROR_MESSAGE:
            return { ...state, errorMessage: undefined }
        case SET_LOADING:
            return { ...state, isLoading: true }
        default:
            return state;
    }
}
