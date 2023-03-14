import Joi from "joi";

class CompanyModel {

    public id: number;
    public name: string;
    public owner: number;


    // Copy - Constructor
    public constructor(user: CompanyModel) {
        this.id = user.id;
        this.name = user.name;
        this.owner = user.owner;
    }

    // Model validation:

    // POST company Validation Schema:
    private static postCompanyValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        name: Joi.string().required().min(2).max(25),
        owner: Joi.number().required().integer(),
    });

    

    // Validate POST company:
    public validatePostCompany() : string {
        const result = CompanyModel.postCompanyValidationSchema.validate(this,{abortEarly:false});
        return result.error?.message;
    };

};



export default CompanyModel;