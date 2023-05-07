import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral } from "typeorm";
import config from "../configuration/config";
import { Company } from "../entities/company-entity";
import { User } from "../entities/user-entity";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import authClient from "../firebase-client";
// import { propertyForbiddenToAdd } from "../types/property-forbidden-auth-type";


const dataSource = {
  type: config.dbConfig.type,
  host: config.dbConfig.host,
  port: config.dbConfig.port,
  username: config.dbConfig.username,
  password: config.dbConfig.password,
  database: config.dbConfig.database,
  synchronize: true,
  entities: [User, Company],
  logging: false,
  // connectTimeout: 1000,
};


const AppDataSource = new DataSource(dataSource as DataSourceOptions);

    const connectToDB =async ()=>{
        AppDataSource.initialize()
        .then(() => {
          console.log("Connected to database");
        })
        .catch((err:any) => {
            // console.error(`Failed function: ${connectToDB.name} - Path: ${__filename}\n${err.stack}`);
            throw (err)
        });
    };
 
export default {
    AppDataSource,
    connectToDB
}
