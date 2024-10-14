var express = require('express');
var router = express.Router();
var productModel = require("../models/product");
var upload = require('../utils/configmulter');
const fs = require('fs').promises; 
var sendMail = require('../utils/configmail');
const userr = require('../models/userr');
const { JsonWebTokenError } = require('jsonwebtoken');

/**
 * @swagger
 * /product/list:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *         
 */
router.get('/list', async function(req, res, next) {
    var list = await products.find();
    res.status(200).json(list);
  });

  
// lấy toàn bộ ds spham
router.get("/list", async function(req, res){
    try{
        // var {price} = req.query
        // await.productModel.find();
        var {name} = req.query
        // var list = await productModel.find({name: name}, "name price");
        var list = await productModel.find().populate('category')
        res.status(200).json({status:true, list});
    }catch{
        res.status(400).json({status: false, message:"That bai"});
    }
});

router.post("/add", async function(req, res){
    try{
        const {name, image, quantity, price, category}  = req.body;
        const itemAdd = {name, image, quantity, price, category};
        await productModel.create(itemAdd);
        res.status(200).json({status:true, message: "thanh cong"})

    }catch{
        res.status(400).json({status:false, message:"that bai"})
    }
})

//Upload single file
router.post('/upload', [upload.single('image')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });

    // Upload multiple file

router.post('/uploads', [upload.array('image', 9)],
    async (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
               return res.json({ status: 0, link : [] }); 
            } else {
              const url = [];
              for (const singleFile of files) {
                url.push(`http://localhost:3000/images/${singleFile.filename}`);
              }
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : [] });
        }
    });


    //send mail
    router.post("/send-mail", async function(req, res, next) {
        try {
          const { to, subject } = req.body;
          // Đọc nội dung tệp HTML
          const content = await fs.readFile('bai1.html', 'utf-8');
          const mailOptions = {
            from: "Tứn Nè <a.tuan08101999@gmail.com>",
            to: to,
            subject: subject,
            html: content, // Sử dụng nội dung của tệp HTML
          };
      
          await sendMail.transporter.sendMail(mailOptions);
          res.json({ status: 1, message: "Gửi mail thành công" });
        } catch (err) {
          console.error(err); // Ghi lại lỗi để kiểm tra
          res.json({ status: 0, message: "Gửi mail thất bại" });
        }
      });
      

router.post("/sign-in", async function(req, res, next) {
try{
const {userName, passWord} = req.body;
var checkUser = await userr.findOne({userName: userName, passWord: passWord})
if(checkUser){
    const token = JWT.sign({id: userName},config.SECRETKEY,{expiresIn: '30s'});
    const refreshToken = JWT.sign({id: userName},config.SECRETKEY,{expiresIn: '1h'})

    res.status(200).json({status: true, message: "thanh cong"});
}else{
    res.status(400).json({status: true, message: "khong tim thay"});
}
}catch(e){  
    res.status(400).json({status: false, message: "sai roi" + e});
}
})

//kiểu methods Put - Post - Get - Delete
module.exports = router;