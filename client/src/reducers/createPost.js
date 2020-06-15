
import { CREATE_POST, UPDATE_POST } from '../actions/types';
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST:
            return { ...state, post: action.payload }
        case UPDATE_POST:
            return { ...state, post: action.payload, edit: true }
        default:
            return state;
    }
}
