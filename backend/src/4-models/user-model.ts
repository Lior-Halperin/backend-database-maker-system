import Joi from "joi";
import Role from "./Role-model";

class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: Role;
    public permissionCode: string;
    public firebaseIdToken: string;
    public firebaseRefreshToken:string;

     
    // Copy - Constructor
    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.permissionCode = user.permissionCode;
        this.firebaseIdToken = user.firebaseIdToken
        this.firebaseRefreshToken = user.firebaseRefreshToken 
    }

    // Model validation:

    // POST register Validation Schema:
    private static postRegisterValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(25),
        email: Joi.string().required().min(6).max(25)
        .pattern(new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
        password: Joi.string().required().min(4).max(15)
        .pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/)),
        role: Joi.valid(`${Role.Admin}` , `${Role.User}` ).optional(),
        permissionCode: Joi.string().optional(),
        firebaseIdToken: Joi.forbidden(),
        firebaseRefreshToken: Joi.forbidden(), 
    });

    
    // Validate POST register:
    public validatePostRegister() : string {
        const result = UserModel.postRegisterValidationSchema.validate(this,{abortEarly:false});
        return result.error?.message;
    };

};



export default UserModel;