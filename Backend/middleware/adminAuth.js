import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(402).json({
        success: false,
        message: "not authorized login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "not autho login Again",
      });
    }
    next();
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Admin authentication failed" });
  }
};

export default adminAuth;
