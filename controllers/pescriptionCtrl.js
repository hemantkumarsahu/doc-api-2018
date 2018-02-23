var mongoose = require('mongoose');
var pescriptionModel = require('../models/pescription');

var pescriptionCtrl={};

pescriptionCtrl.createPescription = function(req,res){
		console.log("Request Body======================");
		console.log(req.body);
		pescriptionModel.create(req.body,function(err,pescription){
			if(err){
				res.json({status: "error", message : "error in fetching pescription"});
			}
			else{
				res.json({status:"success", message : "Dgree inserted successfully", pescription : pescription});
			}
		});
};

pescriptionCtrl.updatePescription = function(req,res){
		pescriptionModel.update({_id: req.params.id}, { $set : req.body}, function(err,pescription){
			if(err){
				res.json({status:"error", message: "Database error",err : err});
			}
			else{
				res.json({status: "success", message:"updated successfully",pescription:pescription});
			}
		});
};
pescriptionCtrl.getAllPescription = function(req,res){
		pescriptionModel.find({})
		.populate('patientId')
		.populate('appointmentId')
		.exec(function(err,pescriptions){
			if(err || !pescriptions){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"pescriptions fetch successfully",pescriptions :pescriptions});
			}
		});
};
pescriptionCtrl.getAllPescriptionByPatientID = function(req,res){
	console.log("req paramas for pescriptionCtrl",req.params.id);
		pescriptionModel.find({patientId : req.params.id})
		.populate('patientId')		
		.populate('appointmentId')
		.populate('hospitalId')
		.populate('doctorId')
		.exec(function(err,pescriptions)
		{
			if(err || !pescriptions){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"pescriptions fetch successfully",pescriptions :pescriptions});
			}
		});
};
pescriptionCtrl.getAllPescriptionByDoctorID = function(req,res){

	console.log("req paramas for pescriptionCtrl",req.params.id);
		pescriptionModel.find({doctorId : req.params.id})
		.populate('patientId')		
		.populate('appointmentId')
		.exec(function(err,pescriptions)
		{
			if(err || !pescriptions){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"pescriptions fetch successfully",pescriptions :pescriptions});
			}
		});
};


pescriptionCtrl.removePescription = function(req,res){
		pescriptionModel.findByIdAndRemove({_id: req.params.id},function(err,pescription){
			if(err){
				res.status(500).json({status: "error",message:"error"});
			}	
			else{
				res.status(200).json({status:"success",message : "pescription removed successfully", doc : pescription});
			}
		});
};

pescriptionCtrl.getPescriptionByID = function(req,res){
		pescriptionModel.findById({_id: req.params.id},function(err,pescription){
			if(err){
				res.json({status : "error",message:"error",err:err});
			}
			else{
				res.json({status : "success",message :"fetch successfully", doc : pescription})
			}
		})
};


module.exports=pescriptionCtrl;