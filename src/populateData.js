const db = require("./models");
const orderdetail = require("./models/orderdetail");
const sequelize = db.sequelize;

/*  
----- Khởi tạo bộ dữ liệu mẫu ------
NOTE: Khi chạy sẽ xóa các instances trong cách bảng và chèn dữ liệu mới
Cách chạy: 
1.Khởi động XAMPP
2. Trên terminal gõ node .\src\populateData.js
*/

const user1 = {
  phone: "0372443361",
  user_name: "ducquan",
  email: "leducquan@gmail.com",
  user_password: "123123",
  birthday: new Date(2002, 11, 16),
  gender: true,
  role: "admin",
  cart: null,
};

const user2 = {
  phone: "0372443362",
  user_name: "vuduy",
  email: "maivuduy@gmail.com",
  user_password: "123124",
  birthday: new Date(2002, 11, 11),
  gender: true,
  role: "customer",
  cart: null,
};

const voucher1 = {
    expired_date: new Date(2023,2,28),
    value: 20000,
    amount: 10,
    voucher_code: "Giảm giá tháng 2"
}

const item1 = {
    amount: 100,
    price: 40000,
    description: "Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng",
    image_link: "",
    name: "Cà phê"
}

const orderdetail1 = {
    item_id: 1,
    order_id: 1,
    quantity: 1
}

const order1 = {
    total_price: 20000,
    payment: 'Direct',
    status: 1,
    staff_name: "Staff 1",
    shipping_address: "HN",
    user_id: 1,
    voucher_id: 1
}



async function populate() {
  console.log(
    "Will rewrite the MySQL example database, adding some dummy data."
  );

  await sequelize.sync({ force: true });

  await sequelize.models.User.bulkCreate([user1, user2]);
  await sequelize.models.Voucher.bulkCreate([voucher1]);
  await sequelize.models.Item.bulkCreate([item1]);
  await sequelize.models.Order.bulkCreate([order1])
  await sequelize.models.OrderDetail.bulkCreate([orderdetail1]);

  console.log("Done!");
}

populate();