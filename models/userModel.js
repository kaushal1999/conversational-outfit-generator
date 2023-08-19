import { Schema, model } from "mongoose";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
// import cookie from "cookie";
// import { array } from "prop-types";

//models
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password length should be 6 character long"],
  },
  inputMessages: {
    type:Array
  },
  outputMessages: {
    type:Array
  },
});

//hashed password
userSchema.pre("save", async function (next) {
  //update
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password =  bcrypt.hash(this.password, salt);
  next();
});

//match password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//SIGN TOKEN
userSchema.methods.getSignedToken = function (res) {
  const accessToken = jwt.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
  );
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXIPREIN }
  );
  res.cookie("refreshToken", `${refreshToken}`, {
    maxAge: 86400 * 7000,
    httpOnly: true,
  });

  // vishal edits--> agar token chaiye frontend mein to
  return accessToken;
    // refreshToken,
  
};

const User = model("User", userSchema);

export default User;
