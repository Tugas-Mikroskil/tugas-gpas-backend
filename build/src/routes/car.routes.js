"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
var express = require("express");
var car_controller_1 = require("../controllers/car.controller");
var Router = express.Router();
exports.carRouter = Router;
// Create a new car (admin only), with image upload
Router.post("/", 
// authentification,
// authorization(["admin"]),
car_controller_1.upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 }, // For multiple gallery images
]), car_controller_1.CarController.createCar);
// Get all cars (admin and user)
Router.get("/", 
// authentification,
// authorization(["admin", "user"]),
car_controller_1.CarController.getAllCars);
// Get a specific car by ID (admin and user)
Router.get("/image/:imageName", 
// authentification, 
// authorization(["admin", "user"]), 
car_controller_1.CarController.getCarImage);
Router.get("/:id", 
// authentification, 
// authorization(["admin", "user"]), 
car_controller_1.CarController.getCarById);
// Update a specific car by ID (admin only)
Router.put("/:id", 
// authentification, 
// authorization(["admin"]), 
car_controller_1.upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 }, // For multiple gallery images
]), car_controller_1.CarController.updateCar);
// Delete a specific car by ID (admin only)
Router.delete("/:id", 
// authentification, 
// authorization(["admin"]), 
car_controller_1.CarController.deleteCar);
//# sourceMappingURL=car.routes.js.map