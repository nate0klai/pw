import {ThunkAction} from "redux-thunk";
import {RootState} from "../../types";

export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
export const GET_TRANSACTIONS_PROCESS = 'GET_TRANSACTIONS_PROCESS'
export const GET_TRANSACTIONS_FAIL = 'GET_TRANSACTIONS_FAIL'
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS'
export const CREATE_TRANSACTION_PROCESS = 'CREATE_TRANSACTION_PROCESS'
export const CREATE_TRANSACTION_FAIL = 'CREATE_TRANSACTION_FAIL'
export const CLEAR_CREATE_TRANSACTION_ERROR = 'CLEAR_CREATE_TRANSACTION_ERROR'

export interface GetTransactionsSuccess {
    type: typeof GET_TRANSACTIONS_SUCCESS,
    transactions: Transaction[]
}
export interface GetTransactionsProcess {
    type: typeof GET_TRANSACTIONS_PROCESS,
}
export interface GetTransactionsFail {
    type: typeof GET_TRANSACTIONS_FAIL,
    error: string
}
export interface CreateTransactionSuccess {
    type: typeof CREATE_TRANSACTION_SUCCESS,
    transaction: Transaction
}
export interface CreateTransactionProcess {
    type: typeof CREATE_TRANSACTION_PROCESS,
}
export interface CreateTransactionFail {
    type: typeof CREATE_TRANSACTION_FAIL,
    error: string
}
export interface ClearCreateTransactionError {
    type: typeof CLEAR_CREATE_TRANSACTION_ERROR
}

export interface Transaction {
    id: number,
    date: number,
    username: string,
    amount: number,
    balance: number
}

type GetTransactionsTypes = GetTransactionsSuccess | GetTransactionsProcess | GetTransactionsFail;
type CreateTransactionTypes = CreateTransactionSuccess | CreateTransactionProcess | CreateTransactionFail | ClearCreateTransactionError;
export type TransactionsTypes = GetTransactionsTypes | CreateTransactionTypes;

export type ThunkTransactionsActionType = ThunkAction<Promise<void>, RootState, void, TransactionsTypes>;