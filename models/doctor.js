var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var key = require('./../config/secret')();
var encryptor = require('simple-encryptor')(key);

var doctor = new Schema({
	name : {type : String},
    email:{type: String},
	username: { type: String },
    password: { type: String },
    gender: { type: String },
    dateofbirth: { type: Date },
    address: { building: String, street: String, city: String, state: String, country: String, zipcode: String },
    specialityID: [{ type: Schema.Types.ObjectId, ref: 'speciality'}],
	hospitalId: [{ type: Schema.Types.ObjectId, ref: 'doctor'}],
	// qualifications: [{
    degreeID: [{ type: Schema.Types.ObjectId, ref: 'degree' }],
    year: {type :String}
    // }]
});


doctor.methods.validPassword = function(password) {
    if (password == encryptor.decrypt(this.password)) {        
        return true;
    } else {
        return false;
    }
};


module.exports = mongoose.model('doctor', doctor);
