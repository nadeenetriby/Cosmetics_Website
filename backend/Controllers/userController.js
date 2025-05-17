const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

//this is for regestration and sign in (ma3andesh account i use sign in if i have then i login)
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      //if user already registered before
      return res.status(400).json({ msg: "user already registered" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpass = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hashedpass,
      });
      console.log("Received signup request:", req.body);

      await user.save();
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is missing in environment variables");
      }
      const payload = { userId: user._id, isAdmin: user.isAdmin };
      const token = jwt.sign(payload, secret);
      res.status(201).json({ msg: "reg successfully", token });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* Now, every time the user visits a protected page:

    Frontend includes the token in the request.

    Backend checks the token and says: "Yup, this is a valid user" — no password needed again.
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "password is not correct" });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const payload = { userId: user._id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    console.log("✅ Inside real login controller");
    res.json({ token, user: userData });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const getuserInfo = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ msg: "user not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ msg: "Name and email are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email } },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error("Update failed:", error.message);
    res.status(500).json({ msg: "Server error while updating user" });
  }
};

module.exports = { register, login, getuserInfo, updateUserInfo };

/* Token Flow

    User logs in:

        The backend sends a token with an expiration time of 1 hour.

        This token is stored on the frontend (in localStorage or sessionStorage).

    User interacts with the app:

        As long as the token is valid (within the 1-hour window), the frontend sends the token with every request to the backend to access protected routes.

    After 1 hour:

        Once the token expires (1 hour has passed), the backend will reject any request that uses the expired token.

        The frontend will receive a 401 Unauthorized response.

    What happens next?:

        The frontend detects that the token has expired (maybe by showing a login prompt or redirecting the user).

        The user needs to log in again to receive a new token. */
