import React, {ReactElement, useState} from 'react';
import {Box, Button, IconButton} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

interface Props {
    buttonIcon?: ReactElement,
    buttonTitle?: string
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

const ButtonWithModal: React.FC<Props> = ({buttonIcon, buttonTitle = 'click me', children}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {buttonIcon ? (
                <IconButton aria-label="add" className="" onClick={handleOpen}>
                    {buttonIcon}
                </IconButton>
            ) : (
                <Button onClick={handleOpen}>{buttonTitle}</Button>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box className={classes.modal}>
                    {children}
                </Box>
            </Modal>
        </>
    )
}

export default ButtonWithModal;