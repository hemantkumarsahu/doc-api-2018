var mongoose = require('mongoose');

var patientModel = require('../models/patient');

var patientCtrl={};

patientCtrl.createPatient = function(req, res) {
    if (req.body){
        console.log("Patient Body",req.body);
        patientModel.create(req.body, function(err, patient) {
            if (err) {
                res.json({ status: "error", message: "error in fetching patient", err: err })
            } else {
                res.json({ status: "success", message: "Patient inserted successfully", patient: patient })
            }
        });
    }
};
patientCtrl.updatePatient = function(req, res) {
        if (req.body) {
            console.log("req update=================",req.body);
            patientModel.update({ _id: req.params.id}, { $set: req.body }, function(err, doc) {
                if (err) {
                    res.status(500).json({ status: 'error', message: 'Database Error', err: err });
                } else {
                    res.status(200).json({ status: 'success', message: 'Patient updated Successfully', doc: doc });
                }
            });
        }
};
patientCtrl.updateStatusPatient = function(req, res) {
        if (req.body) {
            if (req.body.status=="Active") {
                req.body.status='0';
            }else{
                req.body.status='1';
            }
            patientModel.update({ _id: req.params.id}, { $set: req.body }, function(err, doc) {
                if (err) {
                    res.status(500).json({ status: 'error', message: 'Database Error', err: err });
                } else {
                    res.status(200).json({ status: 'success', message: 'Speciality updated Successfully', doc: doc });
                }
            });
        }
};
patientCtrl.getAllPatient = function(req, res) {
		patientModel.find({}, function(err, patients) {
        if (err || !patients) {
            console.log(err)
            res.json({ status: "error", message: "error in fetching patients", err: err })
        } else {
            res.json({ status: "success", message: "Patients fetch successfully", patients: patients })
        }
    });
};
patientCtrl.removePatient = function(req, res) {
    patientModel.findByIdAndRemove({ _id: req.params.id }, function(err, doc) {
        if (err) {
            res.status(500).json({ status: "Error", message: "PatientRemovedError", doc: '' }).end();
        } else {
            res.status(200).json({ status: "Success", message: "Patient Removed Successfully", doc: doc }).end();
        }
    });
};
patientCtrl.getPatientByID = function(req,res){

    console.log("Getting Id From frontEnd====",req.params.id);
        patientModel.findById({_id: req.params.id},function(err,patient){
            if(err){
                res.json({status : "error",message:"error",err:err});
            }
            else{
                console.log("patin  by ID",patient);
                res.json({status : "success",message :"fetch successfully", doc : patient})
            }
        })
}

module.exports = patientCtrl;