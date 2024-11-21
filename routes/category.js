var express = require('express');
var router = express.Router();
var categoryModel = require('../models/category');

router.get("/list", async function (req, res) {
    var data = await categoryModel.find();
    res.json(data)

})



router.post('/add', async function(req, res , next){
    try{
        const {name, image} = req.body;
        const addItem = {name, image};
        await categoryModel.create(addItem);
        res.status(200).json({status: true, message: "Thanh cong"})
    }catch{
        res.status(400).json({status: false, message: "That Bai"})
    }
});

router.put('/edit', async function(req, res) {
    try {
        const { id, name, image } = req.body;

        // Tìm kiếm mục cần cập nhật
        let itemUpdate = await categoryModel.findById(id);

        if (!itemUpdate) {
            // Nếu không tìm thấy mục, trả về thông báo lỗi
            return res.status(404).json({ status: false, message: "Không tìm thấy" });
        }

        // Cập nhật các trường nếu có
        itemUpdate.name = name ? name : itemUpdate.name;
        itemUpdate.image = image ? image : itemUpdate.image;
q
        // Lưu lại mục đã cập nhật
        await itemUpdate.save();
        res.status(200).json({ status: true, message: "Thành công" });

    } catch (e) {
        res.status(400).json({ status: false, message: "Thất bại" });
    }
});



module.exports = router;