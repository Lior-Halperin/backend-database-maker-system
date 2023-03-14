

## features

* **Authorization - hash, jwt(Token)** 
In Firebase Authentication, when a user signs in or when their session is automatically refreshed, the Firebase Authentication server generates a new ID token and refresh token pair, and returns them to the client.
The refresh token is a long-lived token that can be used to obtain new ID tokens that expire after one hour.

* **Firebase -  Firebase Auth service**  
* **CLI - Check connection status to dataBase**



## Methods

| Controllers         | |   Method            |  Credentials                     |                             
| ------------------- | | ------------------- |--------------------------------- |
|------------------------------------------------------------------------------- |
|                             Company controller                                 |
|------------------------------------------------------------------------------- |
| **Company controller** | GET: getCompanyById()            | Admin and User.    |
| **Company controller** | PUT: updateFullCompany()         | Admin and User.    |
| **Company controller** | POST: addCompany()               | Admin.             |
| **Company controller** | GET: getAllCompany()             | Admin.             |
| **Company controller** | DELETE: deleteCompany()          | Admin.             |
|------------------------------------------------------------------------------- |
|                             Auth controller                                    |
|------------------------------------------------------------------------------- |
| **Auth controller** | POST: register()                    | Admin and User.    |
| **Auth controller** | POST: login()                       | Admin and User.    |
|------------------------------------------------------------------------------- |
|                             User controller                                    |
|------------------------------------------------------------------------------- |
| **User controller** | GET: getUserById()                  | Admin.             |
| **User controller** | PUT: updateFullUser()               | Admin.             |
| **User controller** | POST: addUser()                     | Admin.             |
| **User controller** | GET: getAllUsers()                  | Admin.             |
| **User controller** | DELETE: deleteUser()                | Admin.             |
|------------------------------------------------------------------------------- |

## Suggestions for improvement and ideas:

 **Identity Platform With GoogleCloud:** The service is subject to a fee.
 **Encrypt the role:** at the time of registration and save it as an encrypted value in a database.
 **Inheritance:** required to make an inheritance between UserModel and CredentialsModel.
 

