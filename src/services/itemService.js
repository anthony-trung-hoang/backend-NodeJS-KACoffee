import db from "../models/index";
import fs from "fs";

let createNewItem = (data, filePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.price || !data.description || !data.name) {
                resolve({
                    code: 1,
                    message: 'Missing input parameters'
                })
            }
            else {
                await db.Item.create({
                    amount: data.amount,
                    price: data.price,
                    description: data.description,
                    image_link: filePath,
                    name: data.name
                })

                await db.Item.findOne({
                    where: {

                    }
                })

                resolve({
                    code: 0,
                    message: "Successfully created"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteItem = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let itemToDelete = await db.Item.findOne({
                where: { id: id }
            })

            if (itemToDelete) {
                let pathToImgFile = itemToDelete.image_link;
                fs.unlink(pathToImgFile, function (err) {
                    if (err) {
                        throw err
                    } else {
                        console.log("Successfully deleted the file.")
                    }
                })
                await db.Item.destroy({
                    where: { id: id }
                })
                resolve({
                    code: 0,
                    message: "Successfully deleted"
                })
            } else {
                resolve({
                    code: 2,
                    message: "Item not exist"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let editItemById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let item = await db.Item.findOne({
                where: { id: data.id },
                raw: false
            })

            if (item) {
                item.amount = data.amount;
                item.price = data.price;
                item.description = data.description;
                item.image_link = data.image_link;
                item.name = data.name;

                await item.save();
                let newItem = await db.Item.findOne({
                    where: {
                        id: data.id
                    }
                })
                resolve({
                    code: 0,
                    message: 'Successfully updated',
                    item: newItem
                })
            } else {
                resolve({
                    code: 2,
                    message: 'item id not found'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getAllItems = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let items = '';
            items = await db.Item.findAll({ raw: true });
            resolve(items);
        } catch (error) {
            reject(error);
        }
    })
}

let getItemById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let item = '';
            if (id) {
                item = await db.Item.findOne({
                    where: {
                        id: id
                    },
                    raw: true
                })

                resolve(item);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getItemFilePath = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let item = '';
            if (id) {
                item = await db.Item.findOne({
                    where: {
                        id: id
                    },
                    raw: true
                })

                if (item) {
                    resolve(item.image_link);
                } else {
                    resolve("");
                }

            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateImageById = (data, filePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            let item = await db.Item.findOne({
                where: { id: data.id },
                raw: false
            })

            if (item) {
                let pathToImgFile = item.image_link;
                fs.unlink(pathToImgFile, function (err) {
                    if (err) {
                        throw err
                    } else {
                        console.log("Successfully deleted the file.")
                    }
                })
                item.image_link = filePath;

                await item.save();
                let newItem = await db.Item.findOne({
                    where: {
                        id: data.id
                    }
                })
                resolve({
                    code: 0,
                    message: 'Successfully updated',
                    item: newItem
                })
            } else {
                resolve({
                    code: 2,
                    message: 'item id not found'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewItem: createNewItem,
    deleteItem: deleteItem,
    editItemById: editItemById,
    getAllItems: getAllItems,
    getItemById: getItemById,
    getItemFilePath: getItemFilePath,
    updateImageById: updateImageById
}