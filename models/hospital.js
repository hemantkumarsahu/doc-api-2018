var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hospital = new Schema({
	name : {type : String},
	speciality : {type : String},
	address: {type : String},
	city: {type : String},
	tagline: {type : String},
	status: {type :String}
});

module.exports = mongoose.model('hospital',hospital);