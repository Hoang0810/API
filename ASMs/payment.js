const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const payment = new Schema({

    id: { type: ObjectId }, // khóa chính
    ngayThanhtoan: { type: Date},
    tongTien: {type: Number},
});
module.exports = mongoose.models.payment || mongoose.model('payment', payment);
