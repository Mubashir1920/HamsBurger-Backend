const mongoose = require("mongoose");

// Billing Schema
const BillingSchema = new mongoose.Schema(
  {
    discountAmount: { type: Number, default: 0 },
    paymentStatus: { type: String, default: "Unpaid" }, // Removed enum
    paymentMethod: { type: String, default: null },
    subtotal: { type: Number },
    taxAmount: { type: Number },
    totalAmount: { type: Number },
  },
  { _id: false }
);

// Takeaway Form Schema
const TakeawayFormSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    pickupTime: String,
    instructions: String,
  },
  { _id: false }
);

// Delivery Form Schema
const DeliveryFormSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    instructions: String,
  },
  { _id: false }
);

// Selected Items Schema (for nested items inside cart items)
const SelectedItemsSchema = new mongoose.Schema(
  {
    type: String,
    name: String,
    quantity: Number,
    totalPrice: String,
    sizes: [String],
    selectedFlavours: [String],
  },
  { _id: false }
);

// Cart Item Schema
const CartItemSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    description: String,
    category: String,
    selectedItems: [SelectedItemsSchema],
  },
  { _id: false }
);

// Main Order Schema
const OrderSchema = new mongoose.Schema({
  // OrderType Can be delivery , takeaway, dinein
  orderType: { type: String, required: true }, // No enum here
  orderId: { type: String, required: true },

  // For Waiter Orders
  empId: { type: String },
  empName: { type: String },
  tableNo: { type: String },
  status: { type: String, default: "pending" }, // Removed enum
  billing: BillingSchema,

  // For Customer Orders
  formData: TakeawayFormSchema || DeliveryFormSchema,
  paymentMethod: { type: String, required: true },
  cart: [CartItemSchema],

  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
