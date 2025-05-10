const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the path is correct

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId); // Find the user based on decoded token
    if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
