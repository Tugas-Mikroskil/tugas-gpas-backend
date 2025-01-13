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
exports.NotificationController = void 0;
var data_source_1 = require("../data-source");
var Notification_1 = require("../entity/Notification");
exports.NotificationController = {
    // Create a new notification
    createNotification: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, fcm_token, notificationRepository, notification, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, fcm_token = _a.fcm_token;
                        if (!userId || !fcm_token) {
                            return [2 /*return*/, res.status(400).json({ message: "userId and fcm_token are required" })];
                        }
                        notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        notification = new Notification_1.Notification();
                        notification.userId = userId;
                        notification.fcm_token = fcm_token;
                        return [4 /*yield*/, notificationRepository.save(notification)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json({ message: "Notification created successfully", notification: notification })];
                    case 3:
                        error_1 = _b.sent();
                        console.error("Error creating notification:", error_1);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    // Get all notifications
    getAllNotifications: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationRepository, notifications, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, notificationRepository.find()];
                    case 2:
                        notifications = _a.sent();
                        if (notifications.length === 0) {
                            return [2 /*return*/, res.status(404).json({ message: "No notifications found" })];
                        }
                        return [2 /*return*/, res.status(200).json({ data: notifications })];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error fetching notifications:", error_2);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    // Get a specific notification by ID
    getNotificationById: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, notificationRepository, notification, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ message: "Notification ID is required" })];
                        }
                        notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, notificationRepository.findOne({
                                where: { id: parseInt(id) },
                            })];
                    case 2:
                        notification = _a.sent();
                        if (!notification) {
                            return [2 /*return*/, res.status(404).json({ message: "Notification not found" })];
                        }
                        return [2 /*return*/, res.status(200).json({ data: notification })];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error fetching notification:", error_3);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    // Update a specific notification by ID
    updateNotification: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, userId, fcm_token, notificationRepository, notification, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, userId = _a.userId, fcm_token = _a.fcm_token;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ message: "Notification ID is required" })];
                        }
                        notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, notificationRepository.findOne({
                                where: { id: parseInt(id) },
                            })];
                    case 2:
                        notification = _b.sent();
                        if (!notification) {
                            return [2 /*return*/, res.status(404).json({ message: "Notification not found" })];
                        }
                        // Update fields if provided
                        if (userId)
                            notification.userId = userId;
                        if (fcm_token)
                            notification.fcm_token = fcm_token;
                        return [4 /*yield*/, notificationRepository.save(notification)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ message: "Notification updated successfully", notification: notification })];
                    case 4:
                        error_4 = _b.sent();
                        console.error("Error updating notification:", error_4);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    // Delete a specific notification by ID
    deleteNotification: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, notificationRepository, notification, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ message: "Notification ID is required" })];
                        }
                        notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, notificationRepository.findOne({
                                where: { id: parseInt(id) },
                            })];
                    case 2:
                        notification = _a.sent();
                        if (!notification) {
                            return [2 /*return*/, res.status(404).json({ message: "Notification not found" })];
                        }
                        return [4 /*yield*/, notificationRepository.remove(notification)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: "Notification deleted successfully" })];
                    case 4:
                        error_5 = _a.sent();
                        console.error("Error deleting notification:", error_5);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
};
//# sourceMappingURL=notification.controller.js.map