import http from './base-api-service';

const list = (search, languages) => http.get('/guides', { params: { search, languages } })

const detail = (id) => http.get(`/guides/${id}`)


const create = (guide) => {
    console.log(guide)

    const data = new FormData()

    Object.keys(guide).forEach(key => {

        if (typeof (guide[key]) === Array) {

            guide[key].forEach(value => {

                data.append(`${key}[]`, value)

            })
        } else if (key === 'images') {

            Array.from(guide[key]).forEach(value => {

                data.append(`${key}`, value)

            })

        } else {
            data.append(key, guide[key])
        }
    })
    http.post(`/guides`, data)
}



const remove = (id) => http.delete(`/guides/${id}`)



const update = (guide) => {


    const data = new FormData()

    Object.keys(guide).forEach(key => {


        if (typeof (guide[key]) === Array) {

            guide[key].forEach(value => {

                data.append(`${key}[]`, value)

            })
        } else if (key === 'images') {

            Array.from(guide[key]).forEach(value => {

                console.log(value)

                data.append(`${key}`, value)

            })

        } else {
            data.append(key, guide[key])
        }
    })


    return http.put(`/guides/${guide.id}`, data)
}

const service = {
    create,
    update,
    remove,
    list,
    detail
}

export default service;




