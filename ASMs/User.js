const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({

    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    password: { 
        type: String,
         require: true, },
    gmail: { 
        type: String, 
        require: true, 
    },
    gioitinh: { type: String },
    namsinh: { type: String, },
    diachi: { type: String, },
    role: { type: Number, }
});
module.exports = mongoose.models.User || mongoose.model('User', User);

