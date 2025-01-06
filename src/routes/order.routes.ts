import * as express from "express";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { OrderController } from "../controllers/order.controller";

const Router = express.Router();

// Create a new order (admin only)
Router.post(
  "/",
//   authentification,
//   authorization(["admin"]),
  OrderController.createOrder
);

// Get all orders (admin only)
Router.get(
  "/",
//   authentification,
//   authorization(["admin"]),
  OrderController.getAllOrders
);

// Get a specific order by ID (admin only)
Router.get(
  "/:id",
//   authentification,
//   authorization(["admin"]),
  OrderController.getOrderById
);

// Update a specific order by ID (admin only)
Router.put(
  "/:id",
//   authentification,
//   authorization(["admin"]),
  OrderController.updateOrder
);

// Delete a specific order by ID (admin only)
Router.delete(
  "/:id",
//   authentification,
//   authorization(["admin"]),
  OrderController.deleteOrder
);

export { Router as orderRouter };