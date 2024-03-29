import dotenv from "dotenv";

dotenv.config();

type envOperatorType = "_DEV" | "_TEST" | "_PROD";



const EnvOperator = ():envOperatorType => {
    switch (process.env.NODE_ENV) {
      case "development":
        return "_DEV";
  
      case "testing":
        return "_TEST";
  
      case "production":
        return "_PROD";
  
      default:
        return "_DEV";
    }
  };

const DbConfig = (operator: envOperatorType) => {
  return {
    type: process.env[`DB_TYPE${operator}`],
    host: process.env[`DB_HOST${operator}`],
    port: process.env[`DB_PORT${operator}`],
    username: process.env[`DB_USER${operator}`],
    database: process.env[`DB_NAME${operator}`],
    password: process.env[`DB_PASSWORD${operator}`],
  }
};


const envOperator = EnvOperator()
const serverPort = process.env[`SERVER_PORT${envOperator}`]
const dbConfig = DbConfig(envOperator)

export default {
    dbConfig,
    serverPort
};

// type envOperator = "_DEV" | "_TEST" | "_PROD";

// const envConfig = (operator: envOperator) => {
//   return {
//     host: process.env[`DB_HOST${operator}`],
//     port: process.env[`DB_PORT${operator}`],
//     serverPort: process.env[`SERVER_PORT${operator}`],
//     username: process.env[`DB_USER${operator}`],
//     database: process.env[`DB_NAME${operator}`],
//     password: process.env[`DB_PASSWORD${operator}`],
//   }
// };

// const config = () => {
//   switch (process.env.NODE_ENV) {
//     case "development":
//       return envConfig("_DEV");

//     case "testing":
//       return envConfig("_TEST");

//     case "production":
//       return envConfig("_PROD");

//     default:
//       return envConfig("_DEV");
//   }
// };
// export default config();


