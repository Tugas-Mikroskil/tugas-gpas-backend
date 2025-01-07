import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Notification } from "../entity/Notification";

export const NotificationController = {
  // Create a new notification
  async createNotification(req: Request, res: Response) {
    const { userId, fcm_token } = req.body;

    if (!userId || !fcm_token) {
      return res.status(400).json({ message: "userId and fcm_token are required" });
    }

    const notificationRepository = AppDataSource.getRepository(Notification);

    try {
      const notification = new Notification();
      notification.userId = userId;
      notification.fcm_token = fcm_token;

      await notificationRepository.save(notification);

      return res.status(201).json({ message: "Notification created successfully", notification });
    } catch (error) {
      console.error("Error creating notification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get all notifications
  async getAllNotifications(req: Request, res: Response) {
    const notificationRepository = AppDataSource.getRepository(Notification);

    try {
      const notifications = await notificationRepository.find();

      if (notifications.length === 0) {
        return res.status(404).json({ message: "No notifications found" });
      }

      return res.status(200).json({ data: notifications });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get a specific notification by ID
  async getNotificationById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Notification ID is required" });
    }

    const notificationRepository = AppDataSource.getRepository(Notification);

    try {
      const notification = await notificationRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      return res.status(200).json({ data: notification });
    } catch (error) {
      console.error("Error fetching notification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update a specific notification by ID
  async updateNotification(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, fcm_token } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Notification ID is required" });
    }

    const notificationRepository = AppDataSource.getRepository(Notification);

    try {
      const notification = await notificationRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      // Update fields if provided
      if (userId) notification.userId = userId;
      if (fcm_token) notification.fcm_token = fcm_token;

      await notificationRepository.save(notification);

      return res.status(200).json({ message: "Notification updated successfully", notification });
    } catch (error) {
      console.error("Error updating notification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Delete a specific notification by ID
  async deleteNotification(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Notification ID is required" });
    }

    const notificationRepository = AppDataSource.getRepository(Notification);

    try {
      const notification = await notificationRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      await notificationRepository.remove(notification);

      return res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};