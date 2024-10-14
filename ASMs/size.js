const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const size = new Schema({
    id: { type: ObjectId }, // khóa chính
    sizeName: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải co
    },
    DonGia: {
        type: Number,
        required: true,
    }
});
module.exports = mongoose.models.size || mongoose.model('size', size);

