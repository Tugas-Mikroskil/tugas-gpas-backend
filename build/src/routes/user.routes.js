"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express = require("express");
var auth_middleware_1 = require("../middleware/auth.middleware");
var authorization_middleware_1 = require("../middleware/authorization.middleware");
var user_controller_1 = require("../controllers/user.controller");
var auth_controller_1 = require("../controllers/auth.controller");
var Router = express.Router();
exports.userRouter = Router;
Router.get("/users", auth_middleware_1.authentification, (0, authorization_middleware_1.authorization)(["admin"]), user_controller_1.UserController.getUsers);
Router.get("/profile", auth_middleware_1.authentification, (0, authorization_middleware_1.authorization)(["user", "admin"]), auth_controller_1.AuthController.getProfile);
Router.post("/signup", user_controller_1.UserController.signup);
Router.post("/login", auth_controller_1.AuthController.login);
Router.put("/update/:id", auth_middleware_1.authentification, (0, authorization_middleware_1.authorization)(["user", "admin"]), user_controller_1.UserController.updateUser);
Router.delete("/delete/:id", auth_middleware_1.authentification, (0, authorization_middleware_1.authorization)(["admin"]), user_controller_1.UserController.deleteUser);
//# sourceMappingURL=user.routes.js.map