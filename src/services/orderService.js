import db from "../models/index";

let getAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = '';
            orders = await db.Order.findAll({ raw: true });
            resolve(orders);
        } catch (error) {
            reject(error);
        }
    })
}

let getOrdersByUserId = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = '';
            if (user_id) {
                orders = await db.Order.findAll({
                    where: {
                        user_id: user_id
                    },
                    raw: true
                })

                resolve(orders);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let createNewOrderAndDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.total_price || (!data.status && !data.status === 0) || !data.user_id) {
                resolve({
                    code: 1,
                    message: 'Missing input parameters'
                })
            }
            else {
                let newOrder = await db.Order.create({
                    total_price: data.total_price,
                    payment: data.payment,
                    status: (data.status) ? data.status : 0,
                    staff_name: data.staff_name,
                    shipping_address: (data.shipping_address) ? data.shipping_address : "OFFLINE",
                    user_id: data.user_id,
                    voucher_id: data.voucher_id
                })

                let newOrderId = newOrder.id;
                let newOrderRaw = await db.Order.findOne({
                    where: { id: newOrderId },
                    raw: true
                })

                let itemArray = data.details;
                for (let i = 0; i < itemArray.length; i++) {
                    let itemID = itemArray[i].item_id;
                    let itemQuantity = itemArray[i].quantity;

                    await db.OrderDetail.create({
                        item_id: itemID,
                        order_id: newOrderId,
                        quantity: itemQuantity
                    })

                    await reduceItemAmountById(itemID, itemQuantity);
                }
                resolve({
                    code: 0,
                    message: "Successfully created",
                    order: newOrderRaw
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let reduceItemAmountById = (item_id, amount) => {
    return new Promise(async (resolve, reject) => {
        try {
            let item = await db.Item.findOne({
                where: { id: item_id },
                raw: false
            })

            if (item) {
                let currentAmount = item.amount;
                item.amount = currentAmount - amount;
                await item.save();

                resolve()
            } else {
                resolve()
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getOrderDetailByOrderId = (order_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let details = '';
            if (order_id) {
                details = await db.OrderDetail.findAll({
                    where: {
                        order_id: order_id
                    },
                    raw: true,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'order_id']
                    }
                })
                console.log(details);
                resolve(details);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllOrderDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let details = '';
            details = await db.OrderDetail.findAll({ raw: true });
            resolve(details);
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    getAllOrders: getAllOrders,
    getOrdersByUserId: getOrdersByUserId,
    createNewOrderAndDetail: createNewOrderAndDetail,
    getOrderDetailByOrderId: getOrderDetailByOrderId,
    getAllOrderDetails: getAllOrderDetails
}