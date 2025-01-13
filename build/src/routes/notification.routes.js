"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
var express = require("express");
var notification_controller_1 = require("../controllers/notification.controller");
var Router = express.Router();
exports.notificationRouter = Router;
// Create a new notification (admin only)
Router.post("/", 
//   authentification,
//   authorization(["admin"]),
notification_controller_1.NotificationController.createNotification);
// Get all notifications (admin only)
Router.get("/", 
//   authentification,
//   authorization(["admin"]),
notification_controller_1.NotificationController.getAllNotifications);
// Get a specific notification by ID (admin only)
Router.get("/:id", 
//   authentification,
//   authorization(["admin"]),
notification_controller_1.NotificationController.getNotificationById);
// Update a specific notification by ID (admin only)
Router.put("/:id", 
//   authentification,
//   authorization(["admin"]),
notification_controller_1.NotificationController.updateNotification);
// Delete a specific notification by ID (admin only)
Router.delete("/:id", 
//   authentification,
//   authorization(["admin"]),
notification_controller_1.NotificationController.deleteNotification);
//# sourceMappingURL=notification.routes.js.map