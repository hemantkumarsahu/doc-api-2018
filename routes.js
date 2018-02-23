var express = require('express');
var router = express.Router();
var each = require('async-each');
var async = require('async');

var patientCtrl= require('./controllers/patientCtrl');
var hospitalCtrl= require('./controllers/hospitalCtrl');
var specialityCtrl= require('./controllers/specialityCtrl');
var degreeCtrl= require('./controllers/degreeCtrl');
var doctorCtrl= require('./controllers/doctorCtrl');
var checkupCtrl= require('./controllers/checkupCtrl');
var appointmentCtrl=require('./controllers/appointmentCtrl');
var scheduleCtrl=require('./controllers/scheduleCtrl');
var scheduleDateRangeEntryCtrl=require('./controllers/scheduleDateRangeEntryCtrl');
var slotCtrl=require('./controllers/slotCtrl');
var pescriptionCtrl=require('./controllers/pescriptionCtrl');
var noteCtrl=require('./controllers/noteCtrl');
var auth=require('./config/auth');
var authPatient=require('./config/authPatient');
var multer      = require('multer');
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../doctor-appointment-web/uploads');
        cb(null, __dirname+'/../patient-web/uploads');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,datetimestamp + '_'+ file.originalname);
        // cb(null, file.fieldname + '-' + datetimestamp+'-'+file.originalname.split);
                 // '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        
    }
});
var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['pdf','png','jpg','xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }  
                });

//Doctor login
router.post("/login", auth.login);
//Patient login
router.post("/loginPatient", authPatient.login);
router.post("/SignUpPatient", authPatient.SignUpPatient);


//CRUD Patient
router.post('/doc/secure/createPatient/',patientCtrl.createPatient);
router.put('/doc/secure/updatePatient/:id',patientCtrl.updatePatient);
router.get('/doc/secure/getPatientByID/:id',patientCtrl.getPatientByID);
router.get('/doc/secure/getAllPatient/all/',patientCtrl.getAllPatient);
router.delete('/doc/secure/removePatient/:id',patientCtrl.removePatient);
router.put('/doc/secure/updateStatusPatient/:id',patientCtrl.updateStatusPatient);


//CRUD Doctor
router.post('/doc/secure/createDoctor/',doctorCtrl.createDoctor);
router.put('/doc/secure/updateDoctor/:id',doctorCtrl.updateDoctor);
router.get('/doc/secure/getDoctorByID/:id',doctorCtrl.getDoctorByID);
router.get('/doc/secure/getAllDoctor/all/',doctorCtrl.getAllDoctor);
router.delete('/doc/secure/removeDoctor/:id',doctorCtrl.removeDoctor);


//CRUD Hospital
router.post('/doc/secure/createHospital/',hospitalCtrl.createHospital);
router.put('/doc/secure/updateHospital/:id',hospitalCtrl.updateHospital);
router.get('/doc/secure/getHospitalByID/:id',hospitalCtrl.getHospitalByID);
router.get('/doc/secure/getAllHospital/all/',hospitalCtrl.getAllHospital);
router.delete('/doc/secure/removeHospital/:id',hospitalCtrl.removeHospital);
router.put('/doc/secure/updateStatusHospital/:id',hospitalCtrl.updateStatusHospital);


//CRUD Speciality
router.post('/doc/secure/createSpeciality/',specialityCtrl.createSpeciality);
router.put('/doc/secure/updateSpeciality/:id',specialityCtrl.updateSpeciality);
router.get('/doc/secure/getSpecialityByID/:id',specialityCtrl.getSpecialityByID);
router.get('/doc/secure/getAllSpeciality/all/',specialityCtrl.getAllSpeciality);
router.delete('/doc/secure/removeSpeciality/:id',specialityCtrl.removeSpeciality);
router.put('/doc/secure/updateStatusSpeciality/:id',specialityCtrl.updateStatusSpeciality);


//CRUD Degree
router.post('/doc/secure/createDegree/',degreeCtrl.createDegree);
router.put('/doc/secure/updateDegree/:id',degreeCtrl.updateDegree);
router.get('/doc/secure/getDegreeByID/:id',degreeCtrl.getDegreeByID);
router.get('/doc/secure/getAllDegree/all/',degreeCtrl.getAllDegree);
router.delete('/doc/secure/removeDegree/:id',degreeCtrl.removeDegree);
router.put('/doc/secure/updateStatusDegree/:id',degreeCtrl.updateStatusDegree);



//CRUD CheckUp
router.post('/doc/secure/createCheckup/',checkupCtrl.createCheckup);
router.put('/doc/secure/updateCheckup/:id',checkupCtrl.updateCheckup);
router.get('/doc/secure/getCheckupByID/:id',checkupCtrl.getCheckupByID);
router.get('/doc/secure/getAllCheckupByDoctorID/:id',checkupCtrl.getAllCheckupByDoctorID);
router.get('/doc/secure/getAllCheckupByPatientID/:id',checkupCtrl.getAllCheckupByPatientID);
router.get('/doc/secure/getAllCheckup/all/',checkupCtrl.getAllCheckup);
router.delete('/doc/secure/removeCheckup/:id',checkupCtrl.removeCheckup);


