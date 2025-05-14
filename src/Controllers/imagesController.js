const cloudinary = require("../claudinary/cloudinary");
const User = require("../models/User");

const updateUserProfilePicture = async (req, res) => {
  const userId = req.params.userId;

  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {});

    //claudinary url
    const imageUrl = result.secure_url;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // delete the old image from Cloudinary by getting the public ID of the old image
    if (user.profilePicture) {
      const publicId = user.profilePicture.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profile_pictures/${publicId}`);
    }

    user.profilePicture = imageUrl;
    await user.save();

    res.json({ message: "Profile picture updated", imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = updateUserProfilePicture;
