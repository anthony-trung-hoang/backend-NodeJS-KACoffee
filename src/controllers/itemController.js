import itemService from "../services/itemService";
const multer = require("multer");
const path = require("path");

//handleUploadItem la mot middleware khong phai controller
let uploadItem = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/public");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
    //filter chỉ chấp nhận những file có đuôi là .png jpeg
    fileFilter: (req, file, cb) => {
      const extension = [".png", "jpeg"];
      const extensionOriginFile = file.originalname.slice(-4);
      const checkExtension = extension.includes(extensionOriginFile);
      if (checkExtension) {
        cb(null, true);
      } else {
        cb(new Error("Extension file invalid"), false);
      }
    },
  }).single("file");
  return upload;
};

let handleUploadItem = async (req, res) => {
  await itemService.uploadItem(req, res);
};

let handleCreateNewItem = async (req, res) => {
  await itemService.createNewItem(req, res);
};

let handleDeleteItem = async (req, res) => {
  if (!req.body.id)
    return res.status(200).json({
      code: 1,
      message: "Missing required parameters",
    });

  let msg = await itemService.deleteItem(req.body.id);
  return res.status(200).json({
    msg,
  });
};

let handleEditItemInfoById = async (req, res) => {
  if (!req.body.id)
    return res.status(200).json({
      code: 1,
      message: "Missing required parameters",
    });
  let data = req.body;
  let message = await itemService.editItemById(data);
  return res.status(200).json({
    message,
  });
};

let handleGetAllItems = async (req, res) => {
  let items = await itemService.getAllItems();

  return res.status(200).json({
    code: 0,
    message: "OK",
    items: items,
  });
};

let handleGetItemById = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parameters",
    });
  }

  let item = await itemService.getItemById(id);

  if (item) {
    return res.status(200).json({
      code: 0,
      message: "OK",
      item: item,
    });
  } else {
    return res.status(200).json({
      code: 2,
      message: "item with input id not exist",
    });
  }
};

let handleGetItemImageById = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parameters",
    });
  }

  let filePath = await itemService.getItemFilePath(id);
  if (filePath) {
    return res.sendFile(filePath, { root: path.resolve(__dirname, "../..") });
  } else {
    return res.status(200).json({
      code: 2,
      message: "item with input id not exist",
    });
  }
};

module.exports = {
  handleCreateNewItem: handleCreateNewItem,
  handleDeleteItem: handleDeleteItem,
  handleEditItemInfoById: handleEditItemInfoById,
  handleGetAllItems: handleGetAllItems,
  handleGetItemById: handleGetItemById,
  handleUploadItem: handleUploadItem,
  handleGetItemImageById: handleGetItemImageById,
  uploadItem: uploadItem,
};
