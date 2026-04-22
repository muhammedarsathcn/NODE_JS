import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      default: "USER",
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    hobbies: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    buddies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default:[]
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
