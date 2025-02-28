import userModel from "../models/user.js";

const getAllnotification = async (req, res) => {
  try {
    // 1.user ko get karna hai kyu ki uske under hamari notification hai or seen notification hai
    const user = await userModel.findOne({ _id: req.body.userId });

    // 2.seennotification notification ko user se get karna hai
    const seennotification = user.seennotification;
    const notification = user.notification;
    //  3. seennotification ke under push karenge jitne bhi hamari pass hai notification ko push kara denge
    user.seennotification.push(...notification);
    user.notification = [];
    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "all notification marked as read", data: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to get notification", error: error.message });
  }
};

export default getAllnotification;
