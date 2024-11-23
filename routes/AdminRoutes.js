import express from "express";
import {
  getUsers,
  deleteUser,
  changeUserRole,
  changeUserStatus,
  addUser, // Import the addUser function
} from "../controllers/Admin.js";
import { isAdmin } from "../middleware/verifyToken.js";

const AdminRoutes = express.Router();

// Get all users
AdminRoutes.get("/getuser", isAdmin, getUsers);

// Delete a user
AdminRoutes.delete("/delet/:id", isAdmin, deleteUser);

// Change user's role to admin
AdminRoutes.put("/changeRole/:id", isAdmin, changeUserRole);

// Change user's status (active/inactive)
AdminRoutes.put("/changeStatus/:id", isAdmin, changeUserStatus);

// Add a new user
AdminRoutes.post("/addUser", isAdmin, addUser); // New route for adding users

export default AdminRoutes;
