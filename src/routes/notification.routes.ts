import * as express from "express";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { NotificationController } from "../controllers/notification.controller";

const Router = express.Router();

// Create a new notification (admin only)
Router.post(
  "/",
//   authentification,
//   authorization(["admin"]),
  NotificationController.createNotification
);

// Get all notifications (admin only)
Router.get(
  "/",
//   authentification,
//   authorization(["admin"]),
  NotificationController.getAllNotifications
);

// Get a specific notification by ID (admin only)
Router.get(
  "/:id",
//   authentification,
//   authorization(["admin"]),
  NotificationController.getNotificationById
);

// Update a specific notification by ID (admin only)
Router.put(
  "/:id",
//   authentification,
//   authorization(["admin"]),
  NotificationController.updateNotification
);

// Delete a specific notification by ID (admin only)
Router.delete(
  "/:id",
//   authentification,
//   authorization(["admin"]),
  NotificationController.deleteNotification
);

export { Router as notificationRouter };