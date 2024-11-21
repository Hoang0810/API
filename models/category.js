const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const category = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    image: { type: String, required: true},
});
module.exports = mongoose.models.category || mongoose.model('category', category);
// category -----> categories
