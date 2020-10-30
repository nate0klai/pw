import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import logo from "src/img/logo.svg";
import {Login, Personal, Register} from 'src/components';
import {RootState} from "../types";
import {connect} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& .MuiToolbar-root': {
                justifyContent: 'space-between'
            },
            '& .appbar-logo-wr': {
                width: 82
            },
            '& .appbar-logo': {
                maxHeight: '100%'
            }
        }
    }),
);

interface MapStatePropsType {
    isAuthorized: boolean
}

const mapStateToProps = (state: RootState) => ({
    isAuthorized: state.main.isAuthorized
})

const Header: React.FC<MapStatePropsType> = ({isAuthorized}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Box className="appbar-logo-wr">
                        <img src={logo} alt="" className="appbar-logo" />
                    </Box>
                    <Box>
                        {isAuthorized ? (
                            <Personal/>
                        ) : (
                            <>
                                <Login/>
                                <Register/>
                            </>
                        )}

                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default connect(mapStateToProps)(Header)