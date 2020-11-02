import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Box } from '@material-ui/core'
import { Table } from 'src/components'
import { RootState } from '../types'
import { TransactionsTypes, Transaction } from '../store/transactions/types'
import { getTransactions as getTransactionsCreator } from '../store/transactions/actions'


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
    getTransactions: () => dispatch(getTransactionsCreator())
})

const Transactions: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ transactions, getTransactions }) => {
    useEffect(() => {
        getTransactions()
    }, [])

    if (!transactions) return <Box>loading</Box>

    return (
        <>
            {transactions.length > 0 ? (
                <Table list={transactions} />
            ) : (
                <Box>no transactions</Box>
            )}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)