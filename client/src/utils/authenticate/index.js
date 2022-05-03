import axios from "axios";
import { setToken } from "../sessions";


const getToken = async () =>  {
    const response = await axios.get('/adlib/authenticate');

    setToken(response.data.token)
}
    

export {
    getToken
}