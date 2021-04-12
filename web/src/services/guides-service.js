import http from './base-api-service';

const list = (search) => http.get('/guides', {params: {search}})

const detail = (id) =>  http.get(`/guides/${id}`)
  

const create = (guide) => {
    const data = new FormData()

    Object.keys(guide).forEach(key => {
        data.append(key, guide[key])
    })
    http.post(`/guides`, data)
}

const remove = (id) => http.delete(`/guides/${id}`)

 const update = (guide) => {


console.log(guide)
http.put(`/guides`, guide)
}   

const service = {
    create,
    update,
    remove,
    list,
    detail
  }
  
  export default service;
  



