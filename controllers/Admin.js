import UserModel from "../models/user.js";

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin (you cannot delete an admin)
    if (user.role === "admin") {
      return res.status(409).json({ message: "You cannot delete an admin" });
    }

    // Delete the user using findByIdAndDelete
    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Change user role (promote to admin)
const changeUserRole = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already an admin" });
    }

    // Change the user's role to admin
    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User role changed to admin", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changeUserStatus = async (req, res) => {
  const userId = req.params.id;
  const { status } = req.body; // New status sent in the request

  try {
    const user = await UserModel.findById(userId); // Fetch the user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (status !== "active" && status !== "inactive") {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update the user's status in the database
    user.status = status;
    await user.save();

    res.status(200).json({ message: `User status updated to ${status}`, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
// Add user
const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new UserModel({ name, email, password, role });
    await newUser.save();

    res
      .status(200)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export { getUsers, deleteUser, changeUserRole, changeUserStatus, addUser };
