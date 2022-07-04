import { helperService } from './helper.service';
import { apiUrl } from '../constants';

export const appService = {
  searchAppInAppStore,
  searchAppInPlayStore,
  addAppSource,
  getAllSourceUserWise,
  deleteSource,
  getAllSourceOfTeam,
  getInhouseReviewsOfAppFromPlayStore,
  getReviewSummaryOfAppFromPlayStore,
  updateAppSource,
};

function getReviewSummaryOfAppFromPlayStore(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}app/getReviewSummaryOfAppFromPlayStore`, requestOptions).then(helperService.handleResponse);
}

function getInhouseReviewsOfAppFromPlayStore(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}app/getInhouseReviewsOfAppFromPlayStore`, requestOptions).then(helperService.handleResponse);
}

function getAllSourceOfTeam() {
  const requestOptions = {
    method: 'GET',
    headers: helperService.getHeaderData(),
  };
  return fetch(`${apiUrl}app/getAllSourceOfTeam`, requestOptions).then(helperService.handleResponse);
}

function getAllSourceUserWise() {
  const requestOptions = {
    method: 'GET',
    headers: helperService.getHeaderData(),
  };
  return fetch(`${apiUrl}app/getAllSourceUserWise`, requestOptions).then(helperService.handleResponse);
}

function searchAppInAppStore(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}app/searchAppInAppStore`, requestOptions).then(helperService.handleResponse);
}

function searchAppInPlayStore(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}app/searchAppInPlayStore`, requestOptions).then(helperService.handleResponse);
}

function addAppSource(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}app/addAppSource`, requestOptions).then(helperService.handleResponse);
}

function deleteSource(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}app/deleteSource`, requestOptions).then(helperService.handleResponse);
}

function updateAppSource(data) {
  const requestOptions = {
    method: 'POST',
    headers: helperService.getHeaderData(),
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}app/updateAppSource`, requestOptions).then(helperService.handleResponse);
}
