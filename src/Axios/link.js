import axios from 'axios'

const url = "https://yukngaji-api.herokuapp.com";
let token = sessionStorage.getItem('token')

export const link = axios.create({
    baseURL: url,
    headers: {
        'x-access-token': token
    }
})
