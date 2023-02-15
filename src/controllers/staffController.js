import staffService from "../services/staffService";

const handleGetAllStaffOrder = async (req, res) => {
  const status = req.query.status;
  if (status == undefined) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parameters",
    });
  }
  let orders = await staffService.getAllStaffOrder(status);

  return res.status(200).json({
    code: 0,
    message: `OK, staff get status = ${status}`,
    order: orders,
  });
};

const handleUpdateStatus = async (req, res) => {
  const id = req.body.id;
  const isSuccessful = req.body.isSuccessful;
  if (!id || isSuccessful == undefined)
    return res.status(200).json({
      code: 1,
      message: "Missing required parameters",
    });

  const order = await staffService.updateStatusOrder(id, isSuccessful);
  return res.status(200).json({
    code: 0,
    message: "Modified successfully",
    order: order,
  });
};

module.exports = {
  handleGetAllStaffOrder: handleGetAllStaffOrder,
  handleUpdateStatus: handleUpdateStatus,
};
