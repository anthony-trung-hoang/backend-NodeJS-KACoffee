import db from "../models";

const getAllStaffOrder = (status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = await db.sequelize.query(
        //   `SELECT Orders.id, Users.user_name, Orders.total_price, Orders.shipping_address, Vouchers.voucher_code, Orders.createdAt, Orders.updateAt, Orders.status FROM Orders INNER JOIN users ON Orders.user_id = Users.id LEFT JOIN Vouchers ON Orders.voucher_id = Vouchers.id WHERE Orders.status = ${status} ORDER BY ${
        //   status == 0 ? "Orders.createdAt ASC" : "Orders.updatedAt DESC"
        // };,`
        `SELECT orders.id, users.user_name, orders.total_price, orders.shipping_address, vouchers.voucher_code, orders.createdAt, orders.updatedAt, orders.status FROM orders INNER JOIN users ON orders.user_id = users.id LEFT JOIN vouchers ON orders.voucher_id = vouchers.id WHERE orders.status = ${status} ORDER BY ${
          status == 0 ? "orders.createdAt ASC" : "orders.updatedAt DESC"
        };`,
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      const promiseArray = orders.map(async (value) => {
        const detail_order = await db.sequelize.query(
          // `SELECT Items.name, Orderdetails.quantity FROM Orderdetails INNER JOIN Items ON Orderdetails.item_id = Items.id WHERE Orderdetails.order_id = ${value.id}`,
          `SELECT items.name, orderdetails.quantity FROM orderdetails INNER JOIN items ON orderdetails.item_id = items.id WHERE orderdetails.order_id = ${value.id}`,
          { type: db.sequelize.QueryTypes.SELECT }
        );
        const newValue = { ...value, detail_order };
        return newValue;
      });

      Promise.all(promiseArray).then((staffOrders) => {
        // console.log(staffOrders);
        return resolve(staffOrders);
      });
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
      else {
        console.log("Order cancel, make undo amount");
        let order_details = await db.sequelize.query(
          // `SELECT Orderdetails.* FROM Orders INNER JOIN Orderdetails ON Orders.id = Orderdetails.order_id WHERE Orders.id = ${id}`
          `SELECT orderdetails.* FROM orders INNER JOIN orderdetails ON orders.id = orderdetails.order_id WHERE orders.id = ${id}`,
          {
            type: db.sequelize.QueryTypes.SELECT,
          }
        );
        order_details.forEach(async (value) => {
          const item = await db.Item.findByPk(value.item_id);
          item.amount += value.quantity
          await item.save().then((data) => console.log(data.toJSON()))
          
        });
        order.status = -1;
      }
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
