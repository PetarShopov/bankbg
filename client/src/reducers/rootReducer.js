import {combineReducers} from 'redux';
import bankAccountsReducer from './bankAccountsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  bankAccountsReducer,
  userReducer
});

export default rootReducer;