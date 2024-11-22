const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const loaisanpham = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
    },
    image: {type: String}
});
module.exports = mongoose.models.loaisanpham || mongoose.model('loaisanpham', loaisanpham);
// category -----> categories
