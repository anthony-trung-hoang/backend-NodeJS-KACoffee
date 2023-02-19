const db = require("./models");
const sequelize = db.sequelize;

/*  
----- Khởi tạo bộ dữ liệu mẫu ------
NOTE: Khi chạy sẽ xóa các instances trong cách bảng và chèn dữ liệu mới
Cách chạy: 
1.Khởi động XAMPP
2. Trên terminal gõ node .\src\populateData.js
*/

const user = [
  // define custom
  {
    phone: "0372443361",
    user_name: "custom1",
    email: "custom1@gmail.com",
    user_password: "123123",
    birthday: new Date(2002, 11, 16),
    gender: true,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0981237654",
    user_name: "custom2",
    email: "custom2@gmail.com",
    user_password: "MAkana@Hnz",
    birthday: new Date(1987, 7, 31),
    gender: false,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0872312381",
    user_name: "custom3",
    email: "custom3@gmail.com",
    user_password: "MZNLPL@!MNN",
    birthday: new Date(2000, 1, 12),
    gender: true,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0347371212",
    user_name: "custom4",
    email: "custom4@gmail.com",
    user_password: "Helosolyly",
    birthday: new Date(2001, 12, 12),
    gender: false,
    role: 3,
    cart: null,
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0543243234",
    user_name: "custom5",
    email: "custom5@gmail.com",
    user_password: "QuanProVjp",
    birthday: new Date(1999, 11, 11),
    gender: true,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0372187612",
    user_name: "custom6",
    email: "custom6@gmail.com",
    user_password: "!Lov3MyPiano",
    birthday: new Date(1998, 12, 13),
    gender: false,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0392878212",
    user_name: "custom7",
    email: "custom7@gmail.com",
    user_password: "d3ltagamm@",
    birthday: new Date(1998, 07, 12),
    gender: true,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0472319987",
    user_name: "custom8",
    email: "custom8@gmail.com",
    user_password: "!ush3r",
    birthday: new Date(1995, 12, 11),
    gender: false,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0872219975",
    user_name: "custom9",
    email: "custom9@gmail.com",
    user_password: "&ebay.44",
    birthday: new Date(1975, 04, 02),
    gender: false,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
  {
    phone: "0392551931",
    user_name: "custom10",
    email: "custom10@gmail.com",
    user_password: ".Susan53",
    birthday: new Date(2005, 1, 1),
    gender: true,
    role: 3,
    cart: "",
    rank: 1,
    totalMoneyHistory: 150000
  },
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
    rank: null,
    totalMoneyHistory: null
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
    rank: null,
    totalMoneyHistory: null
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
    rank: null,
    totalMoneyHistory: null
  },
];

const voucher = [
  {
    expired_date: new Date(2023, 4, 30),
    value: 20000,
    amount: 15,
    voucher_code: "GIAMGIATHANG2",
  },
  {
    expired_date: new Date(2023, 3, 30),
    value: 30000,
    amount: 10,
    voucher_code: "BANMOI",
  },
  {
    expired_date: new Date(2023, 2, 28),
    value: 10000,
    amount: 20,
    voucher_code: "KHACHVIP",
  },
];

const item = [
  {
    amount: 100,
    price: 49000,
    description:
      "Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác thức giấc, thơm ngon hết nấc.",
    image_link: "/public/1.png",
    name: "CloudFee Hạnh Nhân Nướng",
  },
  {
    amount: 200,
    price: 39000,
    description:
      "Thức uống giúp tỉnh táo tức thì để bắt đầu ngày mới thật hứng khởi. Không đắng khét như cà phê truyền thống, The Coffee House Sữa Đá mang hương vị hài hoà đầy lôi cuốn. Là sự đậm đà của 100% cà phê Arabica Cầu Đất rang vừa tới, biến tấu tinh tế với sữa đặc và kem sữa ngọt ngào cực quyến rũ. Càng hấp dẫn hơn với topping thạch 100% cà phê nguyên chất giúp giữ trọn vị ngon đến ngụm cuối cùng.",
    image_link: "/public/2.png",
    name: "The Coffee House Sữa Đá",
  },
  {
    amount: 150,
    price: 29000,
    description:
      "Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
    image_link: "/public/3.png",
    name: "Cà Phê Sữa Đá",
  },
];

