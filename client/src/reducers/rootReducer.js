import {combineReducers} from 'redux';
import bankAccountsReducer from './bankAccountsReducer';
import userReducer from './userReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
  bankAccountsReducer,
  userReducer,
  toastr: toastrReducer
});

export default rootReducer;