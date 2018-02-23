var mongoose = require('mongoose');
var hospitalModel=require('../models/hospital');


var hospitalCtrl ={};
hospitalCtrl.createHospital = function(req, res) {
    if (req.body){
        console.log("req body===================",req.body);
        hospitalModel.create(req.body, function(err, doc) {
            if (err) {
                res.json({ status: "error", message: "error in fetching Hospital", err: err })
            } else {
                res.json({ status: "success", message: "hospital inserted successfully", hospital: doc })
            }
        });
    }
};
hospitalCtrl.updateHospital = function(req, res) {
        if (req.body) {
            hospitalModel.update({ _id: req.params.id}, { $set: req.body }, function(err, doc) {
                if (err) {
                    res.status(500).json({ status: 'error', message: 'Database Error', err: err });
                } else {
                    res.status(200).json({ status: 'success', message: 'hospital updated Successfully', doc: doc });
                }
            });
        }
};
hospitalCtrl.updateStatusHospital = function(req, res) {
        if (req.body) {
            console.log("update",req.body);
            if (req.body.status=="Active") {
                req.body.status='0';
            }else{
                req.body.status='1';
            }
            console.log("update status now",req.body);
            hospitalModel.update({ _id: req.params.id}, { $set: req.body }, function(err, doc) {
                if (err) {
                    res.status(500).json({ status: 'error', message: 'Database Error', err: err });
                } else {
                    res.status(200).json({ status: 'success', message: 'hospital updated Successfully', doc: doc });
                }
            });
        }
};
hospitalCtrl.getAllHospital = function(req, res) {
		hospitalModel.find({}, function(err, hospitals) {
        if (err || !hospitals) {
            console.log(err)
            res.json({ status: "error", message: "error in fetching hospitals", err: err })
        } else {
            console.log("hospitals====================",hospitals);
            res.json({ status: "success", message: "hospitals fetch successfully", hospitals: hospitals })
        }
    });
};
hospitalCtrl.removeHospital = function(req, res) {
    console.log("remove Hospital ID",req.params.id);
    hospitalModel.findByIdAndRemove({ _id: req.params.id }, function(err, doc) {
        if (err) {
            res.status(500).json({ status: "Error", message: "hospitalRemovedError", doc: '' }).end();
        } else {
            res.status(200).json({ status: "Success", message: "hospital Removed Successfully", doc: doc }).end();
        }
    });
};
hospitalCtrl.getHospitalByID = function(req,res){
    console.log("id======================",req.params.id);
        hospitalModel.findById({_id: req.params.id},function(err,hospital){
            if(err){
                res.json({status : "error",message:"error",err:err});
            }
            else{
                res.json({status : "success",message :"fetch successfully", doc : hospital})
            }
        })
};


module.exports = hospitalCtrl;