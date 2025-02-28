import doctorModel from "../models/doctor.js";
import userModel from "../models/user.js";

const applyDoctor = async (req, res) => {
  // 1.get doctor information from req.body
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      website,
      address,
      specialization,
      experince,
      feesPerConsultation,
      timing,
    } = req.body;
    //2.create new doctor object and save into database
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    //new doctorModel({...req.body, status: "pending"}) this data save into doctorModel
    await newDoctor.save();
    // 3.status: "pending" का मतलब है कि अभी एडमिन अप्रूव करेगा।

    // 4.एडमिन को नोटिफिकेशन भेजना
    // यह डाटाबेस में ऐसे यूज़र को खोजती है, जिसका isAdmin: true हो, यानी जो एडमिन हो।
    // अगर डाटाबेस में कोई ऐडमिन मिला, तो उसका डेटा adminUser नाम के वेरिएबल में स्टोर हो जाता है।
    const adminUser = await userModel.findOne({ isAdmin: true });
    // 5.नोटिफिकेशन को अपडेट करना
    const notification = adminUser.notification;
    // हमने पिछले स्टेप में एडमिन का नोटिफिकेशन लिस्ट (notification) लिया था।
    // अब हम उसमें एक नया नोटिफिकेशन जोड़ रहे हैं।
    //
    notification.push({
      // यह नोटिफिकेशन का टाइप बता रहा है कि यह डॉक्टर की रिक्वेस्ट से जुड़ा नोटिफिकेशन है।
      type: "apply-doctor-request",
      // kon request bhej rah hai
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
      data: {
        doctorId: newDoctor._id, // नए डॉक्टर की ID, जिससे उसे डाटाबेस में पहचाना जा सके।
        name: newDoctor.firstName + " " + newDoctor.lastName, // डॉक्टर का पूरा नाम।
        onClickPath: "/doctor",
        // अगर एडमिन इस नोटिफिकेशन पर क्लिक करे, तो "/getuser" पेज खुलेगा, जिससे वह डॉक्टर की जानकारी देख सके।
      },
    });

    // 6.अपडेटेड नोटिफिकेशन एडमिन के अकाउंट में सेव करना
    await userModel.findByIdAndUpdate(
      adminUser._id,
      { notification },
      { new: true }
    );

    const updatedAdmin = await userModel.findById(adminUser._id);
    console.log("Updated Admin Data:", updatedAdmin.notification);
    // यह एडमिन के यूज़र डेटा को अपडेट करता है ताकि नए नोटिफिकेशन सेव हो जाएँ।

    // 7 सक्सेस मैसेज भेजना
    res.status(201).json({
      message: "doctor account applied successfully",
      data: newDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to create new doctor", error: error.message });
  }
};

export default applyDoctor;
