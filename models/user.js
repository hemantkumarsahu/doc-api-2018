var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var key = require('./../config/secret')();
var encryptor = require('simple-encryptor')(key);

var userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    hero:String
});

userSchema.methods.validPassword = function(password) {

    
    if (password == encryptor.decrypt(this.password)) {
        
        return true;
    } else {
        
        return false;
    }
};

userSchema.plugin(timestamps);

module.exports = mongoose.model('user', userSchema);
