import {EntityTarget, ObjectLiteral } from "typeorm";
import dal from "./dal";

class CompanyDal{

    public async addCompanyDal<V>(entity: EntityTarget<ObjectLiteral>, OpValues: V): Promise<any> {
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

    }

};

export const companyDal = new CompanyDal();
 
