
const {google} = require('googleapis');
const ENV = require('./env');

const oauth2Client = new google.auth.OAuth2(
  ENV.CLOUD.clientId,
  ENV.CLOUD.clientSecret,
  ENV.CLOUD.redirectUri
);
const scope = [
    'https://www.googleapis.com/auth/cloud-platform',
];

const url = oauth2Client.generateAuthUrl({
    scope
});

console.log(url)
