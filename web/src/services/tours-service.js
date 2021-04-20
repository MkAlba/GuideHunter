import http from './base-api-service';

export const list = () => http.get('/tours')

export const detail = (id) => http.get(`/tours/${id}`)

export const create = (tour) => {
    
    const data = new FormData() //to accept images must change format

    Object.keys(tour).forEach(key => {
        data.append(key, tour[key])
    })
    
    
    
    http.post('/tours', data)}

export const remove = (id) => http.delete(`/tours/${id}`)
    .then(response => Promise.resolve())

export const update = (guide) => http.put(`/tours`, guide)

    
 

   
  

  
  
  