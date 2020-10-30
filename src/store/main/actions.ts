import axios, {AxiosResponse} from 'axios'
import {
    GET_USER_INFO_PROGRESS,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,
    GetUserInfoProgress,
    GetUserInfoSuccess,
    GetUserInfoFail,
    LOGIN_FAIL,
    LOGIN_PROGRESS,
    LOGIN_SUCCESS,
    LoginFail,
    LoginProgress,
    LoginSuccess,
    REGISTER_FAIL,
    REGISTER_PROGRESS,
    REGISTER_SUCCESS,
    RegisterFail,
    RegisterProgress,
    RegisterSuccess,
    UserFullInfo, Logout, LOGOUT, ThunkMainActionType,
} from "./types"
import Cookies from 'js-cookie'

const loginSuccess = (): LoginSuccess =>
    ({
        type: LOGIN_SUCCESS
    });

const loginProgress = (): LoginProgress =>
    ({
        type: LOGIN_PROGRESS
    });

const loginFail = (error: string): LoginFail =>
    ({
        type: LOGIN_FAIL,
        error,
    });

export const logout = (): Logout => ({// TODO: dont forget clear cookie token field
    type: LOGOUT
})

const registerSuccess = (): RegisterSuccess =>
    ({
        type: REGISTER_SUCCESS,
    });

const registerProgress = (): RegisterProgress =>
    ({
        type: REGISTER_PROGRESS,
    });

const registerFail = (error: string): RegisterFail =>
    ({
        type: REGISTER_FAIL,
        error,
    });

type LoginRegisterResponseType = {id_token: string};

const getUserInfoSuccess = (user: UserFullInfo): GetUserInfoSuccess =>
    ({
        type: GET_USER_INFO_SUCCESS,
        user
    })

const getUserInfoProgress = (): GetUserInfoProgress =>
    ({
        type: GET_USER_INFO_PROGRESS
    })

const getUserInfoFail = (error: string): GetUserInfoFail =>
    ({
        type: GET_USER_INFO_FAIL,
        error
    })

export const login = (email: string, password: string): ThunkMainActionType => {
    return async (dispatch) => {
        dispatch(loginProgress());
        try {
            const { data }: AxiosResponse<LoginRegisterResponseType> = await axios.post('http://193.124.114.46:3001/sessions/create', {
                email, password
            })
            Cookies.set('id_token', data.id_token)
            dispatch(loginSuccess());
            dispatch(getUserInfo())
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    };
};

export const register = (username: string, email: string, password: string): ThunkMainActionType => {
    return async (dispatch) => {
        dispatch(registerProgress());
        try {
            const { data } : AxiosResponse<LoginRegisterResponseType> = await axios.post('http://193.124.114.46:3001/users', {
                username, email, password
            })
            Cookies.set('id_token', data.id_token)
            dispatch(registerSuccess());
            dispatch(getUserInfo())
        } catch (error) {
            dispatch(registerFail(error.message));
        }
    };
};

export const getUserInfo = (): ThunkMainActionType => {
    return async (dispatch) => {
        const idToken = Cookies.get('id_token')
        dispatch(getUserInfoProgress())
        try {
            const { data } : AxiosResponse<{user_info_token: UserFullInfo}> = await axios.get('http://193.124.114.46:3001/api/protected/user-info', {
                headers: {
                    Authorization: 'Bearer ' + idToken
                }
            })
            console.log(data.user_info_token)
            dispatch(getUserInfoSuccess(data.user_info_token))

        } catch (error) {
            dispatch(getUserInfoFail(error.message))
        }
    };
};