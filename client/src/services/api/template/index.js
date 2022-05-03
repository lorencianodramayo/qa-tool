import api from "../../../utils/api";
import { getToken } from "../../../utils/sessions";

export const requestTemplateVersion = (templateId, partnerId) => api.callGet('/adlib/getData', {
    params: {
        url: `https://api-app.ad-lib.io/api/v2/assets/templates/${templateId}?partnerId=${partnerId}`,
        token: getToken()
    }
});