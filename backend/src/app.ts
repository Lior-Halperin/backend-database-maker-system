// import * as dotenv from 'dotenv' 
import config from './2-utils/config';



// console.log(process.env)

// const port = process.env.DB_HOST_DEV;
// const dbHost = process.env.DB_HOST;
// const dbPort = Number(process.env.DB_PORT);
// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;

console.log(`Server listening on port ${config.port}`);
// console.log(`Connecting to database at ${dbHost}:${dbPort}`);
// console.log(`Using database credentials: ${dbUser}/${dbPassword}`);

// process.env
// console.log(process.env)
console.log("Listening....")