import userModel from "../models/user.js";

const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).send({ message: "user Data list", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to fetch the users", error: error.message });
  }
};

export default getAllUser;
