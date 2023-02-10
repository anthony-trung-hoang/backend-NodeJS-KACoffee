import orderService from "../services/orderService";

let handleCreateNewOrder = async (req, res) => {
    let msg = await orderService.createNewOrder(req.body);
    return res.status(200).json({
        msg
    })
}

let handleGetAllOrders = async (req, res) => {
    let orders = await orderService.getAllOrders();

    return res.status(200).json({
        code: 0,
        message: 'OK',
        orders: orders
    })
}

let handleGetOrdersByUserId = async (req, res) => {
    let user_id = req.body.user_id;
    if (!user_id) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let orders = await orderService.getOrderByUserId(user_id);

    if (orders) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            orders: orders
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'order with input user_id not exist'
        })
    }
}


module.exports = {
    handleCreateNewOrder: handleCreateNewOrder,
    handleGetAllOrders: handleGetAllOrders,
    handleGetOrdersByUserId: handleGetOrdersByUserId
}