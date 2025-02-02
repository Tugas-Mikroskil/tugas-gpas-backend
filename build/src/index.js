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
var data_source_1 = require("./data-source");
var express = require("express");
var dotenv = require("dotenv");
var morgan = require("morgan");
require("reflect-metadata");
var user_routes_1 = require("./routes/user.routes");
var movie_routes_1 = require("./routes/movie.routes");
var car_routes_1 = require("./routes/car.routes");
var order_routes_1 = require("./routes/order.routes");
var error_middleware_1 = require("./middleware/error.middleware");
var notification_routes_1 = require("./routes/notification.routes");
var cors = require("cors"); // Import the cors package
dotenv.config();
var app = express();
// Use morgan for logging
app.use(morgan("combined"));
// Enable CORS
app.use(cors());
app.use(express.json());
app.use(error_middleware_1.errorHandler);
var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;
app.use("/auth", user_routes_1.userRouter);
app.use("/api", movie_routes_1.movieRouter);
app.use("/car", car_routes_1.carRouter);
app.use("/order", order_routes_1.orderRouter);
app.use("/notification", notification_routes_1.notificationRouter);
app.get("*", function (req, res) {
    res.status(505).json({ message: "Bad Request" });
});
data_source_1.AppDataSource.initialize()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        app.listen(PORT, function () {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
        return [2 /*return*/];
    });
}); })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map