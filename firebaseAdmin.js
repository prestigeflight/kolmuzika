// firebaseAdmin.js

import admin from 'firebase-admin';
import serviceAccount from './path/to/your-service-account-file.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

export default admin;
