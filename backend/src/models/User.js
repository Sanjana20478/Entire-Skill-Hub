import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "mentor", "admin"], default: "user" },
    phone: String,
    location: String,
    bio: String,
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    interests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interest" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusinessIdea" }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function matchPassword(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
