var mongoose = require('mongoose');
var checkupModel = require('../models/checkup');

var checkupCtrl={};

checkupCtrl.createCheckup = function(req,res){
		checkupModel.create(req.body,function(err,checkup){
			if(err){
				res.json({status: "error", message : "error in fetching checkup"});
			}
			else{
				res.json({status:"success", message : "checkup inserted successfully", checkup : checkup});
			}
		});
};

checkupCtrl.updateCheckup = function(req,res){
	console.log("update request=",req.body);
		checkupModel.update({_id: req.params.id}, { $set : req.body}, function(err,checkup){
			if(err){
				res.json({status:"error", message: "Database error",err : err});
			}
			else{
				res.json({status: "success", message:"updated successfully",checkup:checkup});
			}
		});
};
checkupCtrl.getAllCheckup = function(req,res){
		checkupModel.find({})
		.populate('patientId')		
		.populate('appointmentId')
		.exec(function(err,checkups)
		{
			if(err || !checkups){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				console.log("checkups details============",checkups);
				res.json({status:"success",message:"checkups fetch successfully",checkups :checkups});
			}
		});
};
checkupCtrl.getAllCheckupByDoctorID = function(req,res){
		checkupModel.find({doctorId : req.params.id})
		.populate('patientId')		
		.populate('appointmentId')
		.exec(function(err,checkups)
		{
			if(err || !checkups){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				console.log("checkups details============",checkups);
				res.json({status:"success",message:"checkups fetch successfully",checkups :checkups});
			}
		});
};
checkupCtrl.getAllCheckupByPatientID = function(req,res){
		checkupModel.find({patientId : req.params.id})
		.populate('patientId')		
		.populate('appointmentId')
		.populate('hospitalId')
		.exec(function(err,checkups)
		{
			if(err || !checkups){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				console.log("checkups details============",checkups);
				res.json({status:"success",message:"checkups fetch successfully",checkups :checkups});
			}
		});
};


checkupCtrl.removeCheckup = function(req,res){
		checkupModel.findByIdAndRemove({_id: req.params.id},function(err,checkup){
			if(err){
				res.status(500).json({status: "error",message:"error"});
			}	
			else{
				res.status(200).json({status:"success",message : "checkup removed successfully", doc : checkup});
			}
		});
};

checkupCtrl.getCheckupByID = function(req,res){
		checkupModel.findById({_id: req.params.id},function(err,checkup){
			if(err){
				res.json({status : "error",message:"error",err:err});
			}
			else{
				res.json({status : "success",message :"fetch successfully", doc : checkups})
			}
		})
};


module.exports=checkupCtrl;