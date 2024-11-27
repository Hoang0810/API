var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var User = require("../ASMs/User")

//  users/
router.get("/list", async(req, res) => {
  var data = await User.find();
  res.json(data)
})
// Đăng ký người dùng
router.post("/register", async (req, res) => {
    const { name, password, gmail } = req.body;

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ gmail });
        if (existingUser) {
            return res.status(400).json({ message: 'Email này đã được đăng ký' });
        }

        const newUser = new User({
            name ,
            password,
            gmail,
        });

        await newUser.save();

        res.status(201).json({status: true, message: 'Đăng ký thành công', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error });
    }
});

// Đăng nhập người dùng
router.post("/login", async (req, res) => {
  const { gmail, password } = req.body;

  try {
      const user = await User.findOne({ gmail });
      if (!user) {
          return res.status(400).json({ message: 'Tài khoản không tồn tại' });
      }

      const isMatch = await (password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Mật khẩu sai' });
      }
      res.json({status: true,  message: 'Đăng nhập thành công', user: { password: user.password, gmail: user.gmail } });
  } catch (error) {
      res.status(500).json({ message: 'Đã có lỗi xảy ra', error });
  }
});

module.exports = router;
