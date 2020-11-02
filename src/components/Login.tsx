import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Box, Button, Grid } from '@material-ui/core'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import ButtonWithModal from 'src/components/ButtonWithModal'
import { RenderTextField, Modal } from 'src/components'
import { RootState } from '../types'
import { clearLoginError as clearLoginErrorCreator, login as loginCreator } from '../store/main/actions'
import { MainTypes } from '../store/main/types'

interface LoginFormValuesType {
    email: string,
    password: string
}

const loginFormValidate = (values: {email?: string, password?: string}) => {
    const errors = {} as {email?: string, password?: string}
    if (!values.email) errors.email = 'Required'
    if (!values.password) errors.password = 'Required'
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const LoginFormComponent: React.FC<InjectedFormProps<LoginFormValuesType>> = ({ handleSubmit, submitting }) => {

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Field name="email" component={RenderTextField} placeholder="email" />
                </Grid>
                <Grid item>
                    <Field name="password" component={RenderTextField} placeholder="password" />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="outlined" disabled={submitting}>login</Button>
                </Grid>
            </Grid>
        </form>
    )
}

const LoginForm = reduxForm<LoginFormValuesType>({
    form: 'loginForm',
    validate: loginFormValidate
})(LoginFormComponent)

interface MapStateType {
    error: string
}

interface MapDispatchType {
    login: (email: string, password: string) => void,
    clearLoginError: () => void
}

type LoginComponentProps = MapStateType & MapDispatchType

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MainTypes>): MapDispatchType => ({
    login: (email: string, password: string) => dispatch(loginCreator(email, password)),
    clearLoginError: () => dispatch(clearLoginErrorCreator())
})

const mapStateToProps = (state: RootState): MapStateType => ({
    error: state.main.loginError
})

const Login: React.FC<LoginComponentProps> = ({ login, error, clearLoginError }) => {

    const handleLogin = ({ email, password }: LoginFormValuesType) => login(email, password)

    return (
        <>
            <ButtonWithModal buttonTitle="login">
                <LoginForm onSubmit={handleLogin} />
            </ButtonWithModal>
            <Modal open={error.length > 0} handleClose={clearLoginError}>
                <Box>{error}</Box>
            </Modal>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)