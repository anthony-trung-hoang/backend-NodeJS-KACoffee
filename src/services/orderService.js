import db from "../models/index";


let createNewOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id|| !data.total_price || !data.payment || !data.status ||
                !data.staff_name || !data.user_id || !data.voucher_id) {
                resolve({
                    code: 1,
                    message: 'Missing input parameters'
                })
            }

            await db.Order.create({
                id: data.id,
                total_price: data.total_price,
                payment: data.payment,
                status: data.status,
                staff_name: data.staff_name,
                shipping_address: data.shipping_address,
                user_id: data.user_id,
                voucher_id: data.voucher_id
            })

            resolve({
                code: 0,
                message: "Successfully created"
            })
        } catch (error) {
            reject(error);
        }
    })
}
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


module.exports = {

    createNewOrder: createNewOrder,
    getAllOrders: getAllOrders,
    getOrdersByUserId: getOrdersByUserId
}