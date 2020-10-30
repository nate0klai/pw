import {
    CREATE_TRANSACTION_FAIL,
    CREATE_TRANSACTION_PROCESS,
    CREATE_TRANSACTION_SUCCESS,
    CreateTransactionFail,
    CreateTransactionProcess,
    CreateTransactionSuccess,
    GET_TRANSACTIONS_FAIL,
    GET_TRANSACTIONS_PROCESS,
    GET_TRANSACTIONS_SUCCESS,
    GetTransactionsFail,
    GetTransactionsProcess,
    GetTransactionsSuccess,
    ThunkTransactionsActionType,
    Transaction
} from "./types";
import axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";
import {UserSimpleInfo} from "../main/types";

const getTransactionsSuccess = (transactions: Transaction[]): GetTransactionsSuccess => ({
    type: GET_TRANSACTIONS_SUCCESS,
    transactions
})
const getTransactionsProcess = (): GetTransactionsProcess => ({
    type: GET_TRANSACTIONS_PROCESS
})
const getTransactionsFail = (error: string): GetTransactionsFail => ({
    type: GET_TRANSACTIONS_FAIL,
    error
})

const createTransactionSuccess = (transaction: Transaction): CreateTransactionSuccess => ({
    type: CREATE_TRANSACTION_SUCCESS,
    transaction
})
const createTransactionProcess = (): CreateTransactionProcess => ({
    type: CREATE_TRANSACTION_PROCESS
})
const createTransactionFail = (error: string): CreateTransactionFail => ({
    type: CREATE_TRANSACTION_FAIL,
    error
})

export const getTransactions = (): ThunkTransactionsActionType => {
    return async (dispatch) => {
        dispatch(getTransactionsProcess())
        const idToken = Cookies.get('id_token')
        try {
            const { data }: AxiosResponse<{trans_token: Transaction[]}> = await axios.get('http://193.124.114.46:3001/api/protected/transactions', {
                headers: {
                    Authorization: 'Bearer ' + idToken
                }
            })
            dispatch(getTransactionsSuccess(data.trans_token))
        } catch (error) {
            dispatch(getTransactionsFail(error.message))
        }
    }
}

export const createTransaction = (name: string, amount: number): ThunkTransactionsActionType => {
    return async (dispatch) => {
        console.log('create transaction')
        dispatch(createTransactionProcess())
        const idToken = Cookies.get('id_token')
        try {
            const { data }: AxiosResponse<{trans_token: Transaction}> = await axios.post('http://193.124.114.46:3001/api/protected/transactions', {
                name, amount
            }, {
                headers: {
                    Authorization: 'Bearer ' + idToken
                }
            })
            dispatch(createTransactionSuccess(data.trans_token))
        } catch (error) {
            dispatch(createTransactionFail(error.message))
        }
    }
}

export const filteredUserList = async (filter: string) => {
    const idToken = Cookies.get('id_token')
    try {
        const { data }: AxiosResponse<UserSimpleInfo[]> = await axios.post('http://193.124.114.46:3001/api/protected/users/list', {filter},{
            headers: {
                Authorization: 'Bearer ' + idToken
            }
        })
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
        return []
    }
}