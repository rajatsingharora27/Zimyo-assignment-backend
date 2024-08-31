const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../../models");

class SignupUser {
  userSignUp = async (userObject, reqId) => {
    const errors = this.validateUser(userObject);
    if (errors.length > 0) {
      return { isSuccess: false, errors: errors }; // Throw an error with all validation messages
    } else {
      const hashedPassword = await bcrypt.hash(userObject.password, 10);
      try {
        const response = await Users.create({ ...userObject, password: hashedPassword });
      } catch (e) {
        console.log("Exception occurred ", e.errors[0].message);
        return { isSuccess: false, errors: [e.errors[0].message] };
      }
      return { isSuccess: true, errors: errors };
    }
  };

  validateUser(userObject) {
    const errors = [];
    // Simple validation checks
    if (!userObject.name || typeof userObject.name !== "string" || userObject.name.trim().length === 0) {
      errors.push("Name is required and must be a non-empty string.");
    }
    if (!userObject.email || typeof userObject.email !== "string" || !/^\S+@\S+\.\S+$/.test(userObject.email)) {
      errors.push("A valid email is required.");
    }

    if (!userObject.password || typeof userObject.password !== "string" || userObject.password.length < 6) {
      errors.push("Password is required and must be at least 6 characters long.");
    }
    return errors;
  }
}

module.exports = {
  SignupUser,
};
