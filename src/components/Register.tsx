import React, {useState} from 'react';
import {Box, Button, Grid} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { connect } from 'react-redux';
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '../types'
import {register} from '../store/main/actions'
import {MainTypes} from "../store/main/types";
import {RenderTextField} from "./RenderTextField";
import {Field, reduxForm, InjectedFormProps} from "redux-form";

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

}

interface MapDispatchType {
    register: (username: string, email: string, password: string) => void
}

type RegisterComponentProps = MapStateType & MapDispatchType;

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MainTypes>): MapDispatchType => ({
    register: (username: string, email: string, password: string) => dispatch(register(username, email, password))
});

const mapStateToProps = (state: RootState): MapStateType => ({

})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }),
);

const Login: React.FC<RegisterComponentProps> = ({register}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegister = ({username, email, password}: RegisterFormValuesType) => {
        register(username, email, password)
    }

    return (
        <>
            <Button onClick={handleOpen}>register</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box className={classes.modal}>
                    <RegisterForm onSubmit={handleRegister}/>
                </Box>
            </Modal>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);