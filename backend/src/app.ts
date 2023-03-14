
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import config from './2-utils/config';
import { RouteNotFoundError } from './4-models/errors-model';
import catchAll from './3-middleware/catch-all';
import authController from './6-controllers/auth-controller';
import companyController from './6-controllers/company-controller'
import dal from './2-utils/dal/dal';
const expressServer = express();

//  Backend approval to browse AJAX to backend API
if (process.env.NODE_ENV === "development") expressServer.use(cors());


// Tell express to extract json object from request body into request.body variable:
expressServer.use(express.json());

expressServer.use("/api",authController);
expressServer.use("/api",companyController);

//Route not found
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    console.log("---Route not found---")

    const err = new RouteNotFoundError(request.method, request.originalUrl);
    next(err);
});

expressServer.use(catchAll);

expressServer.listen(config.serverPort, () => {
    try{
        console.log(`Listening on http://localhost:${config.serverPort}`);
        dal.connectToDB() // Connection to database and creating tables according to the entities
    }
    catch(err:any){
        console.log('Error connecting to database:', err);
                
    }

});


