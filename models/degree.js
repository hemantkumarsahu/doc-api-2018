var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var degree = new Schema({
    name: { type: String },
    status: { type: String }

});

module.exports = mongoose.model('degree', degree);
