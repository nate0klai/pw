import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import Cookies from 'js-cookie'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import ButtonWithModal from 'src/components/ButtonWithModal'
import { MainTypes, UserFullInfo } from '../store/main/types'
import { RootState } from '../types'
import { logout as logoutCreator } from '../store/main/actions'

interface MapStatePropsType {
    me: UserFullInfo | null
}

interface MapDispatchPropsType {
    logout: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MainTypes>): MapDispatchPropsType => ({
    logout: () => dispatch(logoutCreator())
})

const mapStateToProps = (state: RootState) => ({
    me: state.main.me
})

type PersonalProps = MapStatePropsType & MapDispatchPropsType

const Personal: React.FC<PersonalProps> | null = ({ me, logout }) => {
    if (!me) return null

    const onLogoutClick = () => {
        Cookies.remove('id_token')
        logout()
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
                <ButtonWithModal buttonTitle="logout">
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box>are you sure?</Box>
                        <Button onClick={onLogoutClick}>logout</Button>
                    </Box>
                </ButtonWithModal>
            </Grid>
        </Grid>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Personal)