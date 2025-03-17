import doctorModel from "../models/doctor.js";
import userModel from "../models/user.js";

const getDoctorInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorInfo = await doctorModel
      .findOne({ userId: id })
      .populate("userId");
    if (!doctorInfo) {
      return res.status(404).json({ message: "doctor not found" });
    }
    res
      .status(200)
      .json({ message: "doctor fatched successfully", data: doctorInfo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "doctor fetched error error", error: error.message });
  }
};

export default getDoctorInfo;
