import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {MainTypes, UserFullInfo} from "../store/main/types";
import {RootState} from "../types";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {logout} from "../store/main/actions";
import Cookies from 'js-cookie'

interface MapStatePropsType {
    me: UserFullInfo | null
}

interface MapDispatchPropsType {
    logout: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MainTypes>): MapDispatchPropsType => ({
    logout: () => dispatch(logout())
});

const mapStateToProps = (state: RootState) => ({
    me: state.main.me
})

type PersonalProps = MapStatePropsType & MapDispatchPropsType;

const Personal: React.FC<PersonalProps> | null = ({me, logout}) => {
    if (!me) return null;

    const onLogoutClick = () => {
        Cookies.remove('id_token');
        logout();
    }

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Typography>{me.name}</Typography>
            </Grid>
            <Grid item>
                <Typography>balance: {me.balance}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={onLogoutClick}>logout</Button>
            </Grid>
        </Grid>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Personal)