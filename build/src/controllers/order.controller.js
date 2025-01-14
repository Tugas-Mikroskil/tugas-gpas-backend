"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.OrderController = void 0;
var cache = require("memory-cache");
var data_source_1 = require("../data-source");
var Order_1 = require("../entity/Order");
var Car_1 = require("../entity/Car");
var Notification_1 = require("../entity/Notification");
var OrderController = /** @class */ (function () {
    function OrderController() {
    }
    OrderController.getAllOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, orderRepository, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = cache.get("data");
                        if (!data) return [3 /*break*/, 1];
                        console.log("serving from cache");
                        return [2 /*return*/, res.status(200).json({
                                data: data,
                            })];
                    case 1:
                        console.log("serving from db");
                        orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.find()];
                    case 2:
                        orders = _a.sent();
                        cache.put("data", orders, 10000);
                        return [2 /*return*/, res.status(200).json({
                                data: orders,
                            })];
                }
            });
        });
    };
    OrderController.getOrderById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderRepository, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.findOne({
                                where: { id: parseInt(id) },
                            })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            return [2 /*return*/, res.status(404).json({ message: "Order not found" })];
                        }
                        return [2 /*return*/, res.status(200).json({ data: order })];
                }
            });
        });
    };
    OrderController.getOrderByUserId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderRepository, carRepository, orders, ordersWithCarData, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
                        carRepository = data_source_1.AppDataSource.getRepository(Car_1.Car);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, orderRepository.find({
                                where: { userId: id }, // Filter by userId
                            })];
                    case 2:
                        orders = _a.sent();
                        if (orders.length === 0) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ message: "No orders found for this user" })];
                        }
                        return [4 /*yield*/, Promise.all(orders.map(function (order) { return __awaiter(_this, void 0, void 0, function () {
                                var car;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, carRepository
                                                .createQueryBuilder("car")
                                                .where("car.id = :carId", { carId: order.carId }) // Use parameterized query
                                                .getOne()];
                                        case 1:
                                            car = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, order), { carData: car || null })];
                                    }
                                });
                            }); }))];
                    case 3:
                        ordersWithCarData = _a.sent();
                        return [2 /*return*/, res.status(200).json({ data: ordersWithCarData })];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error fetching orders:", error_1);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.createOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, firstName, lastName, days, carId, phoneNumber, citizenNumber, address, destination, order, carRepository, orderRepository, notificationRepository, car, existingNotification, notification, response, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, firstName = _a.firstName, lastName = _a.lastName, days = _a.days, carId = _a.carId, phoneNumber = _a.phoneNumber, citizenNumber = _a.citizenNumber, address = _a.address, destination = _a.destination;
                        // Check for null or missing values
                        if (!userId ||
                            !firstName ||
                            !lastName ||
                            !days ||
                            !carId ||
                            !phoneNumber ||
                            !citizenNumber ||
                            !address ||
                            !destination) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ message: "All fields are required and cannot be null" })];
                        }
                        order = new Order_1.Order();
                        carRepository = data_source_1.AppDataSource.getRepository(Car_1.Car);
                        orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
                        notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, carRepository.findOne({ where: { id: carId } })];
                    case 2:
                        car = _b.sent();
                        if (!car) {
                            return [2 /*return*/, res.status(404).json({ message: "Car not found" })];
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
                        return [4 /*yield*/, orderRepository.save(order)];
                    case 3:
                        // Save the order
                        _b.sent();
                        return [4 /*yield*/, notificationRepository.findOne({
                                where: { userId: userId },
                            })];
                    case 4:
                        existingNotification = _b.sent();
                        if (!!existingNotification) return [3 /*break*/, 6];
                        notification = new Notification_1.Notification();
                        notification.userId = userId;
                        notification.fcm_token = ""; // Set a default or empty FCM token
                        return [4 /*yield*/, notificationRepository.save(notification)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        response = {
                            message: "Order created successfully",
                            order: __assign(__assign({}, order), { carData: car }),
                        };
                        return [2 /*return*/, res.status(200).json(response)];
                    case 7:
                        error_2 = _b.sent();
                        console.error("Error saving order or notification:", error_2);
                        // Handle specific database errors
                        if (error_2.code === "23505") {
                            // Unique constraint violation
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ message: "Duplicate order or notification detected" })];
                        }
                        if (error_2.code === "23503") {
                            // Foreign key violation
                            return [2 /*return*/, res.status(400).json({ message: "Invalid carId or userId" })];
                        }
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.updateOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, firstName, lastName, days, carId, phoneNumber, citizenNumber, address, destination, orderRepository, order;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, firstName = _a.firstName, lastName = _a.lastName, days = _a.days, carId = _a.carId, phoneNumber = _a.phoneNumber, citizenNumber = _a.citizenNumber, address = _a.address, destination = _a.destination;
                        orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.findOne({
                                where: { id: parseInt(id) },
                            })];
                    case 1:
                        order = _b.sent();
                        if (!order) {
                            return [2 /*return*/, res.status(404).json({ message: "Order not found" })];
                        }
                        order.firstName = firstName;
                        order.lastName = lastName;
                        order.days = days;
                        order.carId = carId;
                        order.phoneNumber = phoneNumber;
                        order.citizenNumber = citizenNumber;
                        order.address = address;
                        order.destination = destination;
                        return [4 /*yield*/, orderRepository.save(order)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: "Order updated successfully", order: order })];
                }
            });
        });
    };
    OrderController.deleteOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderRepository, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.findOne({
                                where: { id: parseInt(id) },
                            })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            return [2 /*return*/, res.status(404).json({ message: "Order not found" })];
                        }
                        return [4 /*yield*/, orderRepository.remove(order)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: "Order deleted successfully", order: order })];
                }
            });
        });
    };
    return OrderController;
}());
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map