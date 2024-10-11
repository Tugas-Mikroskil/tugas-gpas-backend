import * as multer from "multer";
import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Car } from "../entity/Car";
import * as path from "path";
import * as fs from "fs";

// Set up multer storage and file handling
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req: any, file: { originalname: any }, cb: (arg0: null, arg1: string) => void) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Extend the Request type to include Multer's file property
interface MulterRequest extends Request {
  file: {
    filename: string;
    path: string;
    mimetype: string;
    size: number;
  };
}

export class CarController {
  // Get all cars
  static async getCarImage(req: Request, res: Response) {
    try {
      const { imageName } = req.params; // Assuming the image name is passed as a URL parameter
      console.log(imageName)
      const imagePath = path.join(__dirname, "../uploads", imageName);
      
      // Check if the image exists
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: "Image not found" });
      }
      
      // Serve the image
      res.sendFile(imagePath);
    } catch (error) {
      console.error("Error fetching car image:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
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

  // Create a new car with image upload
  static async createCar(req: MulterRequest, res: Response) {
    try {
      const { name, seats, price } = req.body;
      const carRepository = AppDataSource.getRepository(Car);

      // Check if a file is uploaded
      const image = req.file ? req.file.filename : null;

      const newCar = carRepository.create({
        name,
        seats,
        price,
        image,
      });
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

export { upload };
