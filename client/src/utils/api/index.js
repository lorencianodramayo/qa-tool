import axios from 'axios';
import { removeToken } from '../sessions';

const response = (request) => 
    request
        .then((res) => res)
        .catch((err) => {
            if(err.response.data.message.toLowerCase().includes('unauthenticated')) {
                removeToken();
            }

            return err.response.data;
        })

const callGet = (endPoint, params) => 
    response(axios.get(endPoint, params)); 

const callPost = (endPoint, params) => 
    response(axios.post(endPoint, params));

const api = {
    callGet,
    callPost
}

export default api;