import {combineReducers} from 'redux';
import bankAccounts from './bankAccountsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  bankAccounts,
  userReducer
});

export default rootReducer;