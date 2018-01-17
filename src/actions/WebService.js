import axios from 'axios';
import configObj from '../config';

const ROOT_URL = configObj.apiUrl;
var ajax, axiosRequest, userToken, activeUser = null;

const axiosInit = () => {
    axiosRequest = {
        baseURL: ROOT_URL,
        timeout: 10000,
        headers: {'Content-Type': 'application/json'}
    };
    // userToken = localStorage.getItem('reactToken');
    // if (userToken){
    //     axiosRequest.headers.Authorization = `${userToken}`;
    // }
    ajax = axios.create(axiosRequest);
}

axiosInit();

function login(email, password, callback, callbackFail){
    const body = {
        email,
        password
    }
    console.log(body);
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
}

function getActiveUser(callback){
    // selectBook es un Action Creator. Necesita devolver una action. Un objeto con una propiedad type
    // Action: un objeto con un tipo y un payload
    var payload;
    if (activeUser){
        payload = activeUser;
        callback();
    }
    else{
        if (userToken){
            payload = validToken(callback);
        }
        else{
            payload = false;
            callback();
        }
    }

    return payload;

}
function logout(callback){
    ajax.post(`/logout`)
        .then((response) => {
            localStorage.removeItem('reactToken');
        activeUser = null;
        axiosInit();
        callback();
    });
}
function clearToken(){
    localStorage.removeItem('reactToken');
    activeUser = null;
    axiosInit();
}
function validToken(callback){
    return new Promise((resolve, reject) => {
        ajax.post(`/validToken`)
            .then((response)=>{
                if (response && response.data && response.data.data){
                    callback(response);
                    resolve(response.data.data)
                }
                else {
                    clearToken();
                    callback(response);
                    reject(response);
                }

            })
            .catch((response) => {
                clearToken();
                callback(response);
                reject(response);
            })
        })

}
function post(path, body, callback, callbackFail){
    return new Promise((resolve, reject) => {
        ajax.post(path, body)
            .then((response) => {
                callback(response);
                resolve(response);
            })
            .catch((response) => {
                callbackFail(response);
                reject(response);
            })
    })
}
function get(path,  callback){
    return new Promise((resolve, reject) => {
        ajax.get(path)
            .then((response) => {
                resolve(response);
                callback(response);
                
            })
            .catch((response) => {
                reject(response);
                callback(response);
                
            })
    })
}
function getCustom(path, callback){
    return new Promise((resolve, reject) => {
        axios.get(`https://qddz4hkl12.execute-api.us-east-1.amazonaws.com/dev/mails`)
        .then((response) => {
            resolve(response);
            callback(response);
            
        })
        .catch((response) => {
            reject(response);
            callback(response);
            
        })
        
    });
}
export default {
    login,
    logout,
    getActiveUser,
    post,
    getCustom,
    get

}
