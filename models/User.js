const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: "https://www.psyenligne.org/wp-content/uploads/2013/01/inconnu.jpg"
    },
    nationallite: {
        type: String,
        required: false,
        default: ""
    },
    tele: {
        type: String,
        required: false,
        default: ""
    },
    sex: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

userSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('User', userSchema);
