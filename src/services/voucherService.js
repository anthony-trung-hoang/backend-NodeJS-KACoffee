import db from "../models/index";

let createNewVoucher = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.value || !data.expired_date || !data.voucher_code || !data.amount) {
                resolve({
                    code: 1,
                    message: 'Missing input parameters'
                })
            }

            await db.Voucher.create({
                expired_date: data.expired_date,
                value: data.value,
                amount: data.amount,
                voucher_code: data.voucher_code
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

let deleteVoucher = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let voucherToDelete = await db.Voucher.findOne({
                where: { id: id }
            })

            if (voucherToDelete) {
                await db.Voucher.destroy({
                    where: { id: id }
                })
                resolve({
                    code: 0,
                    message: "Successfully deleted"
                })
            } else {
                resolve({
                    code: 2,
                    message: "Voucher not exist"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let editVoucherById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let voucher = await db.Voucher.findOne({
                where: { id: data.id },
                raw: false
            })

            if (voucher) {
                // expired_date: DataTypes.DATE,
                // value: DataTypes.INTEGER,
                // amount: DataTypes.INTEGER,
                // voucher_code: DataTypes.STRING
                voucher.expired_date = data.expired_date;
                voucher.amount = data.amount;
                voucher.value = data.value;
                voucher.voucher_code = data.voucher_code;

                await voucher.save();
                let newVoucher = await db.Voucher.findOne({
                    where: {
                        id: data.id
                    }
                })
                resolve({
                    code: 0,
                    message: 'Successfully updated',
                    voucher: newVoucher
                })
            } else {
                resolve({
                    code: 2,
                    message: 'voucher id not found'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getAllVouchers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let vouchers = '';
            vouchers = await db.Voucher.findAll({ raw: true });
            resolve(vouchers);

        } catch (error) {
            reject(error);
        }
    })
}

let getVoucherById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let voucher = '';
            if (id) {
                voucher = await db.Voucher.findOne({
                    where: {
                        id: id
                    },
                    raw: true
                })

                resolve(voucher);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getVoucherByCode = (code) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vouchers = '';
            // console.log('Code from service', code);
            if (code) {
                vouchers = await db.Voucher.findAll({
                    where: {
                        voucher_code: code
                    },
                    raw: true
                })
                // console.log(vouchers);
                resolve(vouchers);
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    getAllVouchers: getAllVouchers,
    createNewVoucher: createNewVoucher,
    deleteVoucher: deleteVoucher,
    editVoucherById: editVoucherById,
    getVoucherById: getVoucherById,
    getVoucherByCode: getVoucherByCode
}