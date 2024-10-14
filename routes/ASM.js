var express = require('express');
var router = express.Router();

var khachhangModel = require ("../ASMs/khachhang")


//localhost:3000/ASM/

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
 
//lay ds khach hang
router.get("/list", async function (req, res) {
    var data = await khachhangModel.find();
    res.json(data)
});


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




module.exports = router;