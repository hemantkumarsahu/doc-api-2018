var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var speciality = new Schema({
	name : {type: String},
	description : {type : String},
	status: {type: String}
});

module.exports= mongoose.model('speciality',speciality);
