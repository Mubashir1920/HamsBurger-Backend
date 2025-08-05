const express = require("express");
const router = express.Router();
const auth = require("../utils/Auth");

const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.getOrders);
router.get("/getEmpOrder", OrderController.getOrderByEmpId);
router.post("/add", OrderController.AddOrder);

module.exports = router;
