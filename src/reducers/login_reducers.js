import { LOGIN_ACTION } from '../actions'; //no se especifica porque es index.js
//import _ from 'lodash';
export default function(state = {}, action){
    switch (action.type) {
        case LOGIN_ACTION:
            console.log(action);
            return state;
        case 'LOADER': return action.payload;
        default: return state;
    }
}