import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { Car } from "../entity/Car";

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
    static async createOrder(req: Request, res: Response) {
        const { firstName, lastName, days, carId, phoneNumber, citizenNumber, address, destination } = req.body;
        const order = new Order();
        const carRepository = AppDataSource.getRepository(Car);
        const car = await carRepository.findOne({ where: { id: carId } });

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        order.firstName = firstName;
        order.lastName = lastName;
        order.days = days;
        order.carId = carId;
        order.phoneNumber = phoneNumber;
        order.citizenNumber = citizenNumber;
        order.address = address;
        order.destination = destination;
        const orderRepository = AppDataSource.getRepository(Order);
        await orderRepository.save(order);
        return res
            .status(200)
            .json({ message: "Order created successfully", order });
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