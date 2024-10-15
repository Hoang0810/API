var express = require('express');
var router = express.Router();


var loaiSpModel = require('../ASMs/loaisanpham');
var upload = require('../utils/configmulter');
const fs = require('fs').promises;
var sendMail = require('../utils/configmail')


//kiểu methods Put - Post - Get - Delete
// localhost:3000/loai-sp/

// lấy toàn bộ ds
router.get("/list", async function (req, res) {
    var data = await loaiSpModel.find();
    res.json(data)
});

//add
router.post("/add", async function (req, res) {
    try {
        const { name} = req.body;
        const itemAdd = { name };
        await loaiSpModel.create(itemAdd);
        res.status(200).json({ status: true, message: "thanh cong" })

    } catch {
        res.status(400).json({ status: false, message: "that bai" })
    }
});


module.exports = router;