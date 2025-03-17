import doctorModel from "../models/doctor.js";

const getAllDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.find({});
    res.status(200).send({ message: "doctor Data list", data: doctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to fetch the doctors", error: error.message });
  }
};

export default getAllDoctor;
