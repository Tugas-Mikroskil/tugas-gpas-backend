"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express = require("express");
var order_controller_1 = require("../controllers/order.controller");
var Router = express.Router();
exports.orderRouter = Router;
// Create a new order (admin only)
Router.post("/", 
//   authentification,
//   authorization(["admin"]),
order_controller_1.OrderController.createOrder);
// Get all orders (admin only)
Router.get("/", 
//   authentification,
//   authorization(["admin"]),
order_controller_1.OrderController.getAllOrders);
Router.get("/user/:id", 
//   authentification,
//   authorization(["admin"]),
order_controller_1.OrderController.getOrderByUserId);
// Get a specific order by ID (admin only)
Router.get("/:id", 
//   authentification,
//   authorization(["admin"]),
order_controller_1.OrderController.getOrderById);
// Update a specific order by ID (admin only)
Router.put("/:id", 
//   authentification,
//   authorization(["admin"]),
order_controller_1.OrderController.updateOrder);
// Delete a specific order by ID (admin only)
Router.delete("/:id", 
//   authentification,
//   authorization(["admin"]),
order_controller_1.OrderController.deleteOrder);
//# sourceMappingURL=order.routes.js.map