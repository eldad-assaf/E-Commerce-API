const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        minLenght: 3,
        maxLength: 50,

    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: [true, 'this email already exists'],

        validate:
        {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email`
        }

    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLenght: 6,

    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

UserSchema.methods.createJWT = function () {
   return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
  };

module.exports = mongoose.model('User', userSchema);
