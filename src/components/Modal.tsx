import React from 'react';
import {Box, Modal as MUIModal} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

interface Props {
    open: boolean,
    handleClose?: () => void,
}

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

const Modal: React.FC<Props> = ({open, handleClose, children}) => {
    const classes = useStyles();

    return (
        <MUIModal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className={classes.modal}>
                {children}
            </Box>
        </MUIModal>
    )
}

export default Modal;