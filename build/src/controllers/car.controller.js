"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.CarController = void 0;
var multer = require("multer");
var cache = require("memory-cache");
var data_source_1 = require("../data-source");
var Car_1 = require("../entity/Car");
var path = require("path");
var fs = require("fs");
// Set up multer storage and file handling
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var uploadPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, "".concat(Date.now(), "-").concat(file.originalname));
    },
});
var upload = multer({ storage: storage });
exports.upload = upload;
var CarController = /** @class */ (function () {
    function CarController() {
    }
    // Get all cars
    CarController.getCarImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var imageName, imagePath;
            return __generator(this, function (_a) {
                try {
                    imageName = req.params.imageName;
                    console.log(imageName);
                    imagePath = path.join(__dirname, "../uploads", imageName);
                    // Check if the image exists
                    if (!fs.existsSync(imagePath)) {
                        return [2 /*return*/, res.status(404).json({ message: "Image not found" })];
                    }
                    // Serve the image
                    res.sendFile(imagePath);
                }
                catch (error) {
                    console.error("Error fetching car image:", error);
                    return [2 /*return*/, res.status(500).json({ message: "Internal server error", error: error.message })];
                }
                return [2 /*return*/];
            });
        });
    };
    CarController.getAllCars = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, carRepository, cars, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = cache.get("cars");
                        if (!data) return [3 /*break*/, 1];
                        console.log("Serving from cache");
                        return [2 /*return*/, res.status(200).json({ data: data })];
                    case 1:
                        console.log("Serving from db");
                        carRepository = data_source_1.AppDataSource.getRepository(Car_1.Car);
                        return [4 /*yield*/, carRepository.find()];
                    case 2:
                        cars = _a.sent();
                        cache.put("cars", cars, 10000);
                        return [2 /*return*/, res.status(200).json({ data: cars })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error fetching cars:", error_1);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error", error: error_1.message })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Get a single car by ID
    CarController.getCarById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, carRepository, car, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        carRepository = data_source_1.AppDataSource.getRepository(Car_1.Car);
                        return [4 /*yield*/, carRepository.findOneBy({ id: +id })];
                    case 1:
                        car = _a.sent();
                        if (!car) {
                            return [2 /*return*/, res.status(404).json({ message: "Car not found" })];
                        }
                        return [2 /*return*/, res.status(200).json({ data: car })];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error fetching car:", error_2);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error", error: error_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Create a new car with image upload
    CarController.createCar = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, name, seats, price, description, carRepository, existingCar, image, gallery, newCar, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _c = req.body, name = _c.name, seats = _c.seats, price = _c.price, description = _c.description;
                        carRepository = data_source_1.AppDataSource.getRepository(Car_1.Car);
                        return [4 /*yield*/, carRepository.findOne({ where: { name: name } })];
                    case 1:
                        existingCar = _d.sent();
                        if (existingCar) {
                            return [2 /*return*/, res.status(400).json({ message: "Car already exist" })];
                        }
                        image = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.image) ? req.files.image[0].filename : null;
                        gallery = ((_b = req.files) === null || _b === void 0 ? void 0 : _b.gallery) ? req.files.gallery.map(function (file) { return file.filename; }) : [];
                        newCar = carRepository.create({
                            name: name,
                            seats: seats,
                            price: price,
                            image: image,
                            gallery: gallery,
                            description: description
                        });
                        return [4 /*yield*/, carRepository.save(newCar)];
                    case 2:
                        _d.sent();
                        // Clear cache to ensure newly created car is included in future fetches
                        cache.del("cars");
                        return [2 /*return*/, res.status(201).json({ message: "Car created successfully", data: newCar })];
                    case 3:
                        error_3 = _d.sent();
                        console.error("Error creating car:", error_3);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error", error: error_3.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Update a car by ID
    CarController.updateCar = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var id, _c, name, seats, price, description, carRepository, car, uploadsPath_1, oldImagePath, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        _c = req.body, name = _c.name, seats = _c.seats, price = _c.price, description = _c.description;
                        carRepository = data_source_1.AppDataSource.getRepository(Car_1.Car);
                        return [4 /*yield*/, carRepository.findOneBy({ id: +id })];
                    case 1:
                        car = _d.sent();
                        if (!car) {
                            return [2 /*return*/, res.status(404).json({ message: "Car not found" })];
                        }
                        uploadsPath_1 = path.join(__dirname, "../uploads");
                        // Handle the main image update
                        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.image) {
                            // Delete the old image file if it exists
                            if (car.image) {
                                oldImagePath = path.join(uploadsPath_1, car.image);
                                if (fs.existsSync(oldImagePath)) {
                                    fs.unlinkSync(oldImagePath); // Delete the old file
                                }
                            }
                            // Save the new image file
                            car.image = req.files.image[0].filename;
                        }
                        // Handle the gallery update
                        if ((_b = req.files) === null || _b === void 0 ? void 0 : _b.gallery) {
                            // Delete the old gallery files if they exist
                            if (car.gallery && car.gallery.length > 0) {
                                car.gallery.forEach(function (file) {
                                    var oldFilePath = path.join(uploadsPath_1, file);
                                    if (fs.existsSync(oldFilePath)) {
                                        fs.unlinkSync(oldFilePath); // Delete each old file
                                    }
                                });
                            }
                            // Save the new gallery files
                            car.gallery = req.files.gallery.map(function (file) { return file.filename; });
                        }
                        // Update other car fields
                        car.name = name;
                        car.seats = seats;
                        car.price = price;
                        car.description = description;
                        // Save the updated car to the database
                        return [4 /*yield*/, carRepository.save(car)];
                    case 2:
                        // Save the updated car to the database
                        _d.sent();
                        // Clear cache to ensure updated car data is reflected in future fetches
                        cache.del("cars");
                        return [2 /*return*/, res.status(200).json({ message: "Car updated successfully", data: car })];
                    case 3:
                        error_4 = _d.sent();
                        console.error("Error updating car:", error_4);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error", error: error_4.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Delete a car by ID
    CarController.deleteCar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, carRepository, car, uploadsPath_2, imagePath, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        carRepository = data_source_1.AppDataSource.getRepository(Car_1.Car);
                        return [4 /*yield*/, carRepository.findOneBy({ id: +id })];
                    case 1:
                        car = _a.sent();
                        if (!car) {
                            return [2 /*return*/, res.status(404).json({ message: "Car not found" })];
                        }
                        uploadsPath_2 = path.join(__dirname, "../uploads");
                        // Delete the main image file if it exists
                        if (car.image) {
                            imagePath = path.join(uploadsPath_2, car.image);
                            if (fs.existsSync(imagePath)) {
                                fs.unlinkSync(imagePath); // Delete the file
                            }
                        }
                        // Delete the gallery files if they exist
                        if (car.gallery && car.gallery.length > 0) {
                            car.gallery.forEach(function (file) {
                                var filePath = path.join(uploadsPath_2, file);
                                if (fs.existsSync(filePath)) {
                                    fs.unlinkSync(filePath); // Delete each file
                                }
                            });
                        }
                        // Remove the car from the database
                        return [4 /*yield*/, carRepository.remove(car)];
                    case 2:
                        // Remove the car from the database
                        _a.sent();
                        // Clear cache to ensure deleted car is removed from future fetches
                        cache.del("cars");
                        return [2 /*return*/, res.status(200).json({ message: "Car deleted successfully" })];
                    case 3:
                        error_5 = _a.sent();
                        console.error("Error deleting car:", error_5);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error", error: error_5.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CarController;
}());
exports.CarController = CarController;
//# sourceMappingURL=car.controller.js.map