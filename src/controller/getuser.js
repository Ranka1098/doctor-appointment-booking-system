import userModel from "../models/user.js";
const getuser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    } else {
      res.status(200).json({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "failed to fetch user", error: error.message });
  }
};
export default getuser;
