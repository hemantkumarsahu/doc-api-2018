var mongoose = require('mongoose');
var specialityModel = require('../models/speciality');

var specialityCtrl={};
specialityCtrl.createSpeciality = function(req,res){
		specialityModel.create(req.body,function(err,speciality){
			if(err){
				res.json({status: "error", message : "error in fetching speciality"});
			}
			else{
				res.json({status:"success", message : "Dgree inserted successfully", speciality : speciality});
			}
		});
};

specialityCtrl.updateSpeciality = function(req,res){
	console.log("update request=",req.body);
		specialityModel.update({_id: req.params.id}, { $set : req.body}, function(err,speciality){
			if(err){
				res.json({status:"error", message: "Database error",err : err});
			}
			else{
				res.json({status: "success", message:"updated successfully",speciality:speciality});
			}
		});
};
specialityCtrl.updateStatusSpeciality = function(req, res) {
        if (req.body) {
            console.log("update",req.body);
            if (req.body.status=="Active") {
                req.body.status='0';
            }else{
                req.body.status='1';
            }
            console.log("update status now",req.body);
            specialityModel.update({ _id: req.params.id}, { $set: req.body }, function(err, doc) {
                if (err) {
                    res.status(500).json({ status: 'error', message: 'Database Error', err: err });
                } else {
                    res.status(200).json({ status: 'success', message: 'Speciality updated Successfully', doc: doc });
                }
            });
        }
};
specialityCtrl.getAllSpeciality = function(req,res){
		specialityModel.find({},function(err,specialitys){
			if(err || !specialitys){
				res.json({status:"error",message:"error",err:err});
			}
			else{
				res.json({status:"success",message:"specialitys fetch successfully",specialitys :specialitys});
			}
		});
};

specialityCtrl.removeSpeciality = function(req,res){
		specialityModel.findByIdAndRemove({_id: req.params.id},function(err,speciality){
			if(err){
				res.status(500).json({status: "error",message:"error"});
			}	
			else{
				res.status(200).json({status:"success",message : "speciality removed successfully", doc : speciality});
			}
		});
};

specialityCtrl.getSpecialityByID = function(req,res){
		specialityModel.findById({_id: req.params.id},function(err,speciality){
			if(err){
				res.json({status : "error",message:"error",err:err});
			}
			else{
				res.json({status : "success",message :"fetch successfully", doc : speciality})
			}
		})
}


module.exports=specialityCtrl;