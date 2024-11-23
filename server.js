import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import DbCon from "./utlis/db.js"; // Ensure that the path is correct
import AuthRoutes from "./routes/Auth.js";
import AdminRoutes from "./routes/AdminRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// MongoDB connection
DbCon();

// Middleware setup
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: "role-base-frontend-c6xngrlcv-vipinmishra0852s-projects.vercel.app", // Adjust the front-end URL accordingly
  })
);

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);

app.get("/", (req, res) => {
  res.send("Test route");
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
