import doctorModel from "../models/doctor.js";
import userModel from "../models/user.js";

const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const user = await userModel.findById(doctor.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.notification.push({
      type: "doctor-acoount-request-approved",
      message: `Your doctor request has been ${status}`,
      onClickPath: "/notification",
    });

    user.isDoctor = status === "approved";
    await user.save();

    const updatedUser = await userModel.findById(user._id);

    res
      .status(200)
      .json({ message: "account status is updated", data: doctor, user: user });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "failed to update account status",
      error: error.message,
    });
  }
};

export default changeAccountStatus;
