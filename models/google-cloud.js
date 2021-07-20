const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage();
const getFileName = (name) => name.split('/')[name.split('/').length - 1];

const googleStorage = {
  getBuckets: async function getBuckets() {
    let buckets = [];
    try {
      buckets = await storage.get();
    } catch (e) {}
    return buckets;
  },
  getFiles: async function getFiles(bucketName, fileName) {
    const getDestination = (name) =>
      path.join(__dirname, `../tmp/asset-${name}`);
    let files = [];
    try {
      const fromFolder = await storage
        .bucket(bucketName)
        .getFiles({ directory: fileName });
      const names = fromFolder[0];
      const promises = names.filter(el => (el.metadata.size && Number(el.metadata.size))).map((el) => {
        const destination = getDestination(el.name.split("/").join("-"));
        files.push(destination);
        return el.download({
          destination,
        });
      });
      await Promise.all(promises);
    } catch (e) {
      console.log("==> ", e);
    }
    return files.map(el => ({
      path: el, name: getFileName(el)
    }));
  },
  getFile: async function getFile(bucketName, fileName) {
    const destination = path.join(__dirname, `../tmp/asset-${fileName}`);
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination,
    };
    await storage.bucket(bucketName).file(fileName).download(options);
    return destination;
  },
};

module.exports = googleStorage;
