import http from './base-api-service';

export const create = (message, userId, guideId, tourId) => http.post(`/message`, {message, userId, guideId, tourId})

export const list = () => http.get(`/messages`)



export const detail = () => http.get(`/onemessage`)


export const update = (message) => http.patch(`/messages/${message.id}/read`, message)

  
   
