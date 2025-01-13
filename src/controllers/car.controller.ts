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

// Extend the Request type to include Multer's file and files properties
interface MulterRequest extends Request {
  file?: Express.Multer.File; // Single file for the main image
  files?: {
    image?: Express.Multer.File[]; // Array of files for the main image (maxCount: 1)
    gallery?: Express.Multer.File[]; // Array of files for the gallery (maxCount: 10)
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
      const car = await carRepository.findOneBy({ id : +id });

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
      const { name, seats, price, description } = req.body;
      
      const carRepository = AppDataSource.getRepository(Car);
      const existingCar = await carRepository.findOne({ where: { name } });
      if (existingCar) {
        return res.status(400).json({ message: "Car already exist" });
      }
      // Handle the main image
      const image = req.files?.image ? req.files.image[0].filename : null;

      // Handle the gallery images
      const gallery = req.files?.gallery ? req.files.gallery.map(file => file.filename) : [];

      const newCar = carRepository.create({
        name,
        seats,
        price,
        image,
        gallery, // Assuming your Car entity has a gallery field to store multiple image filenames
        description
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
  static async updateCar(req: MulterRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, seats, price, description } = req.body;
      const carRepository = AppDataSource.getRepository(Car);

      // Find the car by ID
      const car = await carRepository.findOneBy({ id : +id });
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      // Get the uploads directory path
      const uploadsPath = path.join(__dirname, "../uploads");

      // Handle the main image update
      if (req.files?.image) {
        // Delete the old image file if it exists
        if (car.image) {
          const oldImagePath = path.join(uploadsPath, car.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Delete the old file
          }
        }

        // Save the new image file
        car.image = req.files.image[0].filename;
      }

      // Handle the gallery update
      if (req.files?.gallery) {
        // Delete the old gallery files if they exist
        if (car.gallery && car.gallery.length > 0) {
          car.gallery.forEach((file) => {
            const oldFilePath = path.join(uploadsPath, file);
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath); // Delete each old file
            }
          });
        }

        // Save the new gallery files
        car.gallery = req.files.gallery.map((file) => file.filename);
      }

      // Update other car fields
      car.name = name;
      car.seats = seats;
      car.price = price;
      car.description = description;

      // Save the updated car to the database
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

      // Find the car by ID
      const car = await carRepository.findOneBy({ id : +id });
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      // Get the uploads directory path
      const uploadsPath = path.join(__dirname, "../uploads");

      // Delete the main image file if it exists
      if (car.image) {
        const imagePath = path.join(uploadsPath, car.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the file
        }
      }

      // Delete the gallery files if they exist
      if (car.gallery && car.gallery.length > 0) {
        car.gallery.forEach((file) => {
          const filePath = path.join(uploadsPath, file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete each file
          }
        });
      }

      // Remove the car from the database
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
