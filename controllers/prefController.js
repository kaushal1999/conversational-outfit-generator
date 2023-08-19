
import mongoose from "mongoose";
import User from "../models/userModel.js";


const prefController = async (req, res) => {

  const { formData, id } = req.body;
  console.log(formData);
  // store formData in mongo db in specific user as a string using template
  //  User.findById(id).up
  const userId = mongoose.Types.ObjectId(id);
  try {
    // Find the user by ObjectId and update the userPref field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { userPref: JSON.stringify(formData) } },
      { new: true }
    );

    if (updatedUser) {
      console.log('Updated user:', updatedUser);
      res.status(200).send("user preferences updated");
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export default prefController
