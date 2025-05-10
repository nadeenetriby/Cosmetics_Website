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

      await user.save();
      res.status(201).json({ msg: "reg succesfully" });
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
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "email not found" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ msg: "password is not correct" });
    }
    //these are for mongo and then i jwt it to be sent to user
    const payload = { userId: user._id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
module.exports = { register, login };

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
