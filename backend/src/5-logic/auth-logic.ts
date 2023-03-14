
import cyber from "../2-utils/cyber";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../4-models/errors-model";
import UserModel from "../4-models/user-model";
import { User } from "../2-utils/entities/user-entity";
import dal from "../2-utils/dal/dal";
import { propertyForbiddenToAdd } from "../2-utils/types/property-forbidden-auth-type";
import { authDal } from "../2-utils/dal/auth-dal";
// import authDal from "../2-utils/dal/auth-dal";



// Register
async function register(user: UserModel): Promise<string> {

     // Validate input data using JOI
    const error = user.validatePostRegister();

    if (error) {
        throw new UnauthorizedError(error)
    };

    // Insert user data into database using TypeORM query builder, and Firebase Authentication. 
   const result:propertyForbiddenToAdd = await authDal.registerDal(User,user)

    // Delete password before returning user:
    delete user.password

    // Include the parameters received from the dal:
    user.firebaseIdToken = result.firebaseIdToken
    user.firebaseRefreshToken = result.firebaseRefreshToken 

    // Include the permission code according to his role:
    user.permissionCode = cyber.hashRole(user.role)

    // Generate token:
    const token = cyber.getNewToken(user);

    return token
};

// login
    async function login(credentials: CredentialsModel): Promise<string> {

    // Joi Validation
    const error = credentials.validatePost();

    if (error) {
        throw new UnauthorizedError("Incorrect username or password Please try again")
    };

    // Get the user by username and password
    const result:propertyForbiddenToAdd = await authDal.loginDal(User,credentials)

    if (!result) {
        throw new UnauthorizedError("Incorrect username or password Please try again")
    };


    // Include the parameters received from the dal:
    const userDetails:any = Object.assign({},result.user)
    userDetails.firebaseIdToken = result.firebaseIdToken
    userDetails.firebaseRefreshToken = result.firebaseRefreshToken

    const newUser = new UserModel(userDetails);

    // Include the permission code according to his role:
    newUser.permissionCode = cyber.hashRole(userDetails.role)
    
    // Delete password  before returning:
    delete newUser.password

    const token = cyber.getNewToken(newUser)

    return token;
};


export default {
    register,
    login
}
