import express, { urlencoded } from "express";
import { config } from "dotenv";
import connectDB from "./src/config/database.config.js";
import router from "./src/routers/index.js";
import cloudinary from "./src/config/cloudinary.config.js";
import session from "express-session";
import passport from "passport";
import "./src/config/passport.config.js";
import { app, server } from "./socket.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import cors from "cors";

config({
  path: "./.env",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // it is used for activate passport middleware
app.use(passport.session()); // it is used for remember the user in express session

app.use("/api/v1", router);
app.use(errorMiddleware);

connectDB();
cloudinary;

app.get("/", (req, res) => {
  res.send("Server is runing");
});

server.listen("8800", () => {
  console.log(
    `server is successfully runing on the port: http://localhost:${port}/`
  );
});
