import voucherService from "../services/voucherService";

// expired_date: DataTypes.DATE,
// value: DataTypes.INTEGER,
// amount: DataTypes.INTEGER,
// voucher_code: DataTypes.STRING

let handleCreateNewVoucher = async (req, res) => {
    let msg = await voucherService.createNewVoucher(req.body);
    return res.status(200).json({
        msg
    })
}

let handleDeleteVoucher = async (req, res) => {
    if (!req.body.id) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })

    let msg = await voucherService.deleteVoucher(req.body.id);
    return res.status(200).json({
        msg
    })
}

let handleEditVoucherById = async (req, res) => {
    if (!req.body.id) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })
    let data = req.body;
    let message = await voucherService.editVoucherById(data);
    return res.status(200).json({
        message
    })
}

let handleGetAllVouchers = async (req, res) => {
    let vouchers = await voucherService.getAllVouchers();

    return res.status(200).json({
        code: 0,
        message: 'OK',
        vouchers: vouchers
    })
}

let handleGetVoucherById = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let voucher = await voucherService.getVoucherById(id);

    if (voucher) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            voucher: voucher
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'voucher with input id not exist'
        })
    }
}

let handleGetVoucherByCode = async (req, res) => {
    let code = req.body.voucher_code;
    // console.log(code);
    if (!code) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let vouchers = await voucherService.getVoucherByCode(code);

    if (vouchers) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            vouchers: vouchers
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'voucher with input code not exist'
        })
    }
}

module.exports = {
    handleCreateNewVoucher: handleCreateNewVoucher,
    handleDeleteVoucher: handleDeleteVoucher,
    handleEditVoucherById: handleEditVoucherById,
    handleGetAllVouchers: handleGetAllVouchers,
    handleGetVoucherById: handleGetVoucherById,
    handleGetVoucherByCode: handleGetVoucherByCode
}