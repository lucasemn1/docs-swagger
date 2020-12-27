
import * as admin from 'firebase-admin';
let serviceAccount = require("../../firebase_admin_services_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;