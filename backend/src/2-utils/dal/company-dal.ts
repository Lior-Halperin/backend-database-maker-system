import {EntityTarget, InsertResult, ObjectLiteral } from "typeorm";
import dal from "./dal";

class CompanyDal{

    public async addCompanyDal<V>(entity: EntityTarget<ObjectLiteral>, OpValues: V): Promise<InsertResult> {
        try{

           // Insert user data into database
           const newUserDB = await dal.AppDataSource
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values([OpValues])
            .execute()
            
        return newUserDB
        }
        catch(err:any){
            throw (err)
        }

    };

    public async getCompanyByIdDal(entity: EntityTarget<ObjectLiteral>,idRequested:number|string): Promise<any> {
        
        const oneUser = await dal.AppDataSource
        .createQueryBuilder()
        .select("user")
        .from(entity, "user")
        .where("user.id = :id", { id: idRequested })
        .getOneOrFail() // If no result exists it will throw an EntityNotFoundError


    }
};

export const companyDal = new CompanyDal();
 
