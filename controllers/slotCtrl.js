
var mongoose = require('mongoose');
var slotModel = require('../models/slot');
var ObjectId = mongoose.Types.ObjectId;

var slotCtrl={};

slotCtrl.createSlot = function(req,res){
	slotModel.create(req.body,function(err,slot){
		if(err){
			res.json({status: "error", message : "error in fetching slot"});
		}
		else{
			res.json({status:"success", message : "slot inserted successfully", doc : slot});
		}
	});
};
slotCtrl.getSlot = function(req,res){
	slotModel.find({doctorId: req.params.did,hospitalId : req.params.hid,dateSlot: { $gte: req.body.startDate, $lte: req.body.endDate}},function(err,slots){
		if(err){
			res.json({status: "error", message : "error in fetching slot"});
		}
		else{
			res.json({status:"success", message : "slot fetch successfully", doc : slots});
		}
	});
};

slotCtrl.updateSlot = function(req,res){
	console.log("req.body=====",req.body.days.Sunday[0]);
	slotModel.update({_id: req.params.id}, { $set : req.body}, function(err,slot){
		if(err){
			res.json({status:"error", message: "Database error",err : err});
		}
		else{
			res.json({status: "success", message:"updated successfully",doc:slot});
		}
	});
};

module.exports=slotCtrl;