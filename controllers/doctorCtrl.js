var mongoose = require('mongoose');
var doctorModel = require('../models/doctor');
var doctorCtrl={};

doctorCtrl.createDoctor = function(req,res){
	console.log(req.body);
		doctorModel.create(req.body,function(err,doctor){
			if(err){
				res.json({status: "error", message : "error in fetching doctor"});
			}
			else{
				res.json({status:"success", message : "Degree inserted successfully", doctor : doctor});
			}
		});
};

doctorCtrl.updateDoctor = function(req,res){
	console.log("update request=",req.body);
		doctorModel.update({_id: req.params.id}, { $set : req.body}, function(err,doctor){
			if(err){
				res.json({status:"error", message: "Database error",err : err});
			}
			else{
				res.json({status: "success", message:"updated successfully",doctor:doctor});
			}
		});
};

doctorCtrl.getAllDoctor = function(req,res){
		doctorModel.find({})
		.populate('degreeID')
		.exec(function(err,doctors)
		{
			if(err || !doctors)
			{
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"doctors fetch successfully",doctors :doctors});
			}
		});
};

doctorCtrl.removeDoctor = function(req,res){
		doctorModel.findByIdAndRemove({_id: req.params.id},function(err,doctor){
			if(err){
				res.status(500).json({status: "error",message:"error"});
			}	
			else{
				res.status(200).json({status:"success",message : "doctor removed successfully", doc : doctor});
			}
		});
};

doctorCtrl.getDoctorByID = function(req,res){
		doctorModel.findById({_id: req.params.id},function(err,doctor){
			if(err){
				res.json({status : "error",message:"error",err:err});
			}
			else{
				res.json({status : "success",message :"fetch successfully", doc : doctor})
			}
		})
}

module.exports=doctorCtrl;