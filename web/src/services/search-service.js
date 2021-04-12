import http from './base-api-service';

export const search2 = (keyword) => http.get('/search/', {params: {keyword}})
  
