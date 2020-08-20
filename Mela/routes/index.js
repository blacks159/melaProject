var express = require('express');
var router = express.Router();

/* GET home page. */
// 首頁
router.get('/', function (req, res, next) {
  res.render('melaIndex',{ user: req.session.user });
});

//活動頁
router.get('/melaEvent', function (req, res, next) {
  res.render('melaEvent',{ user: req.session.user });
});

//活動細節
router.get('/melaEventinfo', function (req, res, next) {
  res.render('melaEventinfo',{ user: req.session.user });
});

// 方案購買
router.get('/melaShop', function (req, res, next) {  
  req.session.url = '/shop/melaShopBox';
  res.render('melaShop',{ user: req.session.user });
});

// 產地介紹
router.get('/melaPlace', function (req, res, next) {
  res.render('melaPlace',{ user: req.session.user });
});

module.exports = router;
