const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userr = new Schema({
    id: { type: ObjectId }, // khóa chính
    userName: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        // unique: true, // không được trùng
        // trim: true, // bỏ khoảng trắng 2 đầu
        // minlength: 3, // độ dài tối thiểu
        // maxlength: 50, // độ dài tối đa
        // default: 'No name' // giá trị mặc định
    },
    passWord: { type: String, required: true},
});
module.exports = mongoose.models.userr || mongoose.model('userr', userr);
// category -----> categories
