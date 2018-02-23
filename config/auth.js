var jwt = require('jwt-simple');
// var doctorModel = require('../models/user');
var doctorModel = require('../models/doctor');
var _ = require('underscore');


var auth = {
        login: function(req, res) {

            var username = req.body.username || req.body.email || '';
            var password = req.body.password || '';

            if (username == '' || password == '') {

                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Please provide email and password"
                });
                return;
            }
            // Fire a query to your DB and check if the credentials are valid

            auth.validate(username, password, function(dbUserObj, message, status) {
                console.log(dbUserObj);
                if (!dbUserObj) { // If authentication fails, we send a 401 back
                    res.status(status);
                    res.json({
                        "status": status,
                        "message": message
                    });
                    return;
                }
                if (dbUserObj) {
                    if (status == 200) {
                        res.json(genToken(dbUserObj, message, res));
                    } else {
                        console.log(status);
                        console.log(message);
                        res.status(status).json({ status: "error", message: message });
                    }
                }
            });

        },

        validate: function(username, password, myCallBack) {

            var message;

            doctorModel.findOne({ 'email': username })

            .exec(function(err, doc) {

                if (err || !doc) {
                    myCallBack(null, "You have entered invalid email or password.", 401);
                } else {

                    if (doc.validPassword(password)) {

                        // ************************
                        // To make it work for old rater database
                        // ************************
                        console.log("******************* checking role of user");
                        console.log(doc.roles);



                        myCallBack(doc, "Login Successful.", 200);

                        //return doc;
                    } else {
                        myCallBack(null, "You have entered invalid email or password.", 401);
                    }
                }
            });
        },
        validateUser: function(username, myCallBack) {
            doctorModel.findOne({ 'email': username }, function(err, doc) {
                if (err) {
                    myCallBack(null);
                } else {
                    myCallBack(doc);
                }
            });
        },
    }
    // private method
function genToken(user, message, res) {
    try {
        var expires = expiresIn(1); // 1 day

        var token = jwt.encode({

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.hero
            },
            exp: expires
        }, require('../config/secret')());

        // user.agency = user.agency._id;

        res.json({
            success: true,
            token: token,
            expires: expires,
            user: user,
            message: message,
            status: "success"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            status: "error",
            token: token,
            expires: expires,
            user: user,
            message: message
        });
    }
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}


module.exports = auth;
