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

exports.saveData = async (url, conceptId, uniqueId, origin) => {
    var pendingPromises = [],
        counter = 0,
        isIndexUploaded = false;

    const response = await axios.get(url, {
        responseType: 'arraybuffer',
    }).catch((err) => console.log(err.response.data));

    const zip = new AdmZip(response.data);

     zip.getEntries().map(async (entry) => {
        pendingPromises.push(new Promise((resolve, reject) => {
            if (!entry.isDirectory) {
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
            }

            //gcp bucket
            bucket
                .file(`${conceptId}/${uniqueId}/${entry.entryName}`)
                .createWriteStream()
                .on("error", (err) => err)
                .on("finish", () => { 
                    counter++;
                    if(file.name.includes('index.html')){
                        isIndexUploaded = true;
                    }

                    if(isIndexUploaded && counter === zip.getEntries().length - 1){
                        resolve("OK")
                    }
                })
                .end(entry.getData());
        }));
    });

    Promise.all(pendingPromises)
        .then(imagePaths => console.log(imagePaths)) 
        .catch(() => console.log('well that didnt work...'))
};