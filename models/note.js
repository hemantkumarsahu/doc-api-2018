var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var note = new Schema({
	patientId: { type: mongoose.Schema.ObjectId, ref: 'patient' },
	appointmentId: { type: mongoose.Schema.ObjectId, ref: 'appointment' },
    description : {type : String}
});

module.exports = mongoose.model('note',note);