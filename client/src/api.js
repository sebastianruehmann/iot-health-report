import axios from 'axios';
import config from './config';

export const niceErrorHandling = () => {
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error.response.data.message);
  });
}
export const fetchDeviceTypes = () => {
  return axios.get(config.api_url + '/types').then(userRequest => {
    return userRequest.data;
  });
}
export const fetchDeviceStatus = () => {
  return axios.get(config.api_url + '/status').then(userRequest => {
    return userRequest.data;
  });
}
export const fetchEvents = (params) => {
  return axios.get(config.api_url + '/events', {
    params
  }).then(userRequest => {
    return userRequest.data;
  });
}
export const fetchDevices = (params) => {
  return axios.get(config.api_url + '/devices', {
    params
  }).then(userRequest => {
    return userRequest.data;
  });
}
