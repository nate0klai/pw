import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { ThunkAction } from 'redux-thunk'
import {
    CLEAR_LOGIN_ERROR,
    CLEAR_REGISTER_ERROR,
    ClearLoginError,
    ClearRegisterError,
    GET_USER_INFO_FAIL,
    GET_USER_INFO_PROGRESS,
    GET_USER_INFO_SUCCESS,
    GetUserInfoFail,
    GetUserInfoProgress,
    GetUserInfoSuccess,
    LOGIN_FAIL,
    LOGIN_PROGRESS,
    LOGIN_SUCCESS,
    LoginFail,
    LoginProgress,
    LoginSuccess,
    Logout,
    LOGOUT, MainTypes,
    REGISTER_FAIL,
    REGISTER_PROGRESS,
    REGISTER_SUCCESS,
    RegisterFail,
    RegisterProgress,
    RegisterSuccess,
    UserFullInfo
} from './types'
import { apiUrl } from '../variables'
import { RootState } from '../../types'

type ThunkMainActionType = ThunkAction<Promise<void>, RootState, void, MainTypes>

const loginSuccess = (): LoginSuccess =>
    ({
        type: LOGIN_SUCCESS
    })

const loginProgress = (): LoginProgress =>
    ({
        type: LOGIN_PROGRESS
    })

const loginFail = (error: string): LoginFail =>
    ({
        type: LOGIN_FAIL,
        error
    })

export const clearLoginError = (): ClearLoginError =>
    ({
        type: CLEAR_LOGIN_ERROR
    })

export const logout = (): Logout => ({
    type: LOGOUT
})

const registerSuccess = (): RegisterSuccess =>
    ({
        type: REGISTER_SUCCESS
    })

const registerProgress = (): RegisterProgress =>
    ({
        type: REGISTER_PROGRESS
    })

const registerFail = (error: string): RegisterFail =>
    ({
        type: REGISTER_FAIL,
        error
    })

export const clearRegisterError = (): ClearRegisterError =>
    ({
        type: CLEAR_REGISTER_ERROR
    })

type LoginRegisterResponseType = {id_token: string}

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
        dispatch(loginProgress())
        try {
            const { data }: AxiosResponse<LoginRegisterResponseType> = await axios.post(`${apiUrl}/sessions/create`, {
                email, password
            })
            Cookies.set('id_token', data.id_token)
            dispatch(loginSuccess())
            dispatch(getUserInfo())
        } catch (error) {
            dispatch(loginFail(error.response.data))
        }
    }
}

export const register = (username: string, email: string, password: string): ThunkMainActionType => {
    return async (dispatch) => {
        dispatch(registerProgress())
        try {
            const { data } : AxiosResponse<LoginRegisterResponseType> = await axios.post(`${apiUrl}/users`, {
                username, email, password
            })
            Cookies.set('id_token', data.id_token)
            dispatch(registerSuccess())
            dispatch(getUserInfo())
        } catch (error) {
            dispatch(registerFail(error.response.data))
        }
    }
}

export const getUserInfo = (): ThunkMainActionType => {
    return async (dispatch) => {
        const idToken = Cookies.get('id_token')
        dispatch(getUserInfoProgress())
        try {
            const { data } : AxiosResponse<{user_info_token: UserFullInfo}> = await axios.get(`${apiUrl}/api/protected/user-info`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })
            dispatch(getUserInfoSuccess(data.user_info_token))

        } catch (error) {
            dispatch(getUserInfoFail(error.response.data))
        }
    }
}