const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const CTPHD = new Schema({

    id: { type: ObjectId }, // khóa chính
    soluong: {type: Number},
    dongia: {type: Number},
    hoadon: {type: ObjectId, ref:'hoadon'},
    sanpham: {type: ObjectId, ref:'sanpham'},
});
module.exports = mongoose.models.CTPHD || mongoose.model('CTPHD', CTPHD);

