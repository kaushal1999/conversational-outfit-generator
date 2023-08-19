// import errorHandler from "../middelwares/errorMiddleware.js";
import User from "../models/userModel.js";
import errorResponse  from "../utils/errorResponse.js";

// JWT TOKEN
function sendToken(user, statusCode, res) {
  const token = user.getSignedToken(res);
  // console.log("user             ",user._id);
  res.status(statusCode).json({
    success: true,
    token,
    id:user._id.toHexString()
    // Vishal edits--> sending username in the json webtoken
  });
}

//REGISTER
export async function registerContoller(req, res, next) {
  try {
    const { username, email, password } = req.body;
    //exisitng user
    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      return next(new errorResponse("Email is already register", 500));
    }
    const user = await User.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log("kaushal",error);
    next(error);
  }
}

//LOGIN
export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    //res
    // res.json(user);
    sendToken(user, 200, res);
    
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//LOGOUT
export async function logoutController(req, res) {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
}
