import express, { NextFunction, Request, Response } from "express";
import verifyAccess from "../3-middleware/verify-access";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import CompanyModel from "../4-models/company-model";
import logic from "../5-logic/company-logic";


  const router = express.Router();

  // POST http://localhost:3002/api/company
router.post("/company",verifyLoggedIn,verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try{
        
        //  Create company object
        const company = new CompanyModel(request.body);

        // Add company
        const newCompany = await logic.addCompany(company);

        // Return new company 
        response.status(200).json(newCompany)
    }
    catch(err: any){
        next(err)
    }
});

// Export all routes from this controller. 
export default router;