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

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu người dùng vào cơ sở dữ liệu
        const newUser = new User({
            name,
            password: hashedPassword,
            gmail
        });

        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error });
    }
});

// Đăng nhập người dùng
router.post("/login", async (req, res) => {
  const { gmail, password } = req.body;

  try {
      // Kiểm tra xem email có tồn tại không
      const user = await User.findOne({ gmail });
      if (!user) {
          return res.status(400).json({ message: 'Tài khoản không tồn tại' });
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Mật khẩu sai' });
      }

      // Nếu mật khẩu đúng, trả về thông tin người dùng
      res.json({ message: 'Đăng nhập thành công', user: { id: user._id, name: user.name, gmail: user.gmail } });
  } catch (error) {
      res.status(500).json({ message: 'Đã có lỗi xảy ra', error });
  }
});

module.exports = router;
