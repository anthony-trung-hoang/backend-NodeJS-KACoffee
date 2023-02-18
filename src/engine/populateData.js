const db = require("../models");
const sequelize = db.sequelize;

/*  
----- Khởi tạo bộ dữ liệu mẫu ------
NOTE: Khi chạy sẽ xóa các instances trong cách bảng và chèn dữ liệu mới
Cách chạy: 
1.Khởi động XAMPP
2. Trên terminal gõ node .\src\engine\populateData.js
*/

const item = require("./output/items.json");
const user = require("./output/users.json");

// Add admin and staff
user.push(
  ...[
    // define admin
    {
      phone: "0372443360",
      user_name: "admin",
      email: "Admin@gmail.com",
      user_password: "123456",
      birthday: new Date(2000, 1, 1),
      gender: true,
      role: 1,
      cart: "",
    },
    // define staff
    {
      phone: "0249782541",
      user_name: "staff1",
      email: "staff1@gmail.com",
      user_password: "123123",
      birthday: new Date(2001, 1, 1),
      gender: true,
      role: 2,
      cart: "",
    },
    {
      phone: "0472318912",
      user_name: "staff2",
      email: "staff2@gmail.com",
      user_password: "123123",
      birthday: new Date(2002, 1, 1),
      gender: true,
      role: 2,
      cart: "",
    },
  ]
);
console.log(user);

const voucher = require("./output/vouchers.json");
const order = require("./output/orders.json");
const orderdetail = require("./output/orderdetails.json");

async function populate() {
  console.log(
    "Will rewrite the MySQL example database, adding some dummy data."
  );

  await sequelize.sync({ force: true });

  await sequelize.models.User.bulkCreate(user);
  await sequelize.models.Voucher.bulkCreate(voucher);
  await sequelize.models.Item.bulkCreate(item);
  await sequelize.models.Order.bulkCreate(order);
  await sequelize.models.OrderDetail.bulkCreate(orderdetail);

  console.log("Done!");
}

populate();
