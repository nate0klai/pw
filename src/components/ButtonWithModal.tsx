import React, { ReactElement, useState } from 'react'
import { Button, IconButton } from '@material-ui/core'
import { Modal } from './index'

interface Props {
    buttonIcon?: ReactElement,
    buttonTitle?: string
}

const ButtonWithModal: React.FC<Props> = (
    {
        buttonIcon,
        buttonTitle = 'click me',
        children
    }
) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

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
                handleClose={handleClose}
            >
                {children}
            </Modal>
        </>
    )
}

export default ButtonWithModal