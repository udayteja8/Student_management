const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Depatment: {
        type: String,
        required: true
    },
    Birth: {
        type: Date,
        default: new Date(),
        required: true
    },
    ID: {
        type: Number,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    Status: {
        type: Boolean,
        required: true
    }
});

const StudentModel = mongoose.model('students', StudentSchema);
module.exports = StudentModel;