const order = [
  // Pending
  {
    total_price: 49000,
    payment: 1,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "117 Thái Hà, P. Trung Liệt, Q. Đống Đa",
    user_id: 1,
    voucher_id: 1,
  },
  {
    total_price: 49000,
    payment: 1,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "278 - 280 Nguyễn Văn Cừ, P. Ngọc Lâm, Q. Long Biên",
    user_id: 2,
    voucher_id: 2,
  },
  {
    total_price: 39000,
    payment: 3,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "Số 1 Hàng Chiếu, Hoàn Kiếm, Hà Nội",
    user_id: 3,
    voucher_id: 3,
  },
  {
    total_price: 29000,
    payment: 3,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "Ngõ Tạm Thương, Hàng Bông, Hoàn Kiếm, Hà Nội.",
    user_id: 4,
    voucher_id: 2,
  },
  {
    total_price: 29000,
    payment: 2,
    status: 0,
    staff_name: "Staff 2",
    shipping_address: "33 Ngũ Xã , Ba Đình, Hà Nội",
    user_id: 5,
    voucher_id: null,
  },
  {
    total_price: 39000,
    payment: 1,
    status: 0,
    staff_name: "Staff 2",
    shipping_address: "số 6 Hàng Chai, Hoàn Kiếm, Hà Nội",
    user_id: 6,
    voucher_id: null,
  },
  {
    total_price: 49000,
    payment: 1,
    status: 0,
    staff_name: "Staff 2",
    shipping_address: "52 Lý Quốc Sư, Hoàn Kiếm, Hà Nội",
    user_id: 7,
    voucher_id: null,
  },
  {
    total_price: 29000,
    payment: 1,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "",
    user_id: 8,
    voucher_id: 3,
  },
  {
    total_price: 39000,
    payment: 2,
    status: 0,
    staff_name: "Staff 1",
    shipping_address:
      "Ngõ Huyện (đoạn giao với phố Lý Quốc Sư), Hoàn Kiếm, Hà Nội",
    user_id: 9,
    voucher_id: 2,
  },
  {
    total_price: 39000,
    payment: 3,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "Số 10 Ấu Triệu, Hoàn Kiếm, Hà Nội",
    user_id: 10,
    voucher_id: 2,
  },
  // Successful
  {
    total_price: 39000,
    payment: 1,
    status: 1,
    staff_name: "Staff 1",
    shipping_address: "Số 25 Hồ Hoàn Kiếm, Hoàn Kiếm, Hà Nội",
    user_id: 1,
    voucher_id: 2,
  },
  {
    total_price: 49000,
    payment: 2,
    status: 1,
    staff_name: "Staff 1",
    shipping_address: "Số 8 Lê Ngọc Hân, Hai Bà Trưng, Hà Nội",
    user_id: 2,
    voucher_id: null,
  },
  {
    total_price: 29000,
    payment: 3,
    status: 1,
    staff_name: "Staff 1",
    shipping_address: "25 Gia Ngư, Hoàn Kiếm, Hà Nội",
    user_id: 3,
    voucher_id: 1,
  },
  // Cancel
  {
    total_price: 29000,
    payment: 1,
    status: -1,
    staff_name: "Staff 2",
    shipping_address: "31 Quang Trung, Hoàn Kiếm, Hà Nội",
    user_id: 1,
    voucher_id: null,
  },
  {
    total_price: 29000,
    payment: 1,
    status: -1,
    staff_name: "Staff 2",
    shipping_address: "16 Ngô Thì Nhậm, Hai Bà Trưng, Hà Nội",
    user_id: 2,
    voucher_id: null,
  },
  // Offine
  {
    total_price: 129000,
    payment: 1,
    status: 0,
    staff_name: "Staff 2",
    shipping_address: "OFFLINE",
    user_id: 1,
    voucher_id: null,
  },
  {
    total_price: 229000,
    payment: 1,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "OFFLINE",
    user_id: 2,
    voucher_id: null,
  },
  {
    total_price: 29000,
    payment: 1,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "OFFLINE",
    user_id: 3,
    voucher_id: null,
  },
  {
    total_price: 39000,
    payment: 1,
    status: 0,
    staff_name: "Staff 2",
    shipping_address: "OFFLINE",
    user_id: 4,
    voucher_id: null,
  },
  {
    total_price: 29000,
    payment: 1,
    status: 0,
    staff_name: "Staff 1",
    shipping_address: "OFFLINE",
    user_id: 5,
    voucher_id: null,
  },
];

const orderdetail = [
  {
    item_id: 2,
    order_id: 1,
    quantity: 3,
  },
  {
    item_id: 1,
    order_id: 1,
    quantity: 2,
  },
  {
    item_id: 3,
    order_id: 1,
    quantity: 1,
  },
  {
    item_id: 2,
    order_id: 2,
    quantity: 1,
  },
  {
    item_id: 1,
    order_id: 2,
    quantity: 2,
  },
  {
    item_id: 1,
    order_id: 3,
    quantity: 1,
  },
  {
    item_id: 3,
    order_id: 4,
    quantity: 1,
  },
  {
    item_id: 3,
    order_id: 5,
    quantity: 2,
  },
  {
    item_id: 3,
    order_id: 6,
    quantity: 1,
  },
  {
    item_id: 1,
    order_id: 7,
    quantity: 1,
  },
  {
    item_id: 1,
    order_id: 8,
    quantity: 2,
  },
  {
    item_id: 1,
    order_id: 9,
    quantity: 1,
  },
  {
    item_id: 2,
    order_id: 10,
    quantity: 1,
  },
  {
    item_id: 1,
    order_id: 11,
    quantity: 2,
  },
  {
    item_id: 3,
    order_id: 12,
    quantity: 1,
  },
  {
    item_id: 1,
    order_id: 13,
    quantity: 1,
  },
  {
    item_id: 3,
    order_id: 14,
    quantity: 1,
  },
  {
    item_id: 2,
    order_id: 15,
    quantity: 1,
  },
  {
    item_id: 3,
    order_id: 16,
    quantity: 1,
  },
  {
    item_id: 3,
    order_id: 17,
    quantity: 1,
  },
  {
    item_id: 1,
    order_id: 18,
    quantity: 1,
  },
  {
    item_id: 1,
    order_id: 19,
    quantity: 1,
  },
  {
    item_id: 2,
    order_id: 20,
    quantity: 1,
  },
];

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
