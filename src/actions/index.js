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
    const payload = webservice.get('/mails', callback);

    return({
        type: 'MAIL_LIST',
        payload
    })
}
export function getMailList2(callback){
    const payload = webservice.getCustom('https://qddz4hkl12.execute-api.us-east-1.amazonaws.com/dev/mails', callback);
    return({
        type: 'MAIL_LIST',
        payload
    })   
}
export function updateMailList(mailList){
    return({
        type: 'MAIL_LIST',
        payload: mailList
    })
}
export function saveMail(body, callback, callbackFail){
    const payload = webservice.post('/mails', body, callback, callbackFail);
    return({
        type: 'UPDATE_MAIL',
        payload
    })
}
export function setLoader(payload){
    return ({
        type:'LOADER',
        payload
    })
}
