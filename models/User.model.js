const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    },
    name: String,
    lastName: String,
    dateOfBirth: {type: Date},
    username: {
      type: String,
      unique: [true, 'Username is already taken.'],
      trim: true,
      //required: [true, 'Username is required.'] 
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User.model',
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
