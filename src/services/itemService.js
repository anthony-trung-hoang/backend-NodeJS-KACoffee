import db from "../models/index";

// amount: DataTypes.INTEGER,
//     price: DataTypes.INTEGER,
//         description: DataTypes.TEXT,
//             image_link: DataTypes.TEXT,
//                 name: DataTypes.STRING

const createNewItem = async (req, res) => {
  try {
    const { name, amount, price, description } = req.body;
    const Item = await db.Item.create({
      amount: amount,
      price: price,
      description: description,
      name: name,
    });
    if (Item) {
      res.status(201).send({
        code: 0,
        message: "Successfully create item",
        data: Item,
      });
    } else {
      throw new Error({
        code: 2,
        message: "Error create item",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

let uploadItem = async (req, res) => {
  try {
    const { id } = req.query;
    const file = req.file;
    const Item = await db.Item.update(
      { image_link: file.filename },
      {
        where: {
          id: id,
        },
      }
    );
    if (Item) {
      res.status(201).send({
        code: 0,
        message: "Successfully upload image item",
      });
    } else {
      throw new Error({
        code: 2,
        message: "Cannot upload image item",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

let deleteItem = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let itemToDelete = await db.Item.findOne({
        where: { id: id },
      });

            if (itemToDelete) {
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
                // amount: DataTypes.INTEGER,
                // price: DataTypes.INTEGER,
                // description: DataTypes.TEXT,
                // image_link: DataTypes.TEXT,
                // name: DataTypes.STRING
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
      let items = "";
      items = await db.Item.findAll({ raw: true });
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};

let getItemById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (id) {
        item = await db.Item.findOne({
          where: {
            id: id,
          },
          raw: true,
        });

        resolve(item);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getItemFilePath = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (id) {
        item = await db.Item.findOne({
          where: {
            id: id,
          },
          raw: true,
        });

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

module.exports = {
    createNewItem: createNewItem,
    deleteItem: deleteItem,
    editItemById: editItemById,
    getAllItems: getAllItems,
    getItemById: getItemById,
    getItemFilePath: getItemFilePath,
    uploadItem: uploadItem
}