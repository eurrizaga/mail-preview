import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducers from './login_reducers';
import ActiveUserReducers from './active_user_reducer';
import mailReducers from './mail_reducers';

const rootReducer = combineReducers({
  form: formReducer,
  login: LoginReducers,
  activeUser: ActiveUserReducers,
  mailList: mailReducers
});

export default rootReducer;