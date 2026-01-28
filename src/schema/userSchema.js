const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"]
  },
  password: {   
    type: String,
    required: true
  }
}, { timestamps: true });

userSchema.pre('save', async function () {
    const hashPwd = await bcrypt.hash(this.password, 10);
    this.password = hashPwd;
})

const User = mongoose.model('User', userSchema);
module.exports = User;  