import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user not exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    //check if user exists
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    } else {
      //generate and send token to client
      const token = createToken(user._id);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

//Route for user registration

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if user already registered
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Already registered" });
    }

    //validate email and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user object
    const newUser = new userModel({ name, email, password: hashedPassword });

    //save user to database
    const user = await newUser.save();

    //generate and send JWT token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

//Route for user admin login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      //generate and send token to client
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

export { loginUser, registerUser, adminLogin };