//CRUD Appointment
router.post('/doc/secure/createAppointment/',appointmentCtrl.createAppointment);
router.put('/doc/secure/updateAppointment/:id',appointmentCtrl.updateAppointment);
router.put('/doc/secure/updateAppointmentFile/:id',appointmentCtrl.updateAppointmentFile);
router.get('/doc/secure/getAppointmentByID/:id',appointmentCtrl.getAppointmentByID);
router.get('/doc/secure/getAllAppointment/all/',appointmentCtrl.getAllAppointment);
router.get('/doc/secure/getAppointmentForDoctor/:id',appointmentCtrl.getAppointmentForDoctor);
router.get('/doc/secure/getAppointmentForPatient/:id',appointmentCtrl.getAppointmentForPatient);
router.delete('/doc/secure/removeAppointment/:id',appointmentCtrl.removeAppointment);
router.delete('/doc/secure/removeAllAppointment',appointmentCtrl.removeAllAppointment);
router.post("/doc/secure/uploadTest/:id",upload.any(),appointmentCtrl.uploadTest);

//CRUD Slot
router.post('/doc/secure/createSlot/',slotCtrl.createSlot);
router.post('/doc/secure/getSlot/:did/:hid',slotCtrl.getSlot);
router.put('/doc/secure/updateSlot/:id',slotCtrl.updateSlot);

//CRUD Schedule
router.post('/doc/secure/createSchedule/',scheduleCtrl.createSchedule);
router.put('/doc/secure/updateSchedule/:id',scheduleCtrl.updateSchedule);
router.get('/doc/secure/getScheduleByID/:id',scheduleCtrl.getScheduleByID);
router.get('/doc/secure/getAllSchedule/all/',scheduleCtrl.getAllSchedule);
router.delete('/doc/secure/removeSchedule/:id',scheduleCtrl.removeSchedule);
router.get("/doc/secure/getScheduleByDoctorAndHospital/:did/:hid",scheduleCtrl.getScheduleByDoctorAndHospital);

//CRUD scheduleDateRangeEntryModel
router.post('/doc/secure/createScheduleDateRangeEntry/',scheduleDateRangeEntryCtrl.createScheduleDateRangeEntry);
router.put('/doc/secure/updateScheduleDateRangeEntry/:id',scheduleDateRangeEntryCtrl.updateScheduleDateRangeEntry);
// router.get('/doc/secure/getScheduleDateRangeEntryByID/:id',scheduleDateRangeEntryCtrl.getScheduleDateRangeEntryByID);
// router.get('/doc/secure/getAllScheduleDateRangeEntry/all/',scheduleDateRangeEntryCtrl.getAllScheduleDateRangeEntry);
// router.delete('/doc/secure/removeScheduleDateRangeEntry/:id',scheduleDateRangeEntryCtrl.removeScheduleDateRangeEntry);
router.get("/doc/secure/getScheduleDateRangeEntryByDoctorAndHospital/:did/:hid",scheduleDateRangeEntryCtrl.getScheduleDateRangeEntryByDoctorAndHospital);
router.post("/doc/secure/postScheduleDateRangeEntryByDoctorAndHospital/:did/:hid",scheduleDateRangeEntryCtrl.postScheduleDateRangeEntryByDoctorAndHospital);

//CRUD Pescription
router.post('/doc/secure/createPescription/',pescriptionCtrl.createPescription);
router.put('/doc/secure/updatePescription/:id',pescriptionCtrl.updatePescription);
router.get('/doc/secure/getPescriptionByID/:id',pescriptionCtrl.getPescriptionByID);
router.get('/doc/secure/getAllPescriptionByDoctorID/:id',pescriptionCtrl.getAllPescriptionByDoctorID);
router.get('/doc/secure/getAllPescriptionByPatientID/:id',pescriptionCtrl.getAllPescriptionByPatientID);
router.get('/doc/secure/getAllPescription/all/',pescriptionCtrl.getAllPescription);
router.delete('/doc/secure/removePescription/:id',pescriptionCtrl.removePescription);


//CRUD Note
router.post('/doc/secure/createNote/',noteCtrl.createNote);
router.put('/doc/secure/updateNote/:id',noteCtrl.updateNote);
router.get('/doc/secure/getNoteByID/:id',noteCtrl.getNoteByID);
router.get('/doc/secure/getAllNote/all/',noteCtrl.getAllNote);
router.get('/doc/secure/getAllNoteByDocotrID/:id',noteCtrl.getAllNoteByDocotrID);
router.delete('/doc/secure/removeNote/:id',noteCtrl.removeNote);


module.exports = router;
