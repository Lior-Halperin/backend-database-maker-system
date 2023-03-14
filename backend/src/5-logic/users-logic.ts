// import { OkPacket } from "mysql";
// // import dal from "../2-utils/dal"
// import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
// import UserModel from "../4-models/User-model";
// import { v4 as uuid } from "uuid";

// const imageFilesPath = "./src/1-assets/images/"

// // Get all Users:
// async function getAllUsers(): Promise<UserModel[]> {

//     const sql = `SELECT id,destination,description,DATE_FORMAT(formDate,"%d/%m/%Y") AS formDate,DATE_FORMAT(untilDate,"%d/%m/%Y") AS untilDate,price,imageName FROM Users`;
    
//     const Users = await dal.execute(sql);
//     return Users;
// }

// // Get one User:
// async function getOneUser(id: number): Promise<UserModel> {
//     this.UserModel
//     const sql = `SELECT id,destination,description,formDate,untilDate,price,imageName FROM Users WHERE id = ?`;

//     const Users = await dal.execute(sql,[id]);
//     const User = Users[0];

//     if (!User) {
//         throw new ResourceNotFoundError(id);
//     }

//     return User;
// }


// // Update full User:
// async function updateFullUser(User: UserModel): Promise<UserModel> {

//     const errors = User.validatePut();
//     if (errors) {
//         throw new ValidationError(errors);
//     }

//     // Check that updated destination does not already exist in the system 
//     const updatedDestination = User.destination;
//     const previousDestination = (await getOneUser(User.id)).destination;
//     if (await isDestinationUserExist(User.destination) && updatedDestination !== previousDestination) {
//         throw new ValidationError(`This destination '${User.destination}' already exists`)
//     };


//     // Handling image:
//     if (User.image) {
//         // Delete the image from the disk:
//         const UserId = await User.id;
//         const imageNameToDelete: string = (await getOneUser(UserId)).imageName;
//         if (imageNameToDelete !== "") {
//             await fs.unlink(imageFilesPath + imageNameToDelete)
            
//         };

//         // Generate unique name with original extension:
//         const dotIndex = User.image.name.lastIndexOf(".");
//         const extension = User.image.name.substring(dotIndex);
//         User.imageName = uuid() + extension; // example: 75045ec6-bcb6-4900-b7e5-284cb66110ad.png/jpg...
//         // Save in disk:
//         await User.image.mv(imageFilesPath+ User.imageName)

//         // Don't return back image file:
//         delete User.image;
//     }

//     const sql = `UPDATE Users SET destination = ?, description = ?, formDate = ?, untilDate = ?, price = ?, imageName = ? WHERE id = ?`;
//     const result: OkPacket = await dal.execute(sql,[User.destination,User.description,User.formDate, User.untilDate, User.price, User.imageName, User.id]);

//     if (result.affectedRows === 0) {
//         throw new ResourceNotFoundError(User.id)
//     }

//     // Report via socket.io an existing User has been updated by the admin:
//     socketLogic.reportUpdateUser(User)

//     return User;
// }



// // Delete User:
// async function deleteUser(id: number): Promise<void> {

//     // Delete the image from the disk:
//     const imageNameToDelete: string = (await getOneUser(id)).imageName;
//     if (imageNameToDelete !== "") {
//         await fs.unlink(imageFilesPath + imageNameToDelete)
//     }

//     const sql = `DELETE FROM Users WHERE Id = ?`;
//     const result = await dal.execute(sql,[id]);
//     if (result.affectedRows === 0) {
//         throw new ResourceNotFoundError(id);
//     }

//     // Report via socket.io an existing clothing has been deleted by the admin: 
//     socketLogic.reportDeleteUser(id)

// }


// // Internal function to check if the destination already exists:
// async function isDestinationUserExist(destination: string): Promise<boolean> {
//     const sql = `SELECT COUNT(destination) as count FROM Users WHERE destination = ?`;
//     const result = await dal.execute(sql,[destination]);
//     const count = result[0].count;
//     return count > 0;
// }

// export default {
//     getAllUsers,
//     getOneUser,
//     addUser,
//     updateFullUser,
//     deleteUser,
// };