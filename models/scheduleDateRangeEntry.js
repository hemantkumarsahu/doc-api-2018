var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleDateRangeEntry = new Schema({
	doctorId: { type: mongoose.Schema.ObjectId, ref: 'doctor'},
	hospitalId: { type: mongoose.Schema.ObjectId, ref: 'hospital'},
	startDate : {type :Date},
	endDate : {type :Date},
	days : {
				Sunday 		: [{start: {type : String},end : {type:String}}],
				Monday 		: [{start: {type : String},end : {type:String}}],
				Tuesday 	: [{start: {type : String},end : {type:String}}],	
				Wednesday 	: [{start: {type : String},end : {type:String}}],	
				Thursday 	: [{start: {type : String},end : {type:String}}],	
				Friday 		: [{start: {type : String},end : {type:String}}],
				Saturday 	: [{start: {type : String},end : {type:String}}]		
			}
});

module.exports = mongoose.model('scheduleDateRangeEntry',scheduleDateRangeEntry);
