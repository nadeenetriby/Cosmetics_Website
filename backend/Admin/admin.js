const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Adjust path to your model file

const createAdminUser = async () => {
  const adminEmail = "nadeen@gmail.com";
  const adminPassword = "NadeenAli";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const adminUser = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();
    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }
};
module.exports = createAdminUser;
