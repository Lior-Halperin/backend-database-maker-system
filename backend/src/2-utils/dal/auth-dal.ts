import {EntityTarget, ObjectLiteral } from "typeorm";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import authClient from "../configuration/firebase-client";
import { propertyForbiddenToAdd } from "../types/property-forbidden-auth-type";
import dal from "./dal";

class AuthDal{

    public async registerDal<V extends {email:string, password:string}>(entity: EntityTarget<ObjectLiteral>, OpValues: V): Promise<propertyForbiddenToAdd> {
        try{

           // Insert user data into database
           const newUserDB = await dal.AppDataSource
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values([OpValues])
            .execute()


            
            // Simulates the client-side registration process
            const userCredential = await createUserWithEmailAndPassword(authClient,OpValues.email, OpValues.password) 
            const idToken = await userCredential.user.getIdToken()
            const refreshToken =  (await userCredential.user.getIdTokenResult()).token
            
            const result: propertyForbiddenToAdd = {user:newUserDB,firebaseIdToken:idToken,firebaseRefreshToken:refreshToken}
            
        return result
        }
        catch(err:any){
            console.error(`Failed function: ${this.registerDal.name} - Path: ${__filename}\n${err.stack}`);
            throw(err)
        }

    }

    public async loginDal<V extends {email:string, password:string}>(entity: EntityTarget<ObjectLiteral>, credentials: V): Promise<propertyForbiddenToAdd> {


        try{

            // Get the user by email
             const newUserDB:any = await dal.AppDataSource
            .getRepository(entity) // It is used to retrieve a repository object that allows you to interact with a specific entity or collection of entities
            .createQueryBuilder("user")
            .where("user.email = :email", { email: credentials.email})
            .getOne()

        
            // Firebase
            // Simulates the client-side login process
            const userCredential = await signInWithEmailAndPassword(authClient,credentials.email, credentials.password) 
            const idToken = await userCredential.user.getIdToken()
            const refreshToken =  (await userCredential.user.getIdTokenResult()).token
   
            const result: propertyForbiddenToAdd = {user:newUserDB,firebaseIdToken:idToken,firebaseRefreshToken:refreshToken}

            return result

        }
        catch(err:any){
            console.error(`Failed function: ${this.loginDal.name} - Path: ${__filename}\n${err.stack}`);
            throw(err)
        }

    }

};

export const authDal = new AuthDal();
 
