import express from "express";
import userController from "../controllers/userController"
import voucherController from "../controllers/voucherController"
import itemController from "../controllers/itemController"
import orderController from "../controllers/orderController"
import uploadController from "../controllers/uploadController"

let router = express.Router();

let initRoutes = (app) => {

    //usercontroller
    router.post('/api/login', userController.handleUserLogin); //OK
    router.post('/api/create-new-user', userController.handleCreateNewUser); //OK
    router.delete('/api/delete-user', userController.handleDeleteUser); //OK
    router.put('/api/edit-user-info-by-phone', userController.handleEditUserInfoByPhone);//OK
    router.get('/api/get-all-users', userController.handleGetAllUsers);//OK
    router.get('/api/get-user-by-id', userController.handleGetUserById);//OK
    router.get('/api/get-user-by-phone', userController.handleGetUserByPhone);//OK

    //vouchercontroller
    router.post('/api/create-new-voucher', voucherController.handleCreateNewVoucher); // OK
    router.delete('/api/delete-voucher', voucherController.handleDeleteVoucher); //OK
    router.put('/api/edit-voucher-info-by-id', voucherController.handleEditVoucherById); //OK
    router.get('/api/get-all-vouchers', voucherController.handleGetAllVouchers);//OK
    router.get('/api/get-voucher-info-by-id', voucherController.handleGetVoucherById);//
    router.get('/api/get-voucher-info-by-code', voucherController.handleGetVoucherByCode);//OK

    //item controller
    router.post('/api/create-new-item', itemController.handleCreateNewItem); // OK
    router.delete('/api/delete-item', itemController.handleDeleteItem); // OK
    router.put('/api/edit-item-info-by-id', itemController.handleEditItemInfoById); //OK
    router.get('/api/get-item-info-by-id', itemController.handleGetItemById);// OK
    router.get('/api/get-all-items', itemController.handleGetAllItems);// OK

    //order controller
    router.post('/api/create-new-order', orderController.handleCreateNewOrder); 
    router.get('/api/get-orders-by-user-id', orderController.handleGetOrdersByUserId);
    router.get('/api/get-all-orders', orderController.handleGetAllOrders); 

    // upload controller
    router.post('/api/upload', uploadController.upload.single('image'), uploadController.handleUploadFile);

    
    return app.use("/", router);
}


module.exports = initRoutes;