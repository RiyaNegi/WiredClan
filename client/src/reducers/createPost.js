
import { CREATE_POST, UPDATE_POST, DELETE_POST } from '../actions/types';
import EditPost from '../components/Post/EditPost';

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST:
            return { ...state, post: action.payload }
        case UPDATE_POST:
            return { ...state, post: action.payload, edit: true }
        case DELETE_POST:
            return { ...state, post: action.payload }
        default:
            return state;
    }
}
