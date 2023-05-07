import UserModel from "../../4-models/user-model";
import { Request } from "express";
import jwt from "jsonwebtoken"
import jwtDecode from "jwt-decode"
import { ForbiddenError, UnauthorizedError } from "../../4-models/errors-model";
import Role from "../../4-models/Role-model";
import crypto from "crypto"

const salt = process.env.HASH_SALT
const hashAlgorithm = process.env.HASH_ALGORITHM

// Encrypt the password using hash technique
function hash(plainText: string): string|null {
    if(!plainText) return null;

    // HMAC: Hash based Message Authentication Code
    const hashText = crypto.createHmac(hashAlgorithm,salt).update(plainText).digest("hex") // sha512 = Which algorithm to use, salt = A string to insert inside the  | plainText = createHash | hex = turn into a string

    return hashText
}

// Hash role before to generate an authorization code:
const hashRole = (role:Role) => {
    const permissionCode:string = hash(role)
    return permissionCode
}

// create a password that is embedded within the token to prevent content hackers from hacking into the system.
const secret = process.env.JWT_SECRET_KEY;

function getNewToken(user: UserModel): string {

    // Object to stash inside the token:
    const payload = { user };

    // Generate new token:
    const token = jwt.sign(payload, secret, { expiresIn: "10h" });

    // Return token
    return token;
};


function verifyServerToken(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        // Extract token header (autorization: Bearer token):
        const header = request.headers.authorization;

        // If no such header sent:
        if (!header) {
            reject(new UnauthorizedError("No token sent"))
        };

        //Extract the token:
        // Bearer the-token
        //        ^
        // 01234567
        const token = header?.substring(7);

        // If no token sent:
        if (!token) {
            reject(new UnauthorizedError("No token sent"))
        }

        // If we have some token:
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject(new UnauthorizedError("Invalid or expired"));
                return;
            }

            resolve(true)
        });

    });
};

function getUserDetailsFromToken(request: Request): Promise<any>{

    return new Promise<any>((resolve, reject) => {
        const header = request.headers.authorization;
        const token = header?.substring(7);
        const currentUser = (jwtDecode(token) as any).user

        if (currentUser === undefined) {
            reject( ("You do not have permission"))
            return;
        }
 
        resolve(currentUser)

    })

    
}

export default {
    hashRole,
    getNewToken,
    verifyServerToken,
    hash,
    getUserDetailsFromToken
}