import React from "react"
import {Box, Container} from "@material-ui/core"
import {Transactions, CreateTransaction} from "../components"
import {connect} from "react-redux"
import {RootState} from "../types";
import {ThunkDispatch} from "redux-thunk";
import {TransactionsTypes} from "../store/transactions/types";

interface MapStatePropsType {
    isAuthorized: boolean
}
interface MapDispatchPropsType {

}

const mapStateToProps = (state: RootState) => ({
    isAuthorized: state.main.isAuthorized
})

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, TransactionsTypes>): MapDispatchPropsType => ({

});

const Content: React.FC<MapStatePropsType & MapDispatchPropsType> = ({isAuthorized}) => {
    return (
        <Container>
            <Box py={6}>
                {isAuthorized ? (
                    <>
                        <Box display="flex" justifyContent="flex-end">
                            <CreateTransaction/>
                        </Box>
                        <Transactions/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Content)