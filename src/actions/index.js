import webservice from './WebService';

export const LOGIN_ACTION = 'LOGIN_ACTION';

export function login(email, password, callback, callbackFail){
    webservice.login(email, password, callback, callbackFail);
    return {
        type: LOGIN_ACTION,
        payload: null
    }
    
}

export function setActiveUser(payload){
    return {
        type:'SELECTED_USER',
        payload
    };
}
export function getActiveUser(callback){
    // selectBook es un Action Creator. Necesita devolver una action. Un objeto con una propiedad type
    // Action: un objeto con un tipo y un payload
    return {
        type:'SELECTED_USER',
        payload:webservice.getActiveUser(callback)
    };

}
export function logout(callback){
    webservice.logout(callback);
    return {
        type:'SELECTED_USER',
        payload: null
    };
}

export function getMailList(callback){
    const body = {
        "subEntities": [{
            "entity": "mailroom_template_language"
        }]
    }
    const payload = webservice.post('/getMailroomTemplate', body, callback);

    return({
        type: 'MAIL_LIST',
        payload
    })
}
