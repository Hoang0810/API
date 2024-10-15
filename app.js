var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Khởi tạo app trước
var app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/configSwagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // ->đường link dẩn tới 


//config mongoose
const mongoose = require('mongoose');
require("./models/category");
require("./models/product");
require("./models/userr");

//ASM
require("./ASMs/CTHD");
require("./ASMs/danhsachSPyeuthich");
require("./ASMs/hoadon");
require("./ASMs/khachhang");
require("./ASMs/loaisanpham");
require("./ASMs/payment");
require("./ASMs/sanpham");
require("./ASMs/size");


//connect database
mongoose.connect('mongodb+srv://tuanne:Thuytinh0@tuanhoang.8gqcl.mongodb.net/ASM')
  // mongoose.connect('mongodb+srv://tuanne:Thuytinh0@tuanhoang.8gqcl.mongodb.net/md19201')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

//B1
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var nhansuRouter = require('./routes/nhansu');
var categoryRouter = require('./routes/category');
var labRouter = require('./routes/lab');
var asmRouter = require('./routes/ASM')
var loaiSpRouter = require('./routes/Loaisp');
var sizeRouter = require('./routes/Size');
var sanphamRouter = require('./routes/sanpham');
//ASM


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//B2
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/nhansu', nhansuRouter);
app.use('/category', categoryRouter);
app.use('/lab', labRouter);
app.use('/ASM', asmRouter);
app.use('/loai-sp', loaiSpRouter);
app.use('/size', sizeRouter);
app.use('/san-pham',sanphamRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
