# PetroCloud

## Overview

The PetroCentral application server will handle all user authentication, user logins and logouts, and manage data transformations between the associated User, Post, and Comment models. PetroCentral's purpose is to serve as a forum for industry professionals and customers to discuss relevant news and share knowledge.

## Build

These instructions are for installation of the project on your machine.

### Preliminary step for Windows machines
Unlike Mac/Unix machines, node package manager (npm) is not installed by default. Windows users will have to manually install npm.
1. Install npm for Windows from `https://nodejs.org/en/`
2. Verify installation of npm and nodejs by typing the commands `npm -v` and `node -v`, respectively. If a version appears, the installation was succesful.

### In your terminal

1. Go to the root folder where you want to install the repository `cd <your folder>`
2. Clone the repository using `git clone https://github.com/JamesMcCreary/PetroCloud.git`
3. `cd PetroCloud`
4. Install packages using `npm install`
5. Run the PetroCloud server using `npm run prod`

### In your web browser or Postman

1. Navigate to `http://localhost:27017` as the base url for the `/users`, `/posts`, and `/comments` paths

## Core Dependencies

* [npm](https://www.npmjs.com/)
* [express](https://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)

## Postman Collection
The Postman API collection for the routes is included in the `PetroCentral.postman_collection` file at the root level.

## Todo List
1. Add more comprehensive validation on routes
2. Implement security tokens (JWT using OAuth2)
3. Add CORS and SSL security
4. Use passport.js NPM module to implement login/logout functionality
5. Relate user, post, and comment models via ID's
6. Implement remaining routes

## Note
The `node_modules` folder and `config/db.js` file are listed in a `.gitignore` file for brevity and security purposes, respectively. The latter contains the mongoDB URI which includes the database administrator credentials.


## Release Log

Version status

In Development: v1.1.0  
In Testing: v1.0.0

#### v1.2.0 - CORS and SSL:

* Add CORS and SSL security

#### v1.1.0 - MVP Advanced:

* First Priority: Add unit tests to v1.0.0 code
* Add advanced API endpoints for CRUD operations
* Configure OAuth (https://auth0.com/) for login/logout functionality and authentication
* Add advanced validation checks on API calls
* Relate user, post, and comment models via respective ID's
* Backup Login/Logout Solution: Configure passport.js (http://passportjs.org/) for login/logout functionality and authentication
* Configure production environment and documentation

#### v1.0.0 - MVP Basic:

* [COMPLETE] Create initial project
* [COMPLETE] Create and connect to mongoDB database using Mongoose
* [COMPLETE] Create API endpoints for basic CRUD operations on users, posts, and comments
* [COMPLETE] Add basic validation checks on API calls
* [COMPLETE] Add README document
