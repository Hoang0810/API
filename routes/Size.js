var express = require('express');
var router = express.Router();


var sizeModel = require('../ASMs/size');
var upload = require('../utils/configmulter');
const fs = require('fs').promises;
var sendMail = require('../utils/configmail')


//kiểu methods Put - Post - Get - Delete
// localhost:3000/size/add
router.post("/add", async function (req, res) {
    try {
        const { sizeName, DonGia } = req.body;
        const itemAdd = { sizeName, DonGia };
        await sizeModel.create(itemAdd);
        res.status(200).json({ status: true, message: "thanh cong" })

    } catch {
        res.status(400).json({ status: false, message: "that bai" })
    }
});


// lấy toàn bộ ds
router.get("/list", async function (req, res) {
    var data = await sizeModel.find();
    res.json(data)
});

// Route thêm dữ liệu




module.exports = router;