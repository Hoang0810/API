var express = require('express');
var router = express.Router();

const JWT = require('jsonwebtoken');
const config = require("../utils/configenv");

var khachhangModel = require("../ASMs/User")
var productModel = require('../ASMs/sanpham');

// var upload = require('../utils/configmulter');
// const fs = require('fs').promises;
// var sendMail = require('../utils/configmail')


//kiểu methods Put - Post - Get - Delete
// localhost:3000/san-pham/

router.get("/list", async function (req, res) {
    var data = await productModel.find().populate('category');
    res.json(data)

})

// lấy toàn bộ ds spham

// router.get("/list", async function (req, res) {
//     try {
//         const token = req.header("Authorization").split(' ')[1];
//         if (token) {
//             JWT.verify(token, config.SECRETKEY, async function (err, id) {
//                 if (err) {
//                     res.status(403).json({ "status": 403, "err": err });
//                 } else {
//                     //xử lý chức năng tương ứng với API
//                     var data = await productModel.find().populate('size category');
//                     res.json(data)
//                 }
//             });
//         } else {
//             res.status(401).json({ "status": 401 });
//         }
//     } catch {
//         res.status(400).json({ status: false, message: "that bai" })
//     }
// });

//add
router.post("/add", async function (req, res) {

    //xử lý chức năng tương ứng với API
    const { name, image, mota, price, category } = req.body;
    const itemAdd = { name, image, mota, price, category };
    await productModel.create(itemAdd);
    res.status(200).json({ status: true, message: "thanh cong" })

    // try {
    //     const token = req.header("Authorization").split(' ')[1];
    //     if (token) {
    //         JWT.verify(token, config.SECRETKEY, async function (err, id) {
    //             if (err) {
    //                 res.status(403).json({ "status": 403, "err": err });
    //             } else {

    //             }
    //         });
    //     } else {
    //         res.status(401).json({ "status": 401 });
    //     }

    // } catch {
    //     res.status(400).json({ status: false, message: "that bai" })
    // }
});

router.delete("/delete/:id", async (req, res) => {

    const khachhang = await productModel.findByIdAndDelete(req.params.id);
    if (!khachhang) {
        return res.status(404).json({ status: false, message: "Không tìm thấy Sản Phẩm" });
    }
    res.status(200).json({ status: true, message: "Sản Phẩm đã được xóa" });

    // try {
    //     const token = req.header("Authorization").split(' ')[1];
    //     if (token) {
    //         JWT.verify(token, config.SECRETKEY, async function (err, id) {
    //             if (err) {
    //                 res.status(403).json({ "status": 403, "err": err });
    //             } else {
    //                 //xử lý chức năng tương ứng với API

    //             }
    //         });
    //     } else {
    //         res.status(401).json({ "status": 401 });
    //     }
    // } catch (error) {
    //     res.status(500).json({ status: false, message: error.message });
    // }
});


//cap nhat thong tin
router.put("/update/:id", async (req, res) => {
    //xử lý chức năng tương ứng với API
    const khachhang = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!khachhang) {
        return res.status(404).json({ status: false, message: "Không tìm thấy Sản Phẩm" });
    }
    res.status(200).json({ status: true, data: khachhang });

    // try {
    //     const token = req.header("Authorization").split(' ')[1];
    //     if (token) {
    //         JWT.verify(token, config.SECRETKEY, async function (err, id) {
    //             if (err) {
    //                 res.status(403).json({ "status": 403, "err": err });
    //             } else {

    //             }
    //         });
    //     } else {
    //         res.status(401).json({ "status": 401 });
    //     }

    // } catch (error) {
    //     res.status(500).json({ status: false, message: error.message });
    // }
});


/**
 * @swagger
 * /san-pham/sign-in:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [San-Pham]
 *     description: Xác thực người dùng và trả về JWT cùng với refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gmail:
 *                 type: string
 *                 description: Địa chỉ email của người dùng.
 *               gioitinh:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: Giới tính của người dùng.
 *     responses:
 *       200:
 *         description: Thành công, trả về token và refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "dang nhap thanh cong"
 *                 token:
 *                   type: string
 *                   example: "your_jwt_token_here"
 *                 refreshToken:
 *                   type: string
 *                   example: "your_refresh_token_here"
 *       400:
 *         description: Thông tin tài khoản không đúng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "tai khoan khong dung"
 *       500:
 *         description: Lỗi máy chủ
 */

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