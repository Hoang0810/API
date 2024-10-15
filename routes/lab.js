var express = require('express');
var router = express.Router();


var productModel = require("../models/product");
var upload = require('../utils/configmulter');
const fs = require('fs').promises;
var sendMail = require('../utils/configmail')


//kiểu methods Put - Post - Get - Delete
// localhost:3000/lab/

// lấy toàn bộ ds spham
router.get("/list", async function (req, res) {
    var data = await productModel.find();
    res.json(data)
});

// Lấy ds sản phẩm thuộc loại "xxx"

router.get("/danh-sach-loai", async function (req, res) {
    try {

        var { name } = req.query
        var list = await productModel.find({}, 'name')
        res.status(200).json({ status: true, list });
    } catch {
        res.status(400).json({ status: false, message: "That bai" });
    }
});
// lấy ds sản phẩm có số lượng dưới 100 ( so luong sp e có 10 nên e để 10)
router.get("/soluong", async function (req, res) {
    try {
        var list = await productModel.find({ quantity: { $lt: 10 } });
        res.status(200).json({ status: true, list });
    } catch {
        res.status(400).json({ status: false, message: "That bai" });
    }
});

//lấy ds sản phẩm có giá trên > 50 và số lượng dứi < 5

router.get("/gia-tren-5", async function (req, res) {
    try {
        var list = await productModel.find({
            $or: [
                { price: { $gt: 39 } },
                { quantity: { $lt: 5 } }
            ]
        });
        res.status(200).json({ status: true, list });
    } catch (error) {
        res.status(400).json({ status: false, message: "Thất bại" });
    }
});

// /timsp?name="ten-san-pham".
router.get("/timsp", function (req, res) {
    try {
        const { name } = req.query;
        var item = productModel.find(p => p.name == name);
        if (item != null) {
            res.status(302).json({ status: true, data: item });
        } else {
            res.status(404).json({ status: false });
        }
    } catch (p) {
        res.json({ status: false, message: "khong thay sp" })
    }
})


//them 1sp moi
router.post("/add", async function (req, res) {
    try {
        const { name, image, quantity, price, category } = req.body;
        const itemAdd = { name, image, quantity, price, category };
        await productModel.create(itemAdd);
        res.status(200).json({ status: true, message: "thanh cong" })

    } catch {
        res.status(400).json({ status: false, message: "that bai" })
    }
});

//Sửa thông tin 
router.post("/edit", async function (req, res, next) {
    try {
        const { id, name, price, quantity, image, category } = req.body;

        var item = await modelProduct.findById(id);
        if (item) {
            item.name = name ? name : item.name;
            item.price = price ? price : item.price;
            item.quantity = quantity ? quantity : item.quantity;
            item.image = image ? image : item.image;
            item.category = category ? category : item.category;
            await item.save();
            res.json({ status: 1, message: "Sửa sản phẩm thành công" });
        }
    } catch (err) {
        res.json({ status: 0, message: "Sửa sản phẩm thất bại" });
    }
});




//Xoa 1 sp

router.get("/delete", async function (req, res, next) {
    try {
        var id = req.query.id;
        await modelProduct.findByIdAndDelete(id);
        res.json({ status: 1, message: "Xóa sản phẩm thành công" });
    } catch (err) {
        res.json({ status: 0, message: "Xóa sản phẩm thất bại", err: err });
    }
});


// Sắp xếp theo giá từ thấp đến cao

router.get("/min-max", async function (req, res) {
    try {
        const { minPrice, maxPrice } = req.query;

        // Chuyển đổi giá thành số
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        if (isNaN(min) || isNaN(max) || min >= max) {
            return res.status(400).json({ status: false, message: "Giá không hợp lệ" });
        }
        // Điều kiện giá trong khoảng từ min đến max
        var list = await productModel.find({
            price: { $gte: min, $lte: max }
            // Sắp xếp theo giá từ thấp đến cao
        }).sort({ price: 1 });

        res.status(200).json({ status: true, list });
    } catch (error) {
        res.status(500).json({ status: false, message: "Thất bại", error: error.message });
    }
});

//lay ds sp thuoc Loai XXX va So luong lon hon YYY (X = id ; Y ng dung nhap vao)

// /list-loaisp?categoryId=123&quantity=10.
router.get("/list-loaisp", async function (req, res) {
    try {
        const { categoryId, quantity } = req.query;

        const query = {};
        if (categoryId) {
            query.category = categoryId;
        }
        if (quantity) {
            const qty = parseInt(quantity);
            if (!isNaN(qty)) {
                query.quantity = { $gte: qty };
            }
        }
        var list = await productModel.find(query).populate('category');
        res.status(200).json({ status: true, list });
    } catch (error) {
        res.status(400).json({ status: false, message: "Thất bại", error: error.message });
    }
});


// sắp xếp sản phẩm từ cao -> thấp

router.get("/max-min", async function (req, res) {
    try {
        const products = await productModel.find().populate('category').sort({ price: 1 });
        res.status(200).json({ status: true, list: products });
    } catch (error) {
        res.status(500).json({ status: false, message: "Có lỗi xảy ra", error: error.message });
    }
});

//tìm sp theo loại có giá cao nhất
// /max-price/:ID
router.get("/max-price", async function (req, res) {
    try {
        const { type } = req.query;
        const products = await productModel.find({
            "category._id": type,
        });

        if (products.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Không tìm thấy sản phẩm cho loại này",
            });
        }

        // Sử dụng Math.max để tìm giá cao nhất
        const maxPrice = Math.max(...products.map((product) => product.price));

        // Lọc sản phẩm có giá bằng giá cao nhất
        const maxPriceProducts = products.filter(
            (product) => product.price === maxPrice
        );
        // Trả về danh sách các sản phẩm có giá cao nhất
        res.status(200).json({
            status: true,
            message: "Thành công",
            maxPriceProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Thất bại",
        });
    }
});



module.exports = router;