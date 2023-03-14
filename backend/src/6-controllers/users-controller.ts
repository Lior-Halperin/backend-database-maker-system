import express, { NextFunction, Request, Response } from "express";
import verifyAccess from "../3-middleware/verify-access";
// import { ProductModel } from "../4-models/product-model";
// import logic from "../5-logic/product-logic";
// import { RouteNotFoundError } from "../4-models/error-models";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
// import UserModel from "../4-models/user-model";

const router = express.Router();

// GET http://localhost:3002/api/users
router.get("/users",verifyLoggedIn,verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try {

        response.json("AllUsers");

        // const AllUsers = await logic.getAllUsers();
        // response.json(AllUsers);
    }
    catch (err: any) {
        next(err);
    }
});

// // GET http://localhost:3002/api/user/1
// router.get("/users/:id",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = request.params.id;
//         const user = await logic.getOneUser(id);
//         response.json(user);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });


// // PUT http://localhost:3002/api/users/7 <-- id
// router.put("/users/:id([0-9]+)", verifyLoggedIn, verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         request.body.id = +request.params.id;
//         const user = new UserModel(request.body);

//         const updatedUser = await logic.updateFullUser(user);
//         response.json(updatedUser);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });


// // DELETE http://localhost:3002/api/vacations/7 <-- id
// router.delete("/users/:id([0-9]+)", verifyLoggedIn, verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = +request.params.id;
//         await logic.deleteUser(id);
//         response.sendStatus(204);
//     }
//     catch (err: any) {
//         next(err);
//     }

// });

export default router;