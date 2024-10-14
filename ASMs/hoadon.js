const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const hoadon = new Schema({

    id: { type: ObjectId }, // khóa chính
    ngaymua: {type: Date},
    diachi: {type: String},
    payment: {type: ObjectId, ref:'payment'},
    khachhang: {type: ObjectId, ref:'khanghang'},
});
module.exports = mongoose.models.hoadon || mongoose.model('hoadon', hoadon);

