var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointment = new Schema({
	patientId: { type: mongoose.Schema.ObjectId, ref: 'patient'},
	doctorId: { type: mongoose.Schema.ObjectId, ref: 'doctor'},
	hospitalId: { type: mongoose.Schema.ObjectId, ref: 'hospital'},
	scheduleId: { type: mongoose.Schema.ObjectId, ref: 'schedule'},
	slotId: { type: mongoose.Schema.ObjectId, ref: 'slot'},
	start: {type : String},
	date : {type : Date},
	end : {type : String},
	status:{type: String},
    disease_description : {type : String},
    fileName : {type : String},
	original_Name : {type : String},
	booked : {type : String}

});

module.exports = mongoose.model('appointment',appointment);