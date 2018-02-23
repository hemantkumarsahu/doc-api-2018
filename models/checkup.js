var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkup = new Schema({
	patientId: { type: mongoose.Schema.ObjectId, ref: 'patient' },
	doctorId: { type: mongoose.Schema.ObjectId, ref: 'doctor' },
	hospitalId: { type: mongoose.Schema.ObjectId, ref: 'hospital' },
	appointmentId: { type: mongoose.Schema.ObjectId, ref: 'appointment' },
    description : {type : String}
});

module.exports = mongoose.model('checkup',checkup);