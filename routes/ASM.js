var express = require('express');
var router = express.Router();
const JWT = require('jsonwebtoken');
const config = require("../utils/configenv");


var khachhangModel = require("../ASMs/User")


//localhost:3000/ASM/

/**
 * @swagger
 * /ASM/add:
 *   post:
 *     summary: Thêm khách hàng mới
 *     tags: [Product]
 *     description: Tạo một khách hàng mới với thông tin được cung cấp.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên của khách hàng
 *               gmail:
 *                 type: string
 *                 description: Gmail của khách hàng
 *               matkhau:
 *                 type: string
 *                 description: Mật khẩu của khách hàng
 *               gioitinh:
 *                 type: string
 *                 description: Giới tính của khách hàng
 *               namsinh:
 *                 type: string
 *                 description: Năm sinh của khách hàng
 *     responses:
 *       200:
 *         description: Thêm khách hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "thanh cong"
 *       400:
 *         description: Thêm khách hàng thất bại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "that bai"
 */
//thêm
router.post("/add", async function (req, res) {
    try {
        const { name, gmail, matkhau, gioitinh, namsinh } = req.body;
        const itemAdd = { name, gmail, matkhau, gioitinh, namsinh };
        await khachhangModel.create(itemAdd);
        res.status(200).json({ status: true, message: "thanh cong" })

    } catch {
        res.status(400).json({ status: false, message: "that bai" })
    }
})

/**
 * @swagger
 * /ASM/list:
 *   get:
 *     summary: Lấy danh sách khách hàng
 *     tags: [Product]
 *     description: Trả về danh sách tất cả khách hàng trong cơ sở dữ liệu.
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID của khách hàng
 *                   name:
 *                     type: string
 *                     description: Tên của khách hàng
 *                   matKhau:
 *                     type: string
 *                     description: Mật khẩu của khách hàng
 *                   gmail:
 *                     type: string
 *                     description: Gmail của khách hàng
 *                   gioitinh:
 *                     type: string
 *                     description: Giới tính của khách hàng
 *                   namsinh:
 *                     type: string
 *                     description: Năm sinh của khách hàng
 *       500:
 *         description: Lỗi máy chủ
 */


//lay ds khach hang
router.get("/list", async function (req, res) {
    var data = await khachhangModel.find();
    res.json(data)
    // const token = req.header("Authorization").split(' ')[1];
    // if (token) {
    //     JWT.verify(token, config.SECRETKEY, async function (err, id) {
    //         if (err) {
    //             res.status(403).json({ "status": 403, "err": err });
    //         } else {
    //             //xử lý chức năng tương ứng với API

    //         }
    //     });
    // } else {
    //     res.status(401).json({ "status": 401 });
    // }

});


/**
 * @swagger
 * /ASM/khachhang/{id}:
 *   get:
 *     summary: Lấy thông tin khách hàng theo ID
 *     tags: [Product]
 *     description: Trả về thông tin chi tiết của khách hàng theo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khách hàng cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID của khách hàng
 *                     name:
 *                       type: string
 *                       description: Tên của khách hàng
 *                     matKhau:
 *                       type: string
 *                       description: Mật khẩu của khách hàng
 *                     gmail:
 *                       type: string
 *                       description: Gmail của khách hàng
 *                     gioitinh:
 *                       type: string
 *                       description: Giới tính của khách hàng
 *                     namsinh:
 *                       type: string
 *                       description: Năm sinh của khách hàng
 *       404:
 *         description: Không tìm thấy khách hàng
 *       500:
 *         description: Lỗi máy chủ
 */


//tim kh theo id
router.get("/khachhang/:id", async (req, res) => {
    try {
        const khachhang = await khachhangModel.findById(req.params.id);
        if (!khachhang) {
            return res.status(404).json({ status: false, message: "Không tìm thấy khách hàng" });
        }
        res.status(200).json({ status: true, data: khachhang });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});


//cap nhat thong tin
router.put("/khachhang/:id", async (req, res) => {
    try {
        const khachhang = await khachhangModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!khachhang) {
            return res.status(404).json({ status: false, message: "Không tìm thấy khách hàng" });
        }
        res.status(200).json({ status: true, data: khachhang });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

/**
 * @swagger
 * /ASM/khachhang/{id}:
 *   delete:
 *     summary: Xóa khách hàng theo ID
 *     tags: [Product]
 *     description: Xóa thông tin của khách hàng theo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khách hàng cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công, trả về thông báo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Khách hàng đã được xóa"
 *       404:
 *         description: Không tìm thấy khách hàng
 *       500:
 *         description: Lỗi máy chủ
 */


router.delete("/khachhang/:id", async (req, res) => {
    try {
        const khachhang = await khachhangModel.findByIdAndDelete(req.params.id);
        if (!khachhang) {
            return res.status(404).json({ status: false, message: "Không tìm thấy khách hàng" });
        }
        res.status(200).json({ status: true, message: "Khách hàng đã được xóa" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

router.get("/khachhang/tim-theo-ten", async (req, res) => {
    const { name } = req.query;
    try {
        const khachhangs = await khachhangModel.find({ name: new RegExp(name, 'i') });
        res.status(200).json({ status: true, data: khachhangs });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

router.get("/khachhang/tim-theo-namsinh", async (req, res) => {
    const { namsinh } = req.query;
    try {
        const khachhangs = await khachhangModel.find({ namsinh: namsinh });
        res.status(200).json({ status: true, data: khachhangs });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

//đếm tổng số
router.get("/khachhang/count", async (req, res) => {
    try {
        const count = await khachhangModel.countDocuments();
        res.status(200).json({ status: true, count });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

/**
 * @swagger
 * /khachhang/{id}/matkhau:
 *   put:
 *     summary: Cập nhật mật khẩu khách hàng
 *     tags: [Product]
 *     description: Cập nhật mật khẩu của khách hàng theo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khách hàng cần cập nhật mật khẩu
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Thông tin mật khẩu mới
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             matKhau:
 *               type: string
 *               description: Mật khẩu mới của khách hàng
 *     responses:
 *       200:
 *         description: Cập nhật thành công, trả về thông tin khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     matKhau:
 *                       type: string
 *                       description: Mật khẩu của khách hàng
 *       404:
 *         description: Không tìm thấy khách hàng
 *       500:
 *         description: Lỗi máy chủ
 */


// update mật khẩu
router.put("/khachhang/:id/matkhau", async (req, res) => {
    const { matKhau } = req.body;
    try {
        const khachhang = await khachhangModel.findByIdAndUpdate(req.params.id, { matKhau: matKhau }, { new: true });
        if (!khachhang) {
            return res.status(404).json({ status: false, message: "Không tìm thấy khách hàng" });
        }
        res.status(200).json({ status: true, data: khachhang });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});


// router.post("/sign-in", async function (req, res) {
//     try {
//         const { gmail, gioitinh } = req.body;
//         var checkUser = await khachhangModel.findOne({ gmail: gmail, gioitinh: gioitinh });
//         if (checkUser) {
//             const token = JWT.sign({ gmail: gmail, gioitinh: gioitinh }, config.SECRETKEY, { expiresIn: '20s' });
//             const refreshToken = JWT.sign({ gmail: gmail, gioitinh: gioitinh }, config.SECRETKEY, { expiresIn: '1d' });
//             res.status(200).json({ status: true, message: "dang nhap thanh cong", token: token, refreshToken: refreshToken })
//         } else {
//             res.status(400).json({ status: true, message: "tai khoan khong dung" })
//         }
//     } catch (e) {
//         res.status(400).json({ status: false, message: "That Bai" })
//     }
// });


module.exports = router;