
import mongoose from "mongoose";
import User from "../models/userModel.js";


const prefController = async (req, res) => {
  const {formData,id} = req.body;
  // store formData in mongo db in specific user as a string using template
   User.findById(id).up
};

export default prefController
