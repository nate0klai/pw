import {ThunkAction} from "redux-thunk";
import {RootState} from "../../types";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_PROGRESS = 'LOGIN_PROGRESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_PROGRESS = 'REGISTER_PROGRESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const CLEAR_REGISTER_ERROR = 'CLEAR_REGISTER_ERROR'

export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_PROGRESS = 'GET_USER_INFO_PROGRESS'
export const GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL'

export interface LoginSuccess {
    type: typeof LOGIN_SUCCESS
}
export interface LoginProgress {
    type: typeof LOGIN_PROGRESS
}
export interface LoginFail {
    type: typeof LOGIN_FAIL
    error: string
}
export interface ClearLoginError {
    type: typeof CLEAR_LOGIN_ERROR
}

export interface Logout {
    type: typeof LOGOUT
}

export interface RegisterSuccess {
    type: typeof REGISTER_SUCCESS
}
export interface RegisterProgress {
    type: typeof REGISTER_PROGRESS
}
export interface RegisterFail {
    type: typeof REGISTER_FAIL
    error: string
}
export interface ClearRegisterError {
    type: typeof CLEAR_REGISTER_ERROR
}

type LoginTypes = LoginSuccess | LoginProgress | LoginFail | ClearLoginError;
type RegisterTypes = RegisterSuccess | RegisterProgress | RegisterFail | ClearRegisterError;
type GetUserInfoTypes = GetUserInfoSuccess | GetUserInfoProgress | GetUserInfoFail;
export type MainTypes = LoginTypes | Logout | RegisterTypes | GetUserInfoTypes;

export interface UserSimpleInfo {
    id: number,
    name: string
}

export interface UserAdditionalInfo {
    email: string,
    balance: number
}

export type UserFullInfo = UserSimpleInfo & UserAdditionalInfo

export interface GetUserInfoSuccess {
    type: typeof GET_USER_INFO_SUCCESS,
    user: UserFullInfo
}
export interface GetUserInfoProgress {
    type: typeof GET_USER_INFO_PROGRESS
}
export interface GetUserInfoFail {
    type: typeof GET_USER_INFO_FAIL
    error: string
}

export type ThunkMainActionType = ThunkAction<Promise<void>, RootState, void, MainTypes>;