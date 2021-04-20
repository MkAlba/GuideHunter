import http from './base-api-service';

const list = (search, languages) => http.get('/guides', { params: { search, languages } })

const detail = (id) => http.get(`/guides/${id}`)


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
 
    const data = new FormData()

    Object.keys(guide).forEach(key => {
        data.append(key, guide[key])
    })
    
    console.log(data)

    http.put(`/guides/${data.id}`, data)
}

const service = {
    create,
    update,
    remove,
    list,
    detail
}

export default service;




