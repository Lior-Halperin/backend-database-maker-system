export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "testing";
      // Development environment variables
      DB_TYPE_DEV: string;
      DB_HOST_DEV: string;
      DB_PORT_DEV: number;
      DB_NAME_DEV: string;
      DB_USER_DEV: string;
      DB_PASSWORD_DEV: string;
      SERVER_PORT_DEV: number;

      // Production environment variables
      DB_TYPE_PROD: string;
      DB_HOST_PROD: string;
      DB_PORT_PROD: number;
      DB_NAME_PROD: string;
      DB_USER_PROD: string;
      DB_PASSWORD_PROD: string;
      SERVER_PORT_PROD: number;


      // Testing environment variables
      DB_TYPE_TEST: string;
      DB_HOST_TEST: string;
      DB_PORT_TEST: string;
      DB_NAME_TEST: string;
      DB_USER_TEST: string;
      DB_PASSWORD_TEST: string;
      SERVER_PORT_TEST: number;


      // Firebase service account key
      FIREBASE_PROJECT_ID: string;
      FIREBASE_CLIENT_EMAIL: string;
      FIREBASE_PRIVATE_KEY: string;

      // Firebase client config
      FIREBASE_CLIENT_API_KEY: string;
      FIREBASE_CLIENT_AUTH_DOMAIN: string; 
      FIREBASE_CLIENT_PROJECT_ID: string; 
      FIREBASE_CLIENT_STORAGE_BUCKET: string; 
      FIREBASE_CLIENT_MASSAGING_SENDER_ID: string; 
      FIREBASE_CLIENT_APP_ID: string;

      // Cyber
      HASH_SALT: string
      HASH_ALGORITHM:string
      JWT_SECRET_KEY: string
      
    }
  }
}
