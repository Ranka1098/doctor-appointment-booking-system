import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name required"],
    },
    lastName: {
      type: String,
      required: [true, "last name required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email id is rquired"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is rquired"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is rquired"],
    },
    experince: {
      type: String,
      required: [true, "experince is rquired"],
    },
    feesPerConsultation: {
      type: Number,
      required: [true, "cosultation fees is rquired"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timing: {
      type: Object,
      required: [true, " work timing is required"],
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("Doctor", doctorSchema);

export default doctorModel;
