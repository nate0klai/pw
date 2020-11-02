import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { MainReducer } from './main/reducer'
import { TransactionsReducer } from './transactions/reducer'

const rootReducer = combineReducers({
    form: formReducer,
    main: MainReducer,
    transactions: TransactionsReducer
})

export default rootReducer