import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User";
import { Car } from "./entity/Car";
import { Order } from "./entity/Order";
import { Notification } from "./entity/Notification";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "mysql", // Change from "postgres" to "mysql"
  host: DB_HOST,
  port: parseInt(DB_PORT || "3306"), // Default MySQL port is 3306
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: NODE_ENV === "dev" ? true : false,
  logging: NODE_ENV === "dev" ? true : false,
  entities: [User, Car, Order, Notification],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});