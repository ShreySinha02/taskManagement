const User = require("../models/user");

const handleLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(404).json({ error: "User not registered" });
    }

    // Verify the password (in a real application, compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If login is successful, return user data (excluding password for security)
    const { password: _, ...userWithoutPassword } = user.toObject();
    return res.status(200).json(userWithoutPassword);

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleLoginUser };
