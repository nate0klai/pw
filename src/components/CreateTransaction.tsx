import React, {useCallback} from "react"
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import {connect} from "react-redux"
import {RootState} from "../types"
import {ThunkDispatch} from "redux-thunk";
import {TransactionsTypes} from "../store/transactions/types";
import {
    clearCreateTransactionError,
    createTransaction,
} from "../store/transactions/actions";
import {ButtonWithModal, Modal, RenderTextField, UsersList} from "./index";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Box, Button, Grid} from "@material-ui/core";

interface CreateTransactionFormValuesType {
    recipientName: string,
    amount: string
}

interface MapStateCreateTransactionFormComponentPropsType {
    balance?: number
}

const mapStateToCreateTransactionFormComponentProps = (state: RootState) => ({
    balance: state.main.me?.balance
})

const required = (value: string | undefined) => value ? undefined : 'Required'
const isNumber = (value: string) => +value ? undefined : 'enter number'
const moneyEnough = (balance: number | undefined) => balance ?
    (value: string) => (value.length > 0 && +value && (+value <= balance)) ? undefined : 'not enough' :
    () => false

const CreateTransactionFormComponent: React.FC<InjectedFormProps<CreateTransactionFormValuesType> & MapStateCreateTransactionFormComponentPropsType> = ({
                                                                                                                             handleSubmit,
                                                                                                                             submitting,
                                                                                                                         balance}) => {
    const moneyLessBalance = useCallback(moneyEnough(balance), [balance]);

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Field name="recipientName" component={UsersList} validate={[ required ]} />
                </Grid>
                <Grid item>
                    <Field name="amount" component={RenderTextField} placeholder="amount" validate={[ required, isNumber, moneyLessBalance ]} />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="outlined" disabled={submitting}>create</Button>
                </Grid>
            </Grid>
        </form>
    )
}

const connectedCreateTransactionFormComponent = connect(mapStateToCreateTransactionFormComponentProps)(CreateTransactionFormComponent);

const CreateTransactionForm = reduxForm<CreateTransactionFormValuesType>({
    form: 'createTransactionForm',
    initialValues: {
        recipientName: '',
        amount: ''
    },
})(connectedCreateTransactionFormComponent)

interface MapStateCreateTransactionPropsType {
    error: string
}

interface MapDispatchCreateTransactionPropsType {
    createTransaction: (recipientName: string, amount: number) => void,
    clearCreateTransactionError: () => void
}

type CreateTransactionProps = MapStateCreateTransactionPropsType & MapDispatchCreateTransactionPropsType;

const mapStateToCreateTransactionProps = (state: RootState) => ({
    error: state.transactions.createTransactionError
})

const mapDispatchToCreateTransactionProps = (dispatch: ThunkDispatch<RootState, any, TransactionsTypes>): MapDispatchCreateTransactionPropsType => ({
    createTransaction: (recipientName, amount) => dispatch(createTransaction(recipientName, amount)),
    clearCreateTransactionError: () => dispatch(clearCreateTransactionError())
});

const CreateTransaction: React.FC<CreateTransactionProps> = ({error, createTransaction, clearCreateTransactionError}) => {
    const handleCreateTransaction = ({recipientName, amount}: CreateTransactionFormValuesType) => {
        createTransaction(recipientName, +amount)
    }
    return (
        <>
            <ButtonWithModal buttonIcon={<AddCircleSharpIcon fontSize="large" color="secondary" />}>
                <CreateTransactionForm onSubmit={handleCreateTransaction}/>
            </ButtonWithModal>
            <Modal open={error.length > 0} handleClose={clearCreateTransactionError}>
                <Box>{error}</Box>
            </Modal>
        </>
    )
}

export default connect(mapStateToCreateTransactionProps, mapDispatchToCreateTransactionProps)(CreateTransaction)