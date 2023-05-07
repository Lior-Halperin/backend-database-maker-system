import { DataSource, DataSourceOptions } from "typeorm";
import config from "./config";
import { Company } from "../entities/company-entity";
import { User } from "../entities/user-entity";

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
  AppDataSource