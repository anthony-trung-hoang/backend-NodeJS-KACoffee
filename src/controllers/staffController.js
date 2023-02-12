import staffService from "../services/staffService";

const handleGetAllStaffOrder = async (req, res) => {
  const orders = await staffService.getAllStaffOrder();

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
  
    const order = await staffService.updateStatusOrder(id)
    return res.status(200).json({
      code: 0,
      message:"Update successfully",
      order: order
    })
};


module.exports = {
  handleGetAllStaffOrder: handleGetAllStaffOrder,
  handleUpdateStatus: handleUpdateStatus
};
