import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // Get the token from cookies (ensure the token is being sent by the client)
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token using the secret stored in the environment
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from the database
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: User is not an admin" });
    }

    // Attach the user to the request object for further use
    req.user = user;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to check if the user is valid (not necessarily admin)
const IsUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token using the secret stored in the environment
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user data to the request object
    req.user = user;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error in IsUser middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { isAdmin, IsUser };
