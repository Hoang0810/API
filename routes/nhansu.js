var express = require('express');
var router = express.Router();


var nhanVien = [
    { id: 1, tenNhanVien: "Tuấn", chucVu: "Nhân Viên", phongBan: "Phòng thường", luongCoBan: 10900000 },
    { id: 2, tenNhanVien: "Hoàng", chucVu: "Boss Chính", phongBan: "Phòng Vip", luongCoBan: 11000000 },
    { id: 3, tenNhanVien: "Anh", chucVu: "Nhân Viên", phongBan: "Phòng pro", luongCoBan: 13900000 },
    { id: 4, tenNhanVien: "Tứn", chucVu: "Boss phụ", phongBan: "Phòng pro max", luongCoBan: 19900000 },
    { id: 5, tenNhanVien: "HAnh", chucVu: "Nhân Viên", phongBan: "Phòng Chờ", luongCoBan: 10000000 },
    { id: 6, tenNhanVien: "Huấn", chucVu: "Trùm Phụ", phongBan: "Phòng Khách", luongCoBan: 21900000 },
    { id: 7, tenNhanVien: "Toàng", chucVu: "Trùm Cuối", phongBan: "Phòng Boss nhỏ", luongCoBan: 25000000 },
    { id: 8, tenNhanVien: "Tanh", chucVu: "Nhân Viên", phongBan: "Phòng Chờ", luongCoBan: 10900000 },
    { id: 9, tenNhanVien: "Tứn Nè", chucVu: "Trưởng phòng", phongBan: "Phòng Khách", luongCoBan: 17000000 },
    { id: 10, tenNhanVien: "Tứnnnnnnnn", chucVu: "Boss", phongBan: "Phòng Vjp Pro Max", luongCoBan: 99900000 },
]
// localhost:3000/nhansu/
router.get("/", function (req, res) {
    res.json(nhanVien)
})
// /timnhanvien?id=
router.get("/timnhanvien/", function (req, res) {
    try {
        const { id } = req.query
        var item = nhanVien.find(p => p.id == id);
        if (item != null) {
            res.status(302).json({ status: true, data: item });
        } else {
            res.status(404).json({ status: false });
        }
    } catch (p) {
        res.json({ status: false, message: "không tìm thấy nv qua ID này" })
    }
})

// Thêm 1 nv mới
router.post("/add", function (req, res) {
    try {
        
        const { id,tenNhanVien, chucVu, phongBan, luongCoBan } = req.body;
        nhanVien.push({ id, tenNhanVien, chucVu, phongBan, luongCoBan });
        res.json({ status: true, message: "Add Thanh cong" });
    } catch (e) {
        res.json({ status: false, message: "add that bai" })
    }
})

//Sửa thông tin 
router.put("/edit", function (req, res) {
    try {
        const {id} = req.query;
        const {tenNhanVien, chucVu, phongBan, luongCoBan } = req.body;
        const itemEdit = nhanVien.find(p => p.id == id);
        
        if (!itemEdit) {
            return res.status(404).json({ status: false, message: "Nhân viên không tồn tại" });
        }

        itemEdit.tenNhanVien = tenNhanVien;
        itemEdit.chucVu = chucVu;
        itemEdit.phongBan = phongBan;
        itemEdit.luongCoBan = luongCoBan;

        res.status(200).json({ status: true, message: "Chỉnh sửa thành công", data: itemEdit });
    } catch (e) {
        res.status(500).json({ status: false, message: "Có lỗi xảy ra" });
    }
});


module.exports = router;