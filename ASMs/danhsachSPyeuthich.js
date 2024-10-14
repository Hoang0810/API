const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const DSSPyeuthich = new Schema({

    id: { type: ObjectId }, // khóa chính
    khachhang: {type: ObjectId, ref:'khachhang'},
    sanpham: {type: ObjectId, ref:'sanpham'},
});
module.exports = mongoose.models.DSSPyeuthich || mongoose.model('DSSPyeuthich', DSSPyeuthich);

