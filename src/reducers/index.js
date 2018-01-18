import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducers from './login_reducers';
import ActiveUserReducers from './active_user_reducer';
import mailReducers from './mail_reducers';


function loaderReducer(state = null, action){
    switch (action.type){
        case 'LOADER': 
            if (action.payload){
                return action.payload;
            }
            return false;
        default:
            return state;
            
    }
}
const rootReducer = combineReducers({
  form: formReducer,
  login: LoginReducers,
  activeUser: ActiveUserReducers,
  mailList: mailReducers,
  loader: loaderReducer
});

export default rootReducer;