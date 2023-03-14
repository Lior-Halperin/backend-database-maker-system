import { InsertResult, ObjectLiteral } from "typeorm";

export type propertyForbiddenToAdd = {
    user: ObjectLiteral | InsertResult;
    firebaseIdToken: string;
    firebaseRefreshToken:  string;
}