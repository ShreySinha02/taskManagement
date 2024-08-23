const User = require("../models/user");

// Create a new user
const handleCreateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password, // In a real application, hash the password before saving
      role,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a user by ID or email
const handleGetUser = async (req, res) => {
  try {
    const { id, email } = req.query;

    // Check if either an ID or email is provided
    if (!id && !email) {
      return res.status(400).json({ error: "ID or email is required to fetch user" });
    }

    // Query based on provided ID or email
    let user;
    if (id) {
      user = await User.findById(id);
    } else if (email) {
      user = await User.findOne({ email });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all users
const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleCreateUser, handleGetUser, handleGetAllUsers };
