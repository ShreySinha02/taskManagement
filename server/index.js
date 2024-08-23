// Import necessary modules
const express = require("express");
require("dotenv").config();
const connectToDb = require("./connect");
const createAdminUser = require("./createAdminUser");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task"); 

const cors = require("cors");

const PORT = 8001;
const url = process.env.MONGO_URI;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and create admin user
connectToDb(url)
  .then(async () => {
    console.log("MongoDB connected");

    // Create admin user
    // await createAdminUser();
    // console.log("Admin user created successfully");
  })
  .catch((err) => {
    console.log("Connection error", err);
  });

// Route handlers
app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
