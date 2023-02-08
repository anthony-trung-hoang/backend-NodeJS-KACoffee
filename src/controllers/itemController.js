import itemService from "../services/itemService";

let handleCreateNewItem = async (req, res) => {
    let msg = await itemService.createNewItem(req.body);

    return res.status(200).json({
        msg
    })
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
    handleGetItemById: handleGetItemById
}