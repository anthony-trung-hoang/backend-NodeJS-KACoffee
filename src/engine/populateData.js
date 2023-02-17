const db = require("../models");
const sequelize = db.sequelize;

/*  
----- Khởi tạo bộ dữ liệu mẫu ------
NOTE: Khi chạy sẽ xóa các instances trong cách bảng và chèn dữ liệu mới
Cách chạy: 
1.Khởi động XAMPP
2. Trên terminal gõ node .\src\populateData.js
*/

const item = require('./output/items.json')
const user = require('./output/users.json')
const voucher = require('./output/vouchers.json')
const order = require('./output/orders.json')
const orderdetail = require('./output/orderdetails.json')

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
  