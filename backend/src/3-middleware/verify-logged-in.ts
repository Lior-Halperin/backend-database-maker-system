import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/configuration/cyber";
import firebaseAdmin from "../2-utils/configuration/firebase-admin";
import authClient from "../2-utils/configuration/firebase-client";
import UserModel from "../4-models/user-model";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {
    try{
            // Checks if the token has expired:
            const ServerToken: boolean = await cyber.verifyServerToken(request)

            // If the token has not expired, the user's object is extracted, and if necessary, the firebase token is refreshed
            if(ServerToken){
                const getUser:UserModel = await cyber.getUserDetailsFromToken(request) 

               await firebaseAdmin.auth().verifyIdToken(getUser.firebaseIdToken)
              // Inserts the decrypted object of the user into the request (used to verify access)
               .then(()=> request.body = getUser )
               // Refresh the current user's ID token using their refresh token
               .catch( async ()=>{
               await authClient.currentUser.getIdToken(true) //  true =  force the refresh of the token.
                .then((newIdToken)=>{
                    // Replaces the expired idToken with the new idToken in the user object: 
                    getUser.firebaseIdToken = newIdToken
                    // Generate new token for all user object:
                    const newServerToken = cyber.getNewToken(getUser)
                    // Updates the response:
                    response.header.prototype.Authorization = newServerToken
                    request.body = getUser 
                })
              
               }

                )

            }
            
        next();
    }
    catch(err:any){
        next(err);
    }
};



export default verifyLoggedIn;