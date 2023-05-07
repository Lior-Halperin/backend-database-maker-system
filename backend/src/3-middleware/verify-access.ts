import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/configuration/cyber";
import { ForbiddenError} from "../4-models/errors-model";
import Role from "../4-models/Role-model";
import UserModel from "../4-models/user-model";


async function verifyAccess(request: Request, response: Response, next: NextFunction) {

    try{
        // Extracts the user object from the token:
        const getUser:UserModel = await cyber.getUserDetailsFromToken(request)

        // Encrypts the admin role from the user object:
        const AdminHashRole = cyber.hashRole(Role.Admin)

        // Compares with permission code to check if there is permission:
        if(AdminHashRole !== getUser.permissionCode){
            throw new ForbiddenError("You do not have permission")
        }
        
        next();
    }
    catch(err: any){
        next(err);
    }
    
};



export default verifyAccess;