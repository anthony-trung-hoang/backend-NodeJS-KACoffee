import staffService from "../services/staffService";

const handleGetAllStaffOrderPending = async (req, res) => {
  let orders = await staffService.getAllStaffOrderPending();

  return res.status(200).json({
    code: 0,
    message: "OK",
    order: orders,
  });
};

const handleGetAllStaffOrderSuccessful = async (req, res) => {
  let orders = await staffService.getAllStaffOrderSuccessful();
  
  return res.status(200).json({
    code: 0,
    message: "OK",
    order: orders,
  });
};

const handleGetAllStaffOrderCancel = async (req, res) => {
  let orders = await staffService.getAllStaffOrderCancel();
  
  return res.status(200).json({
    code: 0,
    message: "OK",
    order: orders,
  });
};

const handleUpdateStatus = async (req, res) => {
  const id = req.body.id;
  console.log(`id: ${id}`);
  if (!id)
    return res.status(200).json({
      code: 1,
      message: "Missing required parameters",
    });

  const order = await staffService.updateStatusOrder(id);
  return res.status(200).json({
    code: 0,
    message: "Update successfully",
    order: order,
  });
};

module.exports = {
  handleGetAllStaffOrderPending: handleGetAllStaffOrderPending,
  handleGetAllStaffOrderSuccessful: handleGetAllStaffOrderSuccessful,
  handleGetAllStaffOrderCancel: handleGetAllStaffOrderCancel,
  handleUpdateStatus: handleUpdateStatus,
};
