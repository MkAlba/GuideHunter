import http from './base-api-service';

export const create = (message, userId, guideId) => http.post(`/message`, {message, userId, guideId})

export const list = () => http.get(`/messages`)


export const detail = () => http.get(`/onemessage`)


export const update = (message) => http.put(`/messages/${message.id}/read`, message)

  
   
