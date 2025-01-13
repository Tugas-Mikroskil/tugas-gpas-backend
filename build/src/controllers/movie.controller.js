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
exports.MovieController = void 0;
var cache = require("memory-cache");
var data_source_1 = require("../data-source");
var Movie_1 = require("../entity/Movie");
var MovieController = /** @class */ (function () {
    function MovieController() {
    }
    MovieController.getAllMovies = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, movieRepository, movies;
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
                        movieRepository = data_source_1.AppDataSource.getRepository(Movie_1.Movie);
                        return [4 /*yield*/, movieRepository.find()];
                    case 2:
                        movies = _a.sent();
                        cache.put("data", movies, 10000);
                        return [2 /*return*/, res.status(200).json({
                                data: movies,
                            })];
                }
            });
        });
    };
    MovieController.createMovie = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, description, director, year, rating, image, cast, movie, movieRepository;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, description = _a.description, director = _a.director, year = _a.year, rating = _a.rating, image = _a.image, cast = _a.cast;
                        movie = new Movie_1.Movie();
                        movie.title = title;
                        movie.description = description;
                        movie.director = director;
                        movie.year = year;
                        movie.rating = rating;
                        movie.image = image;
                        movie.cast = cast;
                        movieRepository = data_source_1.AppDataSource.getRepository(Movie_1.Movie);
                        return [4 /*yield*/, movieRepository.save(movie)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: "Movie created successfully", movie: movie })];
                }
            });
        });
    };
    MovieController.updateMovie = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, title, description, director, year, rating, image, cast, movieRepository, movie;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, title = _a.title, description = _a.description, director = _a.director, year = _a.year, rating = _a.rating, image = _a.image, cast = _a.cast;
                        movieRepository = data_source_1.AppDataSource.getRepository(Movie_1.Movie);
                        return [4 /*yield*/, movieRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        movie = _b.sent();
                        movie.title = title;
                        movie.description = description;
                        movie.director = director;
                        movie.year = year;
                        movie.rating = rating;
                        movie.image = image;
                        movie.cast = cast;
                        return [4 /*yield*/, movieRepository.save(movie)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: "Movie updated successfully", movie: movie })];
                }
            });
        });
    };
    MovieController.deleteMovie = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, movieRepository, movie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        movieRepository = data_source_1.AppDataSource.getRepository(Movie_1.Movie);
                        return [4 /*yield*/, movieRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        movie = _a.sent();
                        return [4 /*yield*/, movieRepository.remove(movie)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: "Movie deleted successfully", movie: movie })];
                }
            });
        });
    };
    return MovieController;
}());
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map