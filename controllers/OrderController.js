const Order = require("../models/Order");

module.exports = {
  // Get all orders
  getOrders: async (req, res) => {
    res.send("All Orders Fetched Successfully!");
  },

  // Add a new order
  AddOrder: async (req, res) => {
    const data = req.body;

    const newOrder = {
      orderType: data.orderType,
      orderId: data.orderId,
      formData: data.formData,
      paymentMethod: data.paymentMethod,
      cart: data.cart,
    };

    if (data.orderType === "dinein") {
      newOrder.empId = data.empId;
      newOrder.empName = data.empName;
      newOrder.tableNo = data.tableNo;
      newOrder.status = data.formdata.status;
      newOrder.billing = data.billing;
    }

    console.log(newOrder);

    res.status(200).json({
      message: "Order Placed Successfully!",
      data,
    });
  },
};
