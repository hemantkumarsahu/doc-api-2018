var mongoose = require('mongoose');
var noteModel = require('../models/note');

var noteCtrl={};

noteCtrl.createNote = function(req,res){
		noteModel.create(req.body,function(err,note){
			if(err){
				res.json({status: "error", message : "error in fetching note"});
			}
			else{
				res.json({status:"success", message : "Note inserted successfully", note : note});
			}
		});
};

noteCtrl.updateNote = function(req,res){
	console.log("update request=",req.body);
		noteModel.update({_id: req.params.id}, { $set : req.body}, function(err,note){
			if(err){
				res.json({status:"error", message: "Database error",err : err});
			}
			else{
				res.json({status: "success", message:"updated successfully",note:note});
			}
		});
};
noteCtrl.getAllNote = function(req,res){
		noteModel.find({})
		.populate('patientId')
		.populate('appointmentId')
		.exec(function(err,notes){

			if(err || !notes){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				console.log("notes==================");
				console.log(notes);
				res.json({status:"success",message:"note fetch successfully",notes :notes});
			}
		});
};
noteCtrl.getAllNoteByDocotrID = function(req,res){
		noteModel.find({patientId : req.params.id})
		.populate('patientId')		
		.populate('appointmentId')
		.exec(function(err,notes)
		{
			if(err || !notes){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"notes fetch successfully",notes :notes});
			}
		});
};

noteCtrl.removeNote = function(req,res){
		noteModel.findByIdAndRemove({_id: req.params.id},function(err,note){
			if(err){
				res.status(500).json({status: "error",message:"error"});
			}	
			else{
				res.status(200).json({status:"success",message : "note removed successfully", doc : note});
			}
		});
};

noteCtrl.getNoteByID = function(req,res){
		noteModel.findById({_id: req.params.id},function(err,note){
			if(err){
				res.json({status : "error",message:"error",err:err});
			}
			else{
				res.json({status : "success",message :"fetch successfully", doc : note})
			}
		})
};


module.exports=noteCtrl;