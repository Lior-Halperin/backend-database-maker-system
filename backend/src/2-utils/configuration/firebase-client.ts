
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseClientConfig = {
    apiKey: process.env.FIREBASE_CLIENT_API_KEY,
    authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_CLIENT_PROJECT_ID,
    storageBucket: process.env.FIREBASE_CLIENT_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_CLIENT_MASSAGING_SENDER_ID,
    appId: process.env.FIREBASE_CLIENT_APP_ID,
    
  };

const app = initializeApp(firebaseClientConfig);

const authClient = getAuth(app)

export default authClient