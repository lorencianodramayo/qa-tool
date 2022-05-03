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
exports.bucket = () => storage.bucket(process.env.GCS_BUCKET);