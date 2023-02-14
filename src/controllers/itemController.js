import itemService from "../services/itemService";
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}).single('image');

let handleCreateNewItem = async (req, res) => {
    if (typeof req.file !== 'undefined') {
        console.log(req.file);
        let filePath = req.file.path;
        console.log(filePath);
        let msg = await itemService.createNewItem(req.body, filePath);
        return res.status(200).json({
            msg
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'Only jpeg and png images are allowed'
        })
    }
}

let handleDeleteItem = async (req, res) => {
    if (!req.body.id) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })

    let msg = await itemService.deleteItem(req.body.id);
    return res.status(200).json({
        msg
    })
}

let handleEditItemInfoById = async (req, res) => {
    if (!req.body.id) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })
    let data = req.body;
    let message = await itemService.editItemById(data);
    return res.status(200).json({
        message
    })
}

let handleGetAllItems = async (req, res) => {
    let items = await itemService.getAllItems();

    return res.status(200).json({
        code: 0,
        message: 'OK',
        items: items
    })
}

let handleGetItemById = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let item = await itemService.getItemById(id);

    if (item) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            item: item
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'item with input id not exist'
        })
    }
}

module.exports = {
    handleCreateNewItem: handleCreateNewItem,
    handleDeleteItem: handleDeleteItem,
    handleEditItemInfoById: handleEditItemInfoById,
    handleGetAllItems: handleGetAllItems,
    handleGetItemById: handleGetItemById,
    uploadImg: uploadImg
}