import express from "express";
import userController from "../controllers/userController"

let router = express.Router();

let initRoutes = (app) => {
    router.get('/api/login', userController.handleUserLogin);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.post('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/edit-user-info-by-phone', userController.handleEditUserInfo);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/get-user-by-id', userController.handleGetUserById);

    return app.use("/", router);
}


module.exports = initRoutes;