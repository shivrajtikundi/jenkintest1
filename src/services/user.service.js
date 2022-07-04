import { helperService } from './helper.service';
import { apiUrl } from '../constants';

export const userService = {
  login,
  signup,
  findTokenUser,
  addUserInTeam,
  getAllMembersInTeam,
  updateRoleOfUser,
  delUserFromTeam,
  sendResetPassLink,
  resetPassword,
};

function resetPassword(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}user/resetPassword`, requestOptions).then(helperService.handleResponse);
}

function sendResetPassLink(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}user/sendResetPassLink`, requestOptions).then(helperService.handleResponse);
}

function delUserFromTeam(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}user/deleteUserFromTeam`, requestOptions).then(helperService.handleResponse);
}

function updateRoleOfUser(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}user/updateRoleOfUser`, requestOptions).then(helperService.handleResponse);
}

/*function login(data){
    new Promise((resolve, reject) =>{
        var requestOptions = {
            method: 'POST',
            headers:helperService.getHeaderData(),
            body:JSON.stringify(data)
        };
        return fetch(`${apiUrl}user/login`, requestOptions)
        .then(res=>{
            console.log(helperService.handleResponse)
            resolve(helperService.handleResponse);
        }).catch(err=>{
            reject(err)
        });
    }
)};*/

function login(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}user/login`, requestOptions).then(helperService.handleResponse);
}

function signup(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}user/signup`, requestOptions).then(helperService.handleResponse);
}

function findTokenUser() {
  const requestOptions = {
    method: 'GET',
    headers: helperService.getHeaderData(),
  };
  return fetch(`${apiUrl}user/findTokenUser`, requestOptions).then(helperService.handleResponse);
}

function addUserInTeam(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}user/addUser`, requestOptions).then(helperService.handleResponse);
}

function getAllMembersInTeam(data) {
  const requestOptions = {
    method: 'GET',
    headers: helperService.getHeaderData(),
  };
  return fetch(`${apiUrl}user/getAllMembersInTeam`, requestOptions).then(helperService.handleResponse);
}
