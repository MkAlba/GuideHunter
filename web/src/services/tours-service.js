import http from './base-api-service';

export const list = () => http.get('/tours')

export const detail = (id) => http.get(`/tours/${id}`)

export const create = (guide) => http.post('/tours', guide)

export const remove = (id) => http.delete(`/tours/${id}`)
    .then(response => Promise.resolve())

export const update = (guide) => http.put(`/tours`, guide)

    
 

   
  

  
  
  