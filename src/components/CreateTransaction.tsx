import React, {useCallback} from "react"
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import {connect} from "react-redux"
import {RootState} from "../types"
import {ThunkDispatch} from "redux-thunk";
import {TransactionsTypes} from "../store/transactions/types";
import {createTransaction,} from "../store/transactions/actions";
import {ButtonWithModal, RenderTextField, UsersList} from "./index";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Button, Grid} from "@material-ui/core";

interface CreateTransactionFormValuesType {
    recipientName: string,
    amount: string
}

interface MapStatePropsType {
    balance?: number
}

const mapStateToProps = (state: RootState) => ({
    balance: state.main.me?.balance
})

const required = (value: string | undefined) => value ? undefined : 'Required'
const isNumber = (value: string) => +value ? undefined : 'enter number'
const moneyEnough = (balance: number | undefined) => balance ?
    (value: string) => (value.length > 0 && +value && (+value <= balance)) ? undefined : 'not enough' :
    () => false

const CreateTransactionFormComponent: React.FC<InjectedFormProps<CreateTransactionFormValuesType> & MapStatePropsType> = ({
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

const connectedCreateTransactionFormComponent = connect(mapStateToProps)(CreateTransactionFormComponent);

const CreateTransactionForm = reduxForm<CreateTransactionFormValuesType>({
    form: 'createTransactionForm',
    initialValues: {
        recipientName: '',
        amount: ''
    },
})(connectedCreateTransactionFormComponent)

interface MapDispatchPropsType {
    createTransaction: (recipientName: string, amount: number) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, TransactionsTypes>): MapDispatchPropsType => ({
    createTransaction: (recipientName, amount) => dispatch(createTransaction(recipientName, amount)),
});

const CreateTransaction: React.FC<MapDispatchPropsType> = ({createTransaction}) => {
    const handleCreateTransaction = ({recipientName, amount}: CreateTransactionFormValuesType) => {
        createTransaction(recipientName, +amount)
    }
    return (
        <ButtonWithModal buttonIcon={<AddCircleSharpIcon fontSize="large" color="secondary" />}>
            <CreateTransactionForm onSubmit={handleCreateTransaction}/>
        </ButtonWithModal>

    )
}

export default connect(null, mapDispatchToProps)(CreateTransaction)