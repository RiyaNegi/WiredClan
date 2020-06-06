
import { CREATE_POST } from '../actions/types';

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST:
            return { ...state, post: action.payload }
        default:
            return state;
    }
}