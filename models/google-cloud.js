const {
    Storage
} = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    keyFilename: path.join(__dirname, '../credentials/hyperiot-storage-credentials.json'),
    projectId: 'hyperiot-storage'
})

const googleStorage = {
    deleteBucket: async (bucketId) => {
        try {
            const deletedBucket = await storage.bucket(bucketId).delete();
            return deleteBucket;
        }catch(e) {
            return false;
        }
    },
    createBucket: async function createBucket(bucket) {
        try {
            const bucketCreated = await storage.createBucket(bucket)
            return bucketCreated;
        }
        catch(e) {
            return false;
        }
        
    },

    getBuckets: async function getBuckets() {
        const buckets = await storage.getBuckets();
        return buckets;
    },

    uploadFile: async function uploadFile(bucketName, filename) {
        // Uploads a local file to the bucket
        const fileUploaded = await storage.bucket(bucketName).upload(filename, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        });

        return fileUploaded;
    },

    getFiles: async function getFiles(bucketName) {
        const files = await storage.bucket(bucketName).getFiles();
        return files;
    },
    getFile: async function getFile(bucketName, fileName) {
        const destination = path.join(__dirname, `../tmp/asset-${fileName}`);
        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt"
            destination
        };
        await storage
            .bucket(bucketName)
            .file(fileName)
            .download(options);
        return destination;
    }
}

module.exports = googleStorage;
