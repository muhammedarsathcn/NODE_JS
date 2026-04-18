import mongoose from "mongoose";
const buddySchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    realName: {
      type: String,
      required: true,
    },
    nickName: String,
    dob: Date,
    hobbies: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Buddy", buddySchema);
