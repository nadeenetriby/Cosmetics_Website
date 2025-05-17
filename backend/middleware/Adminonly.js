//Middleware is a function that runs between the request coming in from the client

const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else return res.status(403).json({ msg: "admins only can access" });
};

module.exports = adminOnly;
