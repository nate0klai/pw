import React, { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { RootState } from './types'
import { MainTypes } from './store/main/types'
import { getUserInfo as getUserInfoCreator } from './store/main/actions'
import Header from './containers/Header'
import Content from './containers/Content'
import './App.css'

interface MapDispatchPropsType {
    getUserInfo: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MainTypes>): MapDispatchPropsType => ({
    getUserInfo: () => dispatch(getUserInfoCreator())
})

const App: React.FC<MapDispatchPropsType> = ({ getUserInfo }) => {
    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="App">
            <Header />
            <Content />
        </div>
    )
}

export default connect(null, mapDispatchToProps)(App)
