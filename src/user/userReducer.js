import { LOGIN, LOGOUT} from './userActions.js';

const initialState = {
    email: "",
    password: "",
    id: 0,
    isAuthenticated: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                email: action.payload.email,
                id: action.payload.id,
                isAuthenticated: true,
            }
        }
        case LOGOUT: {
            return state;
        }
        default: {
            return state;
        }
    }
}

export default user;