import dotenv from 'dotenv';

dotenv.config();

class DevelopmentConfig  {
  public port = process.env.DB_PORT_DEV;
}

class TestingConfig  {
  public port = process.env.DB_PORT_TEST;
}

class ProductionConfig  {
  public port = process.env.DB_PORT_PROD;
}
const config = () => {
  switch (process.env.NODE_ENV) {
    case "development":
    return  new DevelopmentConfig();
   
    case "testing":
        return   new TestingConfig();
     
    case "production":
        return  new ProductionConfig();
     
    default:
        return  new DevelopmentConfig();
  }
};
export default config();


// console.log(`Server listening on port ${port}`);
// console.log(`Connecting to database at ${dbHost}:${dbPort}`);
// console.log(`Using database credentials: ${dbUser}/${dbPassword}`);
