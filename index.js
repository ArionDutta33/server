import express from "express";
const app = express();
import userRoutes from "./routes/user.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);

app.listen(4000, function () {
  console.log("server listening on 4000");
});
