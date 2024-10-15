var express = require('express');
var router = express.Router();

const JWT = require('jsonwebtoken');
const config = require("../utils/configenv");

var khachhangModel = require("../ASMs/khachhang")
var productModel = require('../ASMs/sanpham');

// var upload = require('../utils/configmulter');
// const fs = require('fs').promises;
// var sendMail = require('../utils/configmail')


//kiểu methods Put - Post - Get - Delete
// localhost:3000/san-pham/


// lấy toàn bộ ds spham
router.get("/list", async function (req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ "status": 403, "err": err });
                } else {
                    //xử lý chức năng tương ứng với API
                    var data = await productModel.find().populate('size category');
                    res.json(data)
                }
            });
        } else {
            res.status(401).json({ "status": 401 });
        }
    } catch {
        res.status(400).json({ status: false, message: "that bai" })
    }
});

//add
router.post("/add", async function (req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ "status": 403, "err": err });
                } else {
                    //xử lý chức năng tương ứng với API
                    const { name, image, mota, category, size } = req.body;
                    const itemAdd = { name, image, mota, category, size };
                    await productModel.create(itemAdd);
                    res.status(200).json({ status: true, message: "thanh cong" })
                }
            });
        } else {
            res.status(401).json({ "status": 401 });
        }

    } catch {
        res.status(400).json({ status: false, message: "that bai" })
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ "status": 403, "err": err });
                } else {
                    //xử lý chức năng tương ứng với API
                    const khachhang = await productModel.findByIdAndDelete(req.params.id);
                    if (!khachhang) {
                        return res.status(404).json({ status: false, message: "Không tìm thấy Sản Phẩm" });
                    }
                    res.status(200).json({ status: true, message: "Sản Phẩm đã được xóa" });
                }
            });
        } else {
            res.status(401).json({ "status": 401 });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});


//cap nhat thong tin
router.put("/update/:id", async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ "status": 403, "err": err });
                } else {
                    //xử lý chức năng tương ứng với API
                    const khachhang = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
                    if (!khachhang) {
                        return res.status(404).json({ status: false, message: "Không tìm thấy Sản Phẩm" });
                    }
                    res.status(200).json({ status: true, data: khachhang });
                }
            });
        } else {
            res.status(401).json({ "status": 401 });
        }

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});



//token
router.post("/sign-in", async function (req, res) {
    try {
        const { gmail, gioitinh } = req.body;
        var checkUser = await khachhangModel.findOne({ gmail: gmail, gioitinh: gioitinh });
        if (checkUser) {
            const token = JWT.sign({ gmail: gmail, gioitinh: gioitinh }, config.SECRETKEY, { expiresIn: '30s' });
            const refreshToken = JWT.sign({ gmail: gmail, gioitinh: gioitinh }, config.SECRETKEY, { expiresIn: '1h' });
            res.status(200).json({ status: true, message: "dang nhap thanh cong", token: token, refreshToken: refreshToken })
        } else {
            res.status(400).json({ status: true, message: "tai khoan khong dung" })
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "That Bai" })
    }
});



module.exports = router;