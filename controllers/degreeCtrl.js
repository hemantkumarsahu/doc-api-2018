var mongoose = require('mongoose');
var degreeModel = require('../models/degree');

var degreeCtrl={};

degreeCtrl.createDegree = function(req,res){
		degreeModel.create(req.body,function(err,degree){
			if(err){
				res.json({status: "error", message : "error in fetching degree"});
			}
			else{
				res.json({status:"success", message : "Dgree inserted successfully", degree : degree});
			}
		});
};

degreeCtrl.updateDegree = function(req,res){
	console.log("update request=",req.body);
		degreeModel.update({_id: req.params.id}, { $set : req.body}, function(err,degree){
			if(err){
				res.json({status:"error", message: "Database error",err : err});
			}
			else{
				res.json({status: "success", message:"updated successfully",degree:degree});
			}
		});
};
degreeCtrl.updateStatusDegree = function(req, res) {
        if (req.body) {
            if (req.body.status=="Active") {
                req.body.status='0';
            }else{
                req.body.status='1';
            }
            degreeModel.update({ _id: req.params.id}, { $set: req.body }, function(err, doc) {
                if (err) {
                    res.status(500).json({ status: 'error', message: 'Database Error', err: err });
                } else {
                    res.status(200).json({ status: 'success', message: 'Degree updated Successfully', doc: doc });
                }
            });
        }
};
degreeCtrl.getAllDegree = function(req,res){
		degreeModel.find({},function(err,degrees){
			if(err || !degrees){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"degrees fetch successfully",degrees :degrees});
			}
		});
};

degreeCtrl.removeDegree = function(req,res){
		degreeModel.findByIdAndRemove({_id: req.params.id},function(err,degree){
			if(err){
				res.status(500).json({status: "error",message:"error"});
			}	
			else{
				res.status(200).json({status:"success",message : "degree removed successfully", doc : degree});
			}
		});
};
degreeCtrl.getDegreeByID = function(req,res){
		degreeModel.findById({_id: req.params.id},function(err,doctor){
			if(err){
				res.json({status : "error",message:"error",err:err});
			}
			else{
				res.json({status : "success",message :"fetch successfully", doc : doctor})
			}
		})
}




module.exports=degreeCtrl;