import orderService from "../services/orderService";

let handleCreateNewOrderAndDetail = async (req, res) => {
    let msg = await orderService.createNewOrderAndDetail(req.body);
    return res.status(200).json(
        msg
    )
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
    let user_id = req.query.user_id;
    if (!user_id) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let orders = await orderService.getOrdersByUserId(user_id);

    if (orders.length !== 0) {
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

let handleGetAllOrderDetails = async (req, res) => {
    let details = await orderService.getAllOrderDetails();

    return res.status(200).json({
        code: 0,
        message: 'OK',
        details: details
    })
}

let handleGetOrderDetailByOrderId = async (req, res) => {
    let order_id = req.query.order_id;
    if (!order_id) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let details = await orderService.getOrderDetailByOrderId(order_id);

    if (details.length !== 0) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            order_id: order_id,
            details: details
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'order detail not exist'
        })
    }
}

module.exports = {
    handleGetOrderDetailByOrderId: handleGetOrderDetailByOrderId,
    handleGetAllOrders: handleGetAllOrders,
    handleGetOrdersByUserId: handleGetOrdersByUserId,
    handleGetAllOrderDetails: handleGetAllOrderDetails,
    handleCreateNewOrderAndDetail: handleCreateNewOrderAndDetail
}