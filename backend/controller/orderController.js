import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";

// 1. Create new order
export const createNewOrder = handleAsyncError(async (req, resizeBy, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  resizeBy.status(201).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});

// 2. Getting Single Order
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new HandleError("No order found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    order,
  });
});

// 3. Users Accessing Their Orders
export const allMyOrders = handleAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user._id });
  if (!orders) {
    return next(new HandleError("No order found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    orders,
  });
});

// 4. Admin - Getting all orders
export const getAllOrders = handleAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find();
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));
  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    orders,
    totalAmount,
  });
});

// 5. Update order status
export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return next(new HandleError("No order found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new HandleError("This order has already been delivered", 400));
  }
  await Promise.all(
    order.orderItems.map((item) => updateQuantity(item.product, item.quantity))
  );
  order.orderStatus = req.body.status;
  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});

async function updateQuantity(id, quantity) {
  const product = await ProductModel.findById(id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// 6. Delete Order
export const deleteOrder = handleAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return next(new HandleError("No order found", 404));
  }
  if (order.orderStatus !== "Delivered") {
    return next(
      new HandleError(
        "Can't be deleted, Because order has not yet been delivered",
        400
      )
    );
  }

  await OrderModel.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
