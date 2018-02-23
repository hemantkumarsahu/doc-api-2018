var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var slot = new Schema({
	doctorId: { type: mongoose.Schema.ObjectId, ref: 'doctor'},
	hospitalId: { type: mongoose.Schema.ObjectId, ref: 'hospital'},
	scheduleId: { type: mongoose.Schema.ObjectId, ref: 'schedule'},
	// days : {
	// 			Sunday 		: [{start: {type : String},end : {type:String},flag : {type :String},index : {type:String}}],
	// 			Monday 		: [{start: {type : String},end : {type:String},flag : {type :String},index : {type:String}}],
	// 			Tuesday 	: [{start: {type : String},end : {type:String},flag : {type :String},index : {type:String}}],	
	// 			Wednesday 	: [{start: {type : String},end : {type:String},flag : {type :String},index : {type:String}}],	
	// 			Thursday 	: [{start: {type : String},end : {type:String},flag : {type :String},index : {type:String}}],	
	// 			Friday 		: [{start: {type : String},end : {type:String},flag : {type :String},index : {type:String}}],
	// 			Saturday 	: [{start: {type : String},end : {type:String},flag : {type :String},index : {type:String}}]		
	// 		}
	dateSlot : {type : Date},
	timeSlot  : [{start: {type : String},end : {type:String},flag : {type :String},index : {type:String}}]

});

module.exports = mongoose.model('slot',slot);