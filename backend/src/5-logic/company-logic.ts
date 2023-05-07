import { InsertResult } from "typeorm";
import { companyDal } from "../2-utils/dal/company-dal";
import { Company } from "../2-utils/entities/company-entity";
import CompanyModel from "../4-models/company-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";

// Add company
async function addCompany(company: CompanyModel): Promise<CompanyModel> {
 
    try {
    // Validate input data using JOI
    const errors = company.validatePostCompany();

    if (errors) {
      throw new ValidationError(errors);
    }

    // Insert company data into database using TypeORM query builder. 
    const result: InsertResult = await companyDal.addCompanyDal(Company,company)


    company.id = result.raw.insertId

    console.log(addCompany.name, company)

    return company

  } 
  catch (err: any) {
    throw err;
  }
}

// Get one company by id:
async function getCompanyById(id:number): Promise<CompanyModel>{

    
//   const result: InsertResult = await companyDal 

//   if(!result){
//     throw new ResourceNotFoundError(id)
//   }
    return
}

// Get all company:
async function getAllCompany(): Promise<CompanyModel[]>{

    

      return
  }

export default {
    addCompany
}
