const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    }, lastname: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    }, middlename: {
        type: String,
        uppercase: true,
        trim: true
    }, email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error('Invalid Email')
        }
    },  role: {
        type: String,
        enum: ['cashier', 'stockman', 'admin']
    }, password: {
        type: String,
        required: true
    }, tokens: [{
        token: {
            type: String
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRETKEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    email = email.toLowerCase();
    console.log(email, password)
    const user = await User.findOne({email});
    if(!user) {
        console.log('User not found');
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        console.log('Invalid Password');
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
    next();    
});

const User = new mongoose.model('User', userSchema);

module.exports = User;