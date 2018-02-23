var mongoose = require('mongoose');
var appointmentModel = require('../models/appointment');
var doctorModel = require('../models/doctor');
var slotModel = require('../models/slot');
var each = require('async-each');
var async = require('async');

var appointmentCtrl={};

appointmentCtrl.createAppointment = function(req,res){
		 appointmentModel.create(req.body,function(err,appointment){
			if(err){
				res.json({status: "error", message : "error in fetching appointment"});
			}
			else{
				res.json({status:"success", message : "Appointment inserted successfully", appointment : appointment});
			}
		});

};
appointmentCtrl.updateAppointment = function(req,res){
		appointmentModel.update({_id: req.params.id}, { $set : req.body}, function(err,appointment){
			if(err){
				res.json({status:"error", message: "Database error",err : err});
			}
			else{
				res.json({status: "success", message:"updated successfully",appointment:appointment});
			}
		});
};
appointmentCtrl.getAllAppointment = function(req,res){
		appointmentModel.find({})
		.populate('hospitalId')
		.populate('doctorId')
		.populate('patientId')
		.exec(function(err,appointments){
			if(err || !appointments){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				console.log("appointments",appointments);
				res.json({status:"success",message:"appointments fetch successfully",appointments :appointments});
			}
		});
};
appointmentCtrl.getAppointmentForDoctor = function(req,res){
		appointmentModel.find({doctorId :req.params.id})
		.populate('hospitalId')
		.populate('doctorId')
		.populate('patientId')
		.populate('slotId')
		.exec(function(err,appointments){
			if(err || !appointments){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"appointments fetch successfully",appointments :appointments});
			}
		});
};
appointmentCtrl.getAppointmentForPatient = function(req,res){
		appointmentModel.find({patientId :req.params.id})
		.populate('hospitalId')
		.populate('doctorId')
		.populate('patientId')
		.exec(function(err,appointments){
			if(err || !appointments){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"appointments fetch successfully",appointments :appointments});
			}
		});
};
appointmentCtrl.removeAppointment = function(req,res){
		appointmentModel.findByIdAndRemove({_id: req.params.id},function(err,appointment){
			if(err){
				res.status(500).json({status: "error",message:"error"});
			}	
			else{
				res.status(200).json({status:"success",message : "appointment removed successfully", doc : appointment});
			}
		});
};
appointmentCtrl.removeAllAppointment = function(req,res){
		appointmentModel.remove({},function(err,appointment){
			if(err){
				res.status(500).json({status: "error",message:"error"});
			}	
			else{
				res.status(200).json({status:"success",message : "appointments removed successfully", doc : appointment});
			}
		});
};

appointmentCtrl.getAppointmentByID = function(req,res){
		appointmentModel.findById({_id: req.params.id},function(err,appointment){
			if(err){
				res.json({status : "error",message:"error",err:err});
			}
			else
			{
				res.json({status : "success",message :"fetch successfully", doc : appointment})
			}
		})
};

appointmentCtrl.uploadTest = function(req,res){
	// async.each(req.files, function(file, callback) {
		console.log("req.files=================",req.files[0].filename);
		appointmentModel.update({_id: req.params.id}, { $set  : {fileName : req.files[0].filename}}, function(err,appointment){
				if(err)
				{
					res.json({status:"error", message: "Database error",err : err});
				}
				else
				{
					res.json({status: "success", message:"updated successfully",appointment:appointment});
				}
		});
		// callback();
	// });
}

appointmentCtrl.updateAppointmentFile = function(req,res){
		appointmentModel.update({_id: req.params.id}, { $set  : {fileName : '', original_Name:''}}, function(err,appointment){
				if(err){
					res.json({status:"error", message: "Database error",err : err});
				}
				else{
					res.json({status: "success", message:"updated successfully",appointment:appointment});
				}
		});
}

module.exports=appointmentCtrl;