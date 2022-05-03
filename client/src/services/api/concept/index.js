import api from "../../../utils/api";
import { getToken } from "../../../utils/sessions";

export const requestConcept = (partnerId) => api.callGet('/adlib/getConcept', {
    params: {
        url: `https://api-app.ad-lib.io/api/v2/assets/concepts?partnerId=${partnerId}`,
        token: getToken()
    }
});