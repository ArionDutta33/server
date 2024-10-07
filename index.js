import express from "express";
const app = express();
import userRoutes from "./routes/user.js";
import photRoutes from "./routes/photo.js";
import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/photo", photRoutes);
app.listen(4000, function () {
  console.log("server listening on 4000");
});
