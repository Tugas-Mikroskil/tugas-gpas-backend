"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dotenv = require("dotenv");
var User_1 = require("./entity/User");
var Car_1 = require("./entity/Car");
var Order_1 = require("./entity/Order");
var Notification_1 = require("./entity/Notification");
dotenv.config();
var _a = process.env, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT, DB_USERNAME = _a.DB_USERNAME, DB_PASSWORD = _a.DB_PASSWORD, DB_DATABASE = _a.DB_DATABASE, NODE_ENV = _a.NODE_ENV;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: DB_HOST,
    port: parseInt(DB_PORT || "3306"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: NODE_ENV === "dev" ? true : false,
    logging: NODE_ENV === "dev" ? true : false,
    entities: [User_1.User, Car_1.Car, Order_1.Order, Notification_1.Notification],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map