import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }
});

//Provisional
export const setJWT = (jwt) => {
    axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}