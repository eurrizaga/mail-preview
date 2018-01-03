import axios from 'axios';

const ROOT_URL = 'https://3d8db345.ngrok.io';
var ajax, axiosRequest, userToken, activeUser = null;

const axiosInit = () => {
    axiosRequest = {
      baseURL: ROOT_URL,
      timeout: 10000,
      headers: {'Content-Type': 'application/json'}
    };
    userToken = localStorage.getItem('reactToken');
    if (userToken){
        axiosRequest.headers.Authorization = `${userToken}`;
    }
    ajax = axios.create(axiosRequest);
}

axiosInit();

export const LOGIN_ACTION = 'LOGIN_ACTION';

export function login(email, password, callback, callbackFail){
    const body = {
        email,
        password
    }
    ajax.post(`/login`, body)
        .then((response) => {
            activeUser = response.data.data;
            localStorage.setItem('reactToken', response.data.data.token);
            axiosInit();
            callback(response.data.data)
            
        })
        .catch((error) => {
            callbackFail(error);
        });
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
    var payload;
    if (activeUser){
        payload = activeUser;
    }
    else{
        if (userToken){
            payload = validToken(callback);
        }
        else{
            payload = false;
        }
    }

    return {
        type:'SELECTED_USER',
        payload
    };

}
export function logout(callback){
    ajax.post(`/logout`)
        .then((response) => {
            localStorage.removeItem('reactToken');
            activeUser = null;
            axiosInit();
            callback();
        });
    
    return {
        type:'SELECTED_USER',
        payload: null
    };
}
export function validToken(callback){
    return new Promise((resolve, reject) => {
        ajax.post(`/validToken`)
            .then((response)=>{
                console.log(response);
                if (response && response.data && response.data.data){
                    callback(response);
                    resolve(response.data.data)
                }
                else {
                    callback(response);
                    reject(response)
                }
                     
        });
    })
            
}
export function getMailList(callback){
    const body = {
        "subEntities": [{
            "entity": "mailroom_template_language"
        }]
    }
    return({
        type: 'MAIL_LIST',
        payload: new Promise((resolve, reject) => {
            ajax.post(`/getMailroomTemplate`, body)
                .then((response) => {
                    callback(response);
                    resolve(response);
                })
        })
    })
}
