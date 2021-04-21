import http from './base-api-service';

export const register = (user) => http.post('/register',  user )

export const login = (email, password) => http.post('/login', { email, password })

export const profile = () => http.get('/users/me')

export const logout = () => http.post('/logout')

export const list = () => http.get('/users')

export const detail = (id) => http.get(`/users/${id}`)

export const remove = (id) => http.delete(`/users/${id}`)

export const update = (user, id) => {
    const data = new FormData()
    Object.keys(user).forEach(key => {
        if (Array.isArray(user[key])) {
          user[key].forEach(value => data.append(`${key}[]`, value))
        } else data.append(key, user[key])
      })
    
      return http.patch(`/form-user/${id}`, data)
    }
    
    



  
   

  