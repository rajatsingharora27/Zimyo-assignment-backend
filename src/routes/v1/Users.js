const express = require("express");
const router = express.Router();
// const { Users } = require("../../models");
const { SignupUser } = require("../../service/UserService/SignupUser");

// Sample GET route
// router.get("/", (req, res) => {
//   res.send("Hello world!");
// });

// Corrected POST route for creating a new user
router.post("/sign-up", async (req, res) => {
  const userObject = req.body;
  const signUpUserDetails = new SignupUser();

  try {
    // Create an instance of the Users model
    const response = await signUpUserDetails.userSignUp(userObject);
    if (response.isSuccess) {
      res.status(201).json({ message: "User Created Sussessfully", error: [] }); // Respond with the created user object
    }
    res.status(403).json({ message: "Error creating user ", error: response.errors });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to create user" }); // Error handling
  }
});

module.exports = router;
