import db from "../models";

const getAllStaffOrder = (status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await db.sequelize.query(
        `SELECT orders.id, users.user_name, items.name, items.image_link, orderdetails.quantity, orders.total_price, orders.shipping_address, vouchers.voucher_code, orders.createdAt, orders.status FROM orders INNER JOIN orderdetails ON orders.id = orderdetails.order_id INNER JOIN users ON orders.user_id = users.id LEFT JOIN vouchers ON orders.voucher_id = vouchers.id INNER JOIN items ON orderdetails.item_id = items.id WHERE orders.status = ${status} ORDER BY orders.createdAt ASC;`,
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      resolve(orders);
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatusOrder = (id, isSuccessful) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findByPk(id);
      if (isSuccessful) order.status = 1;
      else order.status = -1;
      await order.save();
      resolve(order);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllStaffOrder: getAllStaffOrder,
  updateStatusOrder: updateStatusOrder,
};
