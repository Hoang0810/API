const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const sanpham = new Schema({

    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    image: { type: String, required: true},
    price: {type: Number},
    mota: {type: String},
    category: {type: ObjectId, ref:'loaisanpham'}
});

module.exports = mongoose.models.sanpham || mongoose.model('Sanpham', sanpham);

