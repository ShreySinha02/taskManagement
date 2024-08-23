const express = require("express");
const router = express.Router();
const { handleCreateUser, handleGetUser, handleGetAllUsers } = require("../controllers/user");

// Route to create a user
router.post("/create", handleCreateUser);

// Route to get a user by ID or email
router.get("/get", handleGetUser);

// Route to get all users
router.get("/all", handleGetAllUsers);

module.exports = router;
