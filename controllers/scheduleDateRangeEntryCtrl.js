var mongoose = require('mongoose');
var scheduleDateRangeEntryModel = require('../models/scheduleDateRangeEntry');
var ObjectId = mongoose.Types.ObjectId;

var scheduleDateRangeEntryCtrl={};

scheduleDateRangeEntryCtrl.createScheduleDateRangeEntry = function(req,res){
	console.log("createScheduleDateRangeEntry req.body===",req.body);
	scheduleDateRangeEntryModel.create(req.body,function(err,doc){
		if(err){
			console.log(err);
			res.json({status: "error", message : "err"});
		}
		else{
			console.log("createScheduleDateRangeEntry=",doc);
			res.json({status:"success", message : "doc inserted successfully", doc : doc});
		}
	});
};
scheduleDateRangeEntryCtrl.updateScheduleDateRangeEntry = function(req,res){
	scheduleDateRangeEntryModel.update({_id: req.params.id}, { $set : req.body}, function(err,doc){
		if(err){
			res.json({status:"error", message: "Database error",err : err});
		}
		else{
			res.json({status: "success", message:"updated successfully",doc:doc});
		}
	});
};
scheduleDateRangeEntryCtrl.getAllScheduleDateRangeEntry = function(req,res){
	scheduleDateRangeEntryModel.find({},function(err,docs){
		if(err || !docs){
			res.json({status:"error",message:"error",err:err});
		}
		else{
			res.json({status:"success",message:"docs fetch successfully",docs :docs});
		}
	});
};

scheduleDateRangeEntryCtrl.removeScheduleDateRangeEntry = function(req,res){
	scheduleDateRangeEntryModel.findByIdAndRemove({_id: req.params.id},function(err,doc){
		if(err){
			res.status(500).json({status: "error",message:"error"});
		}	
		else{
			res.status(200).json({status:"success",message : "doc removed successfully", doc : doc});
		}
	});
};

scheduleDateRangeEntryCtrl.getScheduleDateRangeEntryByID = function(req,res){
	scheduleDateRangeEntryModel.findById({_id: req.params.id},function(err,doc){
		if(err){
			res.json({status : "error",message:"error",err:err});
		}
		else{
			res.json({status : "success",message :"fetch successfully", doc : doc})
		}
	})
}
scheduleDateRangeEntryCtrl.getScheduleDateRangeEntryByDoctorAndHospital = function(req,res){
	scheduleDateRangeEntryModel.find({doctorId: req.params.did, hospitalId: req.params.hid},function(err,doc){
		if(err){
			res.json({status : "error",message:"error",err:err});
		}
		else{
			res.json({status : "success",message :"fetch successfully", doc : doc})
		}
	})
}
scheduleDateRangeEntryCtrl.postScheduleDateRangeEntryByDoctorAndHospital = function(req,res){
	console.log("req.params=",req.params);
	console.log("req.body=",req.body);
	scheduleDateRangeEntryModel.find({doctorId: req.params.did, hospitalId: req.params.hid,startDate: req.body.startDate, endDate: req.body.endDate},function(err,doc){
	// scheduleDateRangeEntryModel.find({doctorId: req.params.did, hospitalId: req.params.hid},function(err,doc){
		if(err){
			console.log("postScheduleDateRangeEntryByDoctorAndHospital",err);
			res.json({status : "error",message:"error",err:err});
		}
		else{
			console.log("postScheduleDateRangeEntryByDoctorAndHospital=",doc);
			res.json({status : "success",message :"fetch successfully", doc : doc})
		}
	})
};
module.exports=scheduleDateRangeEntryCtrl;