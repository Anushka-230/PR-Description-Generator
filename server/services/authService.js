import User from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";

export const signupService = async ({ name, email, password }) => {
  // Validation
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (password.length < 6) {
    throw  new ApiError(400, "Password must be at least 6 characters");
}

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT
   const token =generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const loginService= async ({email,password})=>{
    //validation of input
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw new ApiError(401, "Invalid email or password");
    }

    //find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    //password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token =generateToken(user._id);

    return {
        token,
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        },
    };
}