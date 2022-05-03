const express = require("express");
const { getData } = require("../helpers/getData");
const { getToken } = require("../helpers/getToken");

const router = express.Router();

router.get("/authenticate", async (req, res) => {
    let result = await getToken();

    return res.json(result);
});

router.get("/getData", async (req, res) => {
    let result = await getData(req.query.url, req.query.token);
    return res.json(result);
});

router.get("/getPartner", async (req, res) => {
    let result = await getData(req.query.url, req.query.token);
    return res.json(result);
});

router.get("/getConcept", async (req, res) => {
    let result = await getData(req.query.url, req.query.token);
    return res.json(result);
});

router.get("/getTemplate", async (req, res) => {
    let result = await getData(req.query.url, req.query.token);
    let response = {
        templates: [],
        channels: []
    }

    if(Object.keys(result).length > 0){
        let templates = result.templates;
        //identify channels
        (result.display > 0 )? 
            response.channels.push('Display') : null;
        (result.social > 0 )? 
            response.channels.push('Social') : null;

        //get template version
        const updatedTemplates = await Promise.all(templates.map(async (data) => {
            let template = await getData(`https://api-app.ad-lib.io/api/v2/assets/templates/${data.generation}/versions?partnerId=${result.partnerId}`, req.query.token);

            data.templateVersions = template.versions;

            data.versionId = template.versions.filter(vendor => vendor.version === data.version).map(item => item.id)

            return data;
        }));

        response.templates = updatedTemplates;
    }

    return res.json(response);
});



module.exports = router;