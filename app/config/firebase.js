const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const appName = 'second';

if (!admin.apps.find((app) => app.name === appName)) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  }, appName);
}

module.exports = admin;