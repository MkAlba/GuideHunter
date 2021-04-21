import http from './base-api-service';

export const list = () => http.get('/tours')

export const detail = (id) => http.get(`/tours/${id}`)

export const create = (tour) => {

console.log(tour)
const data = new FormData()
    Object.keys(tour).forEach(key => {

        

        if (typeof (tour[key]) === Array) {

            tour[key].forEach(value => {

                data.append(`${key}[]`, value)

            })
        } else if (key === 'images') {

            Array.from(tour[key]).forEach(value => {

                data.append(`${key}`, value)

            })

        } else {
            data.append(key, tour[key])
        }
    })

    http.post('/tours', data)
}



export const remove = (id) => http.delete(`/tours/${id}`)
    .then(response => Promise.resolve())

    

export const update = (tour) => {
    const data = new FormData()

    Object.keys(tour).forEach(key => {

        

        if (typeof (tour[key]) === Array) {

            tour[key].forEach(value => {

                data.append(`${key}[]`, value)

            })
        } else if (key === 'images') {

            Array.from(tour[key]).forEach(value => {

                data.append(`${key}`, value)

            })

        } else {
            data.append(key, tour[key])
        }
    })

    return http.put(`/tours`, data)
}









