import React, {useEffect} from 'react';
import './App.css';
import {Header} from './components';
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "./types";
import {MainTypes} from "./store/main/types";
import {getUserInfo} from "./store/main/actions";
import {connect} from "react-redux";
import Content from './containers/Content';

interface MapDispatchPropsType {
    getUserInfo: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MainTypes>): MapDispatchPropsType => ({
    getUserInfo: () => dispatch(getUserInfo())
});

const App: React.FC<MapDispatchPropsType> = ({getUserInfo}) => {

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
      <div className="App">
          <Header />
          <Content/>
      </div>
    );
}

export default connect(null, mapDispatchToProps)(App);
