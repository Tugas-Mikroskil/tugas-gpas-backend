import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Car } from "../entity/Car";

export class CarController {
  // Get all cars
  static async getAllCars(req: Request, res: Response) {
    try {
      const data = cache.get("cars");
      if (data) {
        console.log("Serving from cache");
        return res.status(200).json({ data });
      } else {
        console.log("Serving from db");
        const carRepository = AppDataSource.getRepository(Car);
        const cars = await carRepository.find();
        cache.put("cars", cars, 10000);
        return res.status(200).json({ data: cars });
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  // Get a single car by ID
  static async getCarById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const carRepository = AppDataSource.getRepository(Car);
      const car = await carRepository.findOneBy({ id });

      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      return res.status(200).json({ data: car });
    } catch (error) {
      console.error("Error fetching car:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  // Create a new car
  static async createCar(req: Request, res: Response) {
    try {
      const { name, seats, price } = req.body;
      const carRepository = AppDataSource.getRepository(Car);

      const newCar = carRepository.create({ name, seats, price });
      await carRepository.save(newCar);

      // Clear cache to ensure newly created car is included in future fetches
      cache.del("cars");

      return res.status(201).json({ message: "Car created successfully", data: newCar });
    } catch (error) {
      console.error("Error creating car:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  // Update a car by ID
  static async updateCar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, seats, price } = req.body;
      const carRepository = AppDataSource.getRepository(Car);

      const car = await carRepository.findOneBy({ id });
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      car.name = name;
      car.seats = seats;
      car.price = price;

      await carRepository.save(car);

      // Clear cache to ensure updated car data is reflected in future fetches
      cache.del("cars");

      return res.status(200).json({ message: "Car updated successfully", data: car });
    } catch (error) {
      console.error("Error updating car:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  // Delete a car by ID
  static async deleteCar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const carRepository = AppDataSource.getRepository(Car);

      const car = await carRepository.findOneBy({ id });
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      await carRepository.remove(car);

      // Clear cache to ensure deleted car is removed from future fetches
      cache.del("cars");

      return res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
      console.error("Error deleting car:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
}
