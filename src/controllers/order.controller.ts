import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { Car } from "../entity/Car";
import { Notification } from "../entity/Notification";

export class OrderController {
    static async getAllOrders(req: Request, res: Response) {
        const data = cache.get("data");
        if (data) {
            console.log("serving from cache");
            return res.status(200).json({
                data,
            });
        } else {
            console.log("serving from db");
            const orderRepository = AppDataSource.getRepository(Order);
            const orders = await orderRepository.find();
            cache.put("data", orders, 10000);
            return res.status(200).json({
                data: orders,
            });
        }
    }
    static async getOrderById(req: Request, res: Response) {
        const { id } = req.params;
        const orderRepository = AppDataSource.getRepository(Order);
        const order = await orderRepository.findOne({
            where: { id: parseInt(id) },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ data: order });
    }
    static async getOrderByUserId(req: Request, res: Response) {
        const { id } = req.params; // Extract userId from the request parameters
        const orderRepository = AppDataSource.getRepository(Order);
        const carRepository = AppDataSource.getRepository(Car);

        try {
            // Find orders where the userId matches
            const orders = await orderRepository.find({
                where: { userId: (id) }, // Filter by userId
            });

            if (orders.length === 0) {
                return res.status(404).json({ message: "No orders found for this user" });
            }

            // Fetch car data for each order
            const ordersWithCarData = await Promise.all(
                orders.map(async (order) => {
                    const car = await carRepository
                        .createQueryBuilder("car")
                        .where("car.id = :carId", { carId: order.carId }) // Use parameterized query
                        .getOne();

                    return {
                        ...order, // Include all order fields
                        carData: car || null, // Include carData (or null if car not found)
                    };
                })
            );

            return res.status(200).json({ data: ordersWithCarData });
        } catch (error) {
            console.error("Error fetching orders:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async createOrder(req: Request, res: Response) {
        const { userId, firstName, lastName, days, carId, phoneNumber, citizenNumber, address, destination } = req.body;
    
        // Check for null or missing values
        if (!userId || !firstName || !lastName || !days || !carId || !phoneNumber || !citizenNumber || !address || !destination) {
            return res.status(400).json({ message: "All fields are required and cannot be null" });
        }
    
        const order = new Order();
        const carRepository = AppDataSource.getRepository(Car);
        const orderRepository = AppDataSource.getRepository(Order);
        const notificationRepository = AppDataSource.getRepository(Notification);
    
        try {
            // Find the car by carId
            const car = await carRepository.findOne({ where: { id: carId } });
    
            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            }
    
            // Assign values to the order
            order.userId = userId;
            order.firstName = firstName;
            order.lastName = lastName;
            order.days = days;
            order.carId = carId;
            order.phoneNumber = phoneNumber;
            order.citizenNumber = citizenNumber;
            order.address = address;
            order.destination = destination;
    
            // Save the order
            await orderRepository.save(order);
    
            // Check if the userId exists in the Notification table
            const existingNotification = await notificationRepository.findOne({
                where: { userId },
            });
    
            // If the userId does not exist in the Notification table, add it
            if (!existingNotification) {
                const notification = new Notification();
                notification.userId = userId;
                notification.fcm_token = ""; // Set a default or empty FCM token
                await notificationRepository.save(notification);
            }
    
            // Include car data in the response
            const response = {
                message: "Order created successfully",
                order: {
                    ...order,
                    carData: car, // Include car data for context
                },
            };
    
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error saving order or notification:", error);
    
            // Handle specific database errors
            if (error.code === "23505") { // Unique constraint violation
                return res.status(400).json({ message: "Duplicate order or notification detected" });
            }
    
            if (error.code === "23503") { // Foreign key violation
                return res.status(400).json({ message: "Invalid carId or userId" });
            }
    
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateOrder(req: Request, res: Response) {
        const { id } = req.params;
        const { firstName, lastName, days, carId, phoneNumber, citizenNumber, address, destination } = req.body;
        const orderRepository = AppDataSource.getRepository(Order);
        const order = await orderRepository.findOne({
            where: { id: parseInt(id) },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.firstName = firstName;
        order.lastName = lastName;
        order.days = days;
        order.carId = carId;
        order.phoneNumber = phoneNumber;
        order.citizenNumber = citizenNumber;
        order.address = address;
        order.destination = destination;
        await orderRepository.save(order);
        return res
            .status(200)
            .json({ message: "Order updated successfully", order });
    }

    static async deleteOrder(req: Request, res: Response) {
        const { id } = req.params;
        const orderRepository = AppDataSource.getRepository(Order);
        const order = await orderRepository.findOne({
            where: { id: parseInt(id) },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await orderRepository.remove(order);
        return res
            .status(200)
            .json({ message: "Order deleted successfully", order });
    }
}