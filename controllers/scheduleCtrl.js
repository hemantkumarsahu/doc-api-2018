var mongoose = require('mongoose');
var scheduleModel = require('../models/schedule');
var ObjectId = mongoose.Types.ObjectId;

var scheduleCtrl={};

scheduleCtrl.createSchedule = function(req,res){
	scheduleModel.create(req.body,function(err,schedule){
		if(err){
			res.json({status: "error", message : "error in fetching schedule"});
		}
		else{
			res.json({status:"success", message : "Schedule inserted successfully", doc : schedule});
		}
	});
};
scheduleCtrl.updateSchedule = function(req,res){
	scheduleModel.update({_id: req.params.id}, { $set : req.body}, function(err,schedule){
		if(err){
			res.json({status:"error", message: "Database error",err : err});
		}
		else{
			res.json({status: "success", message:"updated successfully",schedule:schedule});
		}
	});
};
scheduleCtrl.getAllSchedule = function(req,res){
	scheduleModel.find({},function(err,schedules){
		if(err || !schedules){
			res.json({status:"error",message:"error",err:err});
		}
		else{
			res.json({status:"success",message:"schedules fetch successfully",schedules :schedules});
		}
	});
};

scheduleCtrl.removeSchedule = function(req,res){
	scheduleModel.findByIdAndRemove({_id: req.params.id},function(err,schedule){
		if(err){
			res.status(500).json({status: "error",message:"error"});
		}	
		else{
			res.status(200).json({status:"success",message : "schedule removed successfully", doc : schedule});
		}
	});
};

scheduleCtrl.getScheduleByID = function(req,res){
	scheduleModel.findById({_id: req.params.id},function(err,schedule){
		if(err){
			res.json({status : "error",message:"error",err:err});
		}
		else{
			res.json({status : "success",message :"fetch successfully", doc : schedule})
		}
	})
}
scheduleCtrl.getScheduleByDoctorAndHospital = function(req,res){
	scheduleModel.findOne({doctorId: ObjectId(req.params.did), hospitalId: ObjectId(req.params.hid)},function(err,schedule){
		if(err){
			res.json({status : "error",message:"error",err:err});
		}
		else{
			res.json({status : "success",message :"fetch successfully", doc : schedule})
		}
	})
};
module.exports=scheduleCtrl;