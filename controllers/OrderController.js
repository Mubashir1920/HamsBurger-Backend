const Order = require("../models/Order");

module.exports = {
  // Get all orders
  getOrders: async (req, res) => {
    const allOrders = (await Order.find()) || [];

    res.status(200).json({
      orders: allOrders,
      message: "Orders Fetched Successfully",
    });
  },

  getOrderByEmpId: async (req, res) => {
    const id = req.body.empId;
    const token = req.header("Authorization")[1].token;
    const isMatch = jwt.verify(token, process.env.JWT_SECRET);
    if (!isMatch) {
      return res.status(402).json({ message: "Unauthorized! Access Denied" });
    }

    next();

    const Orders = await Order.find({ empId: id });

    if (Orders.length === 0) {
      return res.status(204).json({ message: "No Orders Found" });
    }

    return res
      .status(200)
      .json({ orders: Orders, message: "Orders Fetched Successfully" });
  },

  // Add a new order
  AddOrder: async (req, res) => {
    const data = req.body;

    try {
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
        newOrder.status = data.status;
        newOrder.billing = data.billing;
      }

      const order = new Order(newOrder);
      const savedOrder = await order.save();
      console.log("Order Saved");

      res.status(201).json({
        message: "Order Placed Successfully!",
        data: savedOrder,
      });
    } catch (error) {
      console.log("This Error Occured", error);
      res.status(500).json({
        message: "Failed to place order. Please try again later.",
        error: error.message,
      });
    }
  },
};
