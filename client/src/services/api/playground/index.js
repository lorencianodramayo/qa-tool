import api from "../../../utils/api";

export const savePlayground = (data) => api.callPost('/graham/saveData', {
    params: data
});

export const getPlayground = (data) => api.callGet('/graham/getData', {
    params: data
})