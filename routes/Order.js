const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.getOrders);
router.post("/add", OrderController.AddOrder);

module.exports = router;
