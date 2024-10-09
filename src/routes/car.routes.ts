import * as express from "express";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { CarController } from "../controllers/car.controller";

const Router = express.Router();

// Create a new car (admin only)
Router.post("/", authentification, authorization(["admin"]), CarController.createCar);

// Get all cars (admin only)
Router.get("/", authentification, authorization(["admin","user"]), CarController.getAllCars);

// Get a specific car by ID (admin only)
Router.get("/:id", authentification, authorization(["admin","user"]), CarController.getCarById);

// Update a specific car by ID (admin only)
Router.put("/:id", authentification, authorization(["admin"]), CarController.updateCar);

// Delete a specific car by ID (admin only)
Router.delete("/:id", authentification, authorization(["admin"]), CarController.deleteCar);

export { Router as carRouter };
