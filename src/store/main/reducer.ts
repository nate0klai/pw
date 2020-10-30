import {
    CLEAR_LOGIN_ERROR,
    CLEAR_REGISTER_ERROR,
    GET_USER_INFO_FAIL,
    GET_USER_INFO_PROGRESS,
    GET_USER_INFO_SUCCESS,
    LOGIN_FAIL,
    LOGIN_PROGRESS,
    LOGIN_SUCCESS, LOGOUT,
    MainTypes,
    REGISTER_FAIL,
    REGISTER_PROGRESS,
    REGISTER_SUCCESS,
    UserFullInfo
} from "./types";

const initialState = {
    isAuthorized: false,
    me: null as UserFullInfo | null,
    loginIsPending: false,
    logoutIsPending: false,
    registerIsPending: false,
    getUserInfoIsPending: false,
    loginError: '',
    registerError: '',
    getUserInfoError: ''
};
type InitialStateType = typeof initialState;

export const MainReducer = (state = initialState, action: MainTypes): InitialStateType => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthorized: true,
                loginIsPending: false
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthorized: true,
                registerIsPending: false
            };

        case LOGIN_PROGRESS:
            return {
                ...state,
                loginIsPending: true
            };

        case REGISTER_PROGRESS:
            return {
                ...state,
                registerIsPending: true
            };

        case LOGIN_FAIL:
            return {
                ...state,
                loginIsPending: false,
                loginError: action.error
            };

        case CLEAR_LOGIN_ERROR:
            return {
                ...state,
                loginError: ''
            };

        case REGISTER_FAIL:
            return {
                ...state,
                registerIsPending: false,
                registerError: action.error
            };

        case CLEAR_REGISTER_ERROR:
            return {
                ...state,
                registerError: ''
            };

        case LOGOUT:
            return {
                ...state,
                isAuthorized: false,
                me: null
            }

        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isAuthorized: true,
                getUserInfoIsPending: false,
                me: action.user
            }

        case GET_USER_INFO_PROGRESS:
            return {
                ...state,
                getUserInfoIsPending: true,
            }

        case GET_USER_INFO_FAIL:
            return {
                ...state,
                getUserInfoIsPending: false,
                getUserInfoError: action.error
            }

        default:
            return state;
    }
}