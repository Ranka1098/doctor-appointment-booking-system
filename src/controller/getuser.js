import userModel from "../models/user.js";

const getuser = async (req, res) => {
  try {
    // user ka id lo
    const { userId } = req.body;
    console.log("userId", userId);

    // check user id existe or not
    if (!userId) {
      return res.status(401).json({ message: "user id is require" });
    }
    // check user id in database
    const user = await userModel.findById(userId);
    // user not found
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    // success responce message
    res.status(200).json({
      message: "user found",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "failed to fetch user", error: error.message });
  }
};

export default getuser;
