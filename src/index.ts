import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import * as morgan from "morgan";
import "reflect-metadata";
import { userRouter } from "./routes/user.routes";
import { movieRouter } from "./routes/movie.routes";
import { carRouter } from "./routes/car.routes";
import { orderRouter } from "./routes/order.routes";
import { errorHandler } from "./middleware/error.middleware";
import { notificationRouter } from "./routes/notification.routes";
import * as cors from "cors"; // Import the cors package

dotenv.config();

const app = express();

// Use morgan for logging
app.use(morgan("combined"));

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.use("/auth", userRouter);
app.use("/api", movieRouter);
app.use("/car", carRouter);
app.use("/order", orderRouter);
app.use("/notification", notificationRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));