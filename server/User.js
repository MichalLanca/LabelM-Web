const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    approved: {
      type: Boolean,
      required: true
    }
  });

userSchema.pre('save', async function(next) {
try {
    const user = this;
    if (!user.isModified('password')) {
    return next();
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
} catch (error) {
    next(error);
}
});
  

const User = mongoose.model('User', userSchema);

module.exports = User;