"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRouter = void 0;
var express = require("express");
var auth_middleware_1 = require("../middleware/auth.middleware");
var movie_controller_1 = require("../controllers/movie.controller");
var authorization_middleware_1 = require("../middleware/authorization.middleware");
var Router = express.Router();
exports.movieRouter = Router;
Router.get("/movies", auth_middleware_1.authentification, movie_controller_1.MovieController.getAllMovies);
Router.post("/movies", auth_middleware_1.authentification, movie_controller_1.MovieController.createMovie);
Router.put("/movies/:id", auth_middleware_1.authentification, (0, authorization_middleware_1.authorization)(["admin"]), movie_controller_1.MovieController.updateMovie);
Router.delete("/movies/:id", auth_middleware_1.authentification, (0, authorization_middleware_1.authorization)(["admin"]), movie_controller_1.MovieController.deleteMovie);
//# sourceMappingURL=movie.routes.js.map