import React, {useEffect} from "react";
import {Box} from "@material-ui/core";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../types";
import {TransactionsTypes, Transaction} from "../store/transactions/types";
import {getTransactions} from "../store/transactions/actions";
import { Table } from 'src/components'

interface MapStatePropsType {
    transactions: Transaction[]
}

interface MapDispatchPropsType {
    getTransactions: () => void
}

const mapStateToProps = (state: RootState) => ({
    transactions: state.transactions.transactions
})

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, TransactionsTypes>): MapDispatchPropsType => ({
    getTransactions: () => dispatch(getTransactions())
});

const Transactions: React.FC<MapStatePropsType & MapDispatchPropsType> = ({transactions, getTransactions}) => {
    useEffect(() => {
        getTransactions()
    }, [])

    if (!transactions) return <Box>loading</Box>

    return (
        <>
            {transactions.length > 0 ? (
                <Table list={transactions}/>
            ) : (
                <Box>no transactions</Box>
            )}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)