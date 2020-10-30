import {
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_PROCESS,
    GET_TRANSACTIONS_FAIL,
    Transaction,
    CREATE_TRANSACTION_SUCCESS,
    CREATE_TRANSACTION_PROCESS,
    CREATE_TRANSACTION_FAIL,
    CLEAR_CREATE_TRANSACTION_ERROR
} from "./types";

const initialState = {
    transactions: [] as Transaction[],
    getTransactionsIsPending: false,
    createTransactionIsPending: false,
    createTransactionError: '',
    getTransactionsError: ''
};
type InitialStateType = typeof initialState;

export const TransactionsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: action.transactions,
                getTransactionsIsPending: false
            };

        case GET_TRANSACTIONS_PROCESS:
            return {
                ...state,
                getTransactionsIsPending: true
            };

        case GET_TRANSACTIONS_FAIL:
            return {
                ...state,
                getTransactionsIsPending: false,
                getTransactionsError: action.error
            };

        case CREATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactions: [action.transaction, ...state.transactions],
                createTransactionIsPending: false
            };

        case CREATE_TRANSACTION_PROCESS:
            return {
                ...state,
                createTransactionIsPending: true
            };

        case CREATE_TRANSACTION_FAIL:
            return {
                ...state,
                createTransactionIsPending: false,
                createTransactionError: action.error
            };

        case CLEAR_CREATE_TRANSACTION_ERROR:
            return {
                ...state,
                createTransactionError: ''
            };

        default:
            return state;
    }
}