import Joi from "joi";

class CredentialsModel{

    public email: string;
    public password: string;


    public constructor(user: CredentialsModel){
        
        this.email = user.email;
        this.password = user.password;

    };

    // Model validation:

    private static postValidationCredentials = Joi.object({
        email: Joi.string().required().min(6).max(25)
        .pattern(new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
        password: Joi.string().required().min(4).max(15)
        .pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/)),

    });

    // Validate POST

    public validatePost(): string {
        const result = CredentialsModel.postValidationCredentials.validate(this);
        return result.error?.message;
    }


};

export default CredentialsModel;