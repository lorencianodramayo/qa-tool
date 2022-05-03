import api from "../../../utils/api";
import { getToken } from "../../../utils/sessions";

export const requestTemplates = (conceptId, partnerId) => api.callGet('/adlib/getTemplate', {
    params: {
        url: `https://api-app.ad-lib.io/api/v2/assets/concepts/${conceptId}?partnerId=${partnerId}`,
        token: getToken()
    }
});

