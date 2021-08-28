import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000'
})

http.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

http.interceptors.response.use((response) => {
    return response
}, (err) => {
    return Promise.reject(err)
})

export default http
