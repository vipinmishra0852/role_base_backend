import express from "express";
import { CheckUser, Login, Logout, register } from "../controllers/Auth.js";
import { IsUser } from "../middleware/verifyToken.js"; // Assuming `IsUser` middleware is used to verify the user is logged in

const AuthRoutes = express.Router();

// User registration route
AuthRoutes.post("/register", register);

// User login route
AuthRoutes.post("/login", Login);

// User logout route
AuthRoutes.post("/logout", Logout);

// Check user data route (requires the user to be authenticated via token)
AuthRoutes.get("/CheckUser", IsUser, CheckUser);

export default AuthRoutes;
