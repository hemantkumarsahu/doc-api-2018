var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pescription = new Schema({
    patientId: { type: mongoose.Schema.ObjectId, ref: 'patient' },
    doctorId: { type: mongoose.Schema.ObjectId, ref: 'doctor' },
	appointmentId: { type: mongoose.Schema.ObjectId, ref: 'appointment' },
	hospitalId: { type: mongoose.Schema.ObjectId, ref: 'hospital' },
    description : {type : String},
    note: {type : String}
});

module.exports = mongoose.model('pescription', pescription);
