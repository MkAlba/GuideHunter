import axios from 'axios';

export const currentUserStoreKey = 'currentUser';

const http = axios.create({
  withCredentials: true, //esto hace que las cookies las puedas compartir entre dominios react le manda la cookie para que al servidor le sirva
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api'
})

http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // 401 from API means unauthorized! redirect to login page
    // es lo ?. es lo mismo que error && error.response && error.response.status = 401
    //si me llega de axios un 401 te dedirijo al login
  const status = error?.response?.status;
    switch (status) {
     
      case 401: 
          localStorage.removeItem(currentUserStoreKey);
          window.location.replace('/login')
          break;
      case 403:           
          window.location.replace('/403')
          break;
      case 404:           
          window.location.replace('/404')
          break;

      default :
          break

    }
    if (error?.response?.status === 401) {
      
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default http;
