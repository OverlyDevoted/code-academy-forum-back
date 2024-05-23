const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Not allowed" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "User is not authenticted" });
    req.body.user_id = decoded.id;
    return next();
  });
};
module.exports = authUser;
