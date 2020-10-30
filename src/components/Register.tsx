import React from 'react';
import {Box, Button, Grid} from "@material-ui/core";
import { connect } from 'react-redux';
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '../types'
import {clearRegisterError, register} from '../store/main/actions'
import {MainTypes} from "../store/main/types";
import {RenderTextField} from "./RenderTextField";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {ButtonWithModal, Modal} from "./index";

interface RegisterFormValuesType {
    username: string
    email: string
    password: string
}

const registerFormValidate = ({username, email, password, confirmPassword}: {username?: string, email?: string, password?: string, confirmPassword?: string}) => {
    const errors = {} as {username?: string, email?: string, password?: string, confirmPassword?: string}
    if (!username) errors.username = 'Required'
    if (username && /[\W\s0-9]/g.test(username)) errors.username = 'Human names includes only letters' // check human name
    if (!email) errors.email = 'Required'
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) { // check email format
        errors.email = 'Invalid email address'
    }
    if (!password) errors.password = 'Required'
    if (password && password !== confirmPassword) errors.confirmPassword = 'Confirm password correctly' // check passwords are equals
    return errors
}

const RegisterFormComponent: React.FC<InjectedFormProps<RegisterFormValuesType>> = ({ handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Field name="username" component={RenderTextField} placeholder="username" />
                </Grid>
                <Grid item>
                    <Field name="email" component={RenderTextField} placeholder="email" />
                </Grid>
                <Grid item>
                    <Field name="password" component={RenderTextField} placeholder="password" />
                </Grid>
                <Grid item>
                    <Field name="confirmPassword" component={RenderTextField} placeholder="confirm password" />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="outlined" disabled={submitting}>register</Button>
                </Grid>
            </Grid>
        </form>
    )
}

const RegisterForm = reduxForm<RegisterFormValuesType>({
    form: 'registerForm',
    validate: registerFormValidate
})(RegisterFormComponent)

interface MapStateType {
    error: string
}

interface MapDispatchType {
    register: (username: string, email: string, password: string) => void,
    clearRegisterError: () => void
}

type RegisterComponentProps = MapStateType & MapDispatchType;

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MainTypes>): MapDispatchType => ({
    register: (username: string, email: string, password: string) => dispatch(register(username, email, password)),
    clearRegisterError: () => dispatch(clearRegisterError())
});

const mapStateToProps = (state: RootState): MapStateType => ({
    error: state.main.registerError
})

const Register: React.FC<RegisterComponentProps> = ({register, error, clearRegisterError}) => {
    const handleRegister = ({username, email, password}: RegisterFormValuesType) => {
        register(username, email, password)
    }

    return (
        <>
            <ButtonWithModal buttonTitle="register">
                <RegisterForm onSubmit={handleRegister}/>
            </ButtonWithModal>
            <Modal open={error.length > 0} handleClose={clearRegisterError}>
                <Box>{error}</Box>
            </Modal>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);