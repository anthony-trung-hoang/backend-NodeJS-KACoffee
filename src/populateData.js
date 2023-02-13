const db = require("./models");
const sequelize = db.sequelize;

/*  
  @@ -10,59 +9,108 @@ Cách chạy:
2. Trên terminal gõ node .\src\populateData.js
*/

const user = [
  {
    phone: "0372443361",
    user_name: "ducquan",
    email: "leducquan@gmail.com",
    user_password: "123123",
    birthday: new Date(2002, 11, 16),
    gender: true,
    role: "admin",
    cart: null,
  },
  {
    phone: "0372443362",
    user_name: "vuduy",
    email: "maivuduy@gmail.com",
    user_password: "123124",
    birthday: new Date(2002, 11, 11),
    gender: true,
    role: "customer",
    cart: null,
  },
];

const voucher = [
  {
    expired_date: new Date(2023, 2, 28),
    value: 20000,
    amount: 10,
    voucher_code: "Giảm giá tháng 2",
  },
];

const item = [
  {
    amount: 100,
    price: 40000,
    description:
      "Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng",
    image_link: "",
    name: "Cà phê",
  },
  {
    amount: 200,
    price: 45000,
    description:
      "Cà phê hòa tan Cappuccino hương vị dừa, Lần đầu tiên tại Việt Nam, duy nhất chỉ có ở Trung Nguyên.",
    image_link: "",
    name: "Cà phê Trung Nguyên ",
  },
  {
    amount: 150,
    price: 60000,
    description:
      "Cà phê G7 hòa tan đen là dòng sản phẩm cà phê hòa tan đen thuần túy không đường, có chất lượng và hương vị đậm đà, thơm ngon đúng gu thưởng thức của những người sành cà phê.",
    image_link: "",
    name: "Cà phê G7",
  },
];

const orderdetail = [
  {
    item_id: 1,
    order_id: 1,
    quantity: 1,
  },
  {
    item_id: 2,
    order_id: 2,
    quantity: 1,
  },
  {
    item_id: 3,
    order_id: 3,
    quantity: 1,
  },
];

const order = [{
  total_price: 20000,
  payment: "Direct",
  status: false,
  staff_name: "Staff 1",
  shipping_address: "HN",
  user_id: 1,
  voucher_id: 1,
}, {
  total_price: 50000,
  payment: "Direct",
  status: false,
  staff_name: "Staff 1",
  shipping_address: "HN",
  user_id: 2,
  voucher_id: null,
}, {
  total_price: 60000,
  payment: "Direct",
  status: true,
  staff_name: "Staff 1",
  shipping_address: "HN",
  user_id: 1,
  voucher_id: null,
}]


async function populate() {
  @@ -72, 13 + 120, 13 @@async function populate() {

    await sequelize.sync({ force: true });

    await sequelize.models.User.bulkCreate(user);
    await sequelize.models.Voucher.bulkCreate(voucher);
    await sequelize.models.Item.bulkCreate(item);
    await sequelize.models.Order.bulkCreate(order);
    await sequelize.models.OrderDetail.bulkCreate(orderdetail);

    console.log("Done!");
  }

  populate();