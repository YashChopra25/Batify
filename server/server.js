import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConn from "./config/DBconnect.js";
import V1Router from "./versions/V1.js";
import cookieparser from "cookie-parser";
dotenv.config();
const app = express();
const CorsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
  exposedHeaders: "Authorization",
  methods: ["GET, HEAD, PUT, PATCH, POST, DELETE", "OPTIONS"],
};
console.log(process.env.CLIENT_URL);
app.set("trust proxy", true);
app.use(cors(CorsOptions));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConn();
app.use("/v1", V1Router);
app.listen(5000, "0.0.0.0", () =>
  console.log("Server is running on port 5000")
);
