var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var key = require('./../config/secret')();
var encryptor = require('simple-encryptor')(key);

var patient = new Schema({
	name: { type: String },
    email: { type: String },
    phoneno: { type: Number},
    address :{type :String},
    username: { type: String },
    password: { type: String },
    gender: { type: String },
    bloodgroup: {type : String},
    dateofbirth: { type: Date },
    status : {type : String}
});

patient.methods.validPassword = function(password) {
    if (password == encryptor.decrypt(this.password)) {
        return true;
    } else {
        
        return false;
    }
};

module.exports= mongoose.model('patient',patient);