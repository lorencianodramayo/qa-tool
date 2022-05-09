const AdmZip = require('adm-zip');
const axios = require('axios');

//settings
const { Storage } = require('@google-cloud/storage');

require("dotenv").config();

//bucket settings
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY,
    },
});
//get bucket config
const bucket = storage.bucket(process.env.GCS_BUCKET);

exports.saveTemplate = async (template, conceptId, uniqueId, origin) => {
    var pendingPromises = [],
        counter = 0,
        isIndexUploaded = false;

    const response = await axios.get(template.url, {
        responseType: 'arraybuffer',
    }).catch((err) => err.response);

    const zip = new AdmZip(response.data);

    for (let entry of zip.getEntries()) {
        pendingPromises.push(new Promise((resolve, reject) => {
            if (entry.name === 'index.html') {
                //injecting library.js
                entry.setData(Buffer.from(
                    entry
                        .getData()
                        .toString("utf8")
                        .split("</html>")
                        .join(`<script src="${origin}lib.js"></script></html>`)
                    , "utf8"));
            }

            //gcp bucket
            bucket
                .file(`${conceptId}/${uniqueId}/${entry.entryName}`)
                .createWriteStream()
                .on("error", (err) => reject(err))
                .on("finish", () => {
                    resolve(entry.entryName)
                })
                .end(entry.getData());
        }));
    }
    
    const final = Promise.all(pendingPromises)
        .then(names => names.length === zip.getEntries().length ? true : false)
        .catch((err) => err);

    return final;
};