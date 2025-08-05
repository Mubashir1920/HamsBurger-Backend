const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header.token;
  const isMatch = jwt.verify(token, process.env.JWT_SECRET);
  if (!isMatch) {
    return res.status(402).json({ message: "Unauthorized! Access Denied" });
  }

  next();
};

module.exports = auth;
