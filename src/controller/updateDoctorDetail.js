import doctorModel from "../models/doctor.js";

const updateDoctorDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDoctor = await doctorModel
      .findOneAndUpdate({ userId: id }, req.body, { new: true })
      .populate("userId");

    if (!updatedDoctor) {
      return res.status(404).json({ message: "doctor not found" });
    }
    res
      .status(200)
      .json({ message: "doctor updated successfully", data: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "failed to update", error: error.message });
  }
};
export default updateDoctorDetail;
