import * as firebaseAdmin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseAdminConfig),
})



export default firebaseAdmin;