//This will be used in user route

const cloudinary = require("../claudinary/cloudinary");
const User = require("../models/User");

const updateUserProfilePicture = async (req, res) => {
  const userId = req.params.userId;
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ msg: "no image url" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // delete the old image from Cloudinary by getting the public ID of the old image
    if (user.profilePicture) {
      const publicId = user.profilePicture.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profile_pictures/${publicId}`);
    }

    user.profilePicture = image;
    await user.save();

    res.json({ message: "Profile picture updated", image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteProfilePicture = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // delete the old image from Cloudinary by getting the public ID of the old image
    if (user.profilePicture) {
      const publicId = user.profilePicture.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profile_pictures/${publicId}`);
      user.profilePicture = null;
      await user.save();
      res.json({ message: "Profile picture deleted" });
    } else {
      return res.status(400).json({ error: "No profile picture to delete" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { updateUserProfilePicture, deleteProfilePicture };
