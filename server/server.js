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
import { dev_frontend_url, port, prod_frontend_url } from "./src/env/envImportFile.js";

config({
  path: "./.env",
});

const allowedOrigins = [
  dev_frontend_url,
  prod_frontend_url
];

app.use(cors({
  origin: function (origin, callback) {
    // console.log("Origin:", origin); 

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

server.listen(port, () => {
  console.log(
    `server is successfully runing on the port: http://localhost:${port}/`
  );
});
