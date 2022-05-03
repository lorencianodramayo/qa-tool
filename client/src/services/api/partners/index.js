import api from "../../../utils/api";
import { getToken } from "../../../utils/sessions";

export const requestPartners = () => api.callGet('/adlib/getPartner', {
    params: {
        url: `https://api-app.ad-lib.io/api/v2/partners`,
        token: getToken()
    }
});