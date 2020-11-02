import React from 'react'
import { connect } from 'react-redux'
import { Box, Container } from '@material-ui/core'
import Transactions from 'src/components/Transactions'
import CreateTransaction from 'src/components/CreateTransaction'
import { RootState } from '../types'

interface MapStatePropsType {
    isAuthorized: boolean
}

const mapStateToProps = (state: RootState) => ({
    isAuthorized: state.main.isAuthorized
})

const Content: React.FC<MapStatePropsType> = ({ isAuthorized }) => {
    return (
        <Container>
            <Box py={6}>
                {isAuthorized ? (
                    <>
                        <Box display="flex" justifyContent="flex-end">
                            <CreateTransaction />
                        </Box>
                        <Transactions />
                    </>
                ) : (
                    <Box>
                        content for not authorized
                    </Box>
                )}

            </Box>
        </Container>
    )
}

export default connect(mapStateToProps)(Content)