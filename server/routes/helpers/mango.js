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
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
        });

        const zip = new AdmZip(response.data);

        const validate = await Promise.all(zip.getEntries().map(async (entry) => {
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

                //gcp bucket
                // const saveFile = 
                //     await bucket
                //         .file(`${conceptId}/${uniqueId}/${entry.entryName}`)
                //         .createWriteStream()
                //         .on("error", (err) => err)
                //         .on("finish", () => { })
                //         .end(await entry.getData());

                //return saveFile;
                uploadFile(
                  `${conceptId}/${uniqueId}/${entry.entryName}`, entry.getData()
                ).catch(console.error);
            }
        }));

        return validate;
    } catch (err) {
        return err;
    }
};

async function uploadFile(filePath, data) {
  await bucket
          .file(filePath)
          .createWriteStream()
          .on("error", (err) => err)
          .on("finish", () => {
            console.log(`done: ${filePath}`);
           })
          .end(data);
}