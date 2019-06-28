import {combineReducers} from 'redux';
import bankAccountsReducer from './bankAccountsReducer';
import userReducer from './userReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  bankAccountsReducer,
  userReducer,
  toastr: toastrReducer,
})