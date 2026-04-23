// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   orderItems: [{
//     product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//     name: String, image: String, price: Number, quantity: Number,
//   }],
//   shippingAddress: {
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true },
//     phone: { type: String, required: true },
//   },
//   paymentMethod: { type: String, default: "Cash on Delivery" },
//   itemsPrice: { type: Number, default: 0 },
//   shippingPrice: { type: Number, default: 0 },
//   totalPrice: { type: Number, default: 0 },
//   isPaid: { type: Boolean, default: false },
//   paidAt: Date,
//   isDelivered: { type: Boolean, default: false },
//   deliveredAt: Date,
//   status: {
//     type: String,
//     enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Processing",
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: String,
        quantity: Number,
        image: String,
        price: Number,
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    shippingAddress: {
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: { type: String, default: "COD" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);