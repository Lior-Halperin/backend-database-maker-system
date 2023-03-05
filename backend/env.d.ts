export{}
 declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production" | "testing";
        // Development environment variables
        DB_HOST_DEV: string;
        DB_PORT_DEV: string;
        DB_NAME_DEV: string;
        DB_USER_DEV: string;
        DB_PASSWORD_DEV: string;
  
        // Production environment variables
        DB_HOST_PROD: string;
        DB_PORT_PROD: number;
        DB_NAME_PROD: string;
        DB_USER_PROD: string;
        DB_PASSWORD_PROD: string;
  
        // Testing environment variables
        DB_HOST_TEST: string;
        DB_PORT_TEST: string;
        DB_NAME_TEST: string;
        DB_USER_TEST: string;
        DB_PASSWORD_TEST: string;
      }
    }
  }