import { signupService,loginService } from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const data = await signupService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      ...data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};