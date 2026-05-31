import Mentor from "../models/Mentor.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";

const authResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id)
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = "user", expertise = [] } = req.body;
  const existing = await User.findOne({ email });

  if (existing) {
    res.status(400);
    throw new Error("Email is already registered");
  }

  const user = await User.create({ name, email, password, role });

  if (role === "mentor") {
    await Mentor.create({ user: user._id, expertise });
  }

  res.status(201).json(authResponse(user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error("This account is disabled");
  }

  res.json(authResponse(user));
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("skills interests bookmarks");
  res.json(user);
});
