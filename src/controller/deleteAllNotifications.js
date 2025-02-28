import userModel from "../models/user.js";

const deleteAllNotifications = async (req, res) => {
  try {
    // isme hum notification or seennotication ke array ko empty kar denge

    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    user.notification = [];
    user.seennotification = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res
      .status(200)
      .json({ message: "delete all notification", data: updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "unable to delete all notifications",
      error: error.message,
    });
  }
};

export default deleteAllNotifications;
