var express = require('express');
var router = express.Router();
var session = require('express-session');
// 引用獨立sql
const db = require(__dirname + '/db_connect');

//註冊
router.get("/memberRegister", function (req, res, next) {
  res.render('memberRegister', { user: req.session.user })
})
var text = "";
router.post("/memberRegister", function (req, res, next) {
  db.query(
    `insert into member set mName =?, mPhone = ?, mAccount = ?, mPass = ?, mEmail=?`,
    [
      req.body.userName,
      req.body.userPhone,
      req.body.useraccount,
      req.body.userpwd,
      req.body.useraccount
    ]
  );
  console.log('post_ok');
  res.redirect('memberLogin')
  next();
})

//登入
var name;
var phone;
var account;
var pass;
var ID;

// 取得網頁
router.get("/memberLogin", function (req, res, next) {
  res.render('memberLogin', { user: req.session.user })
})
// 送出表單
router.post('/memberLogin', function (req, res, next) {
  var sql = 'select * from member WHERE mAccount = "' + req.body.useraccount_login + '" and mPass="' + req.body.userpwd_login + '" ';;
  db.query(sql, function (err, result) {    //    執行sql語句，並返回結果
    if (err) {
      res.send("mysql erro");    // 錯誤回報
      console.log(err);
    } else if (result.length == 0) {  //字串是空的導回登入頁
      text = [{ message: "請先註冊" }];
      console.log(JSON.stringify(text));
      res.render("memberLogin");
    } else {
      var a;
      var pareseResult;
      var result;
      a = JSON.stringify(result);
      pareseResult = JSON.parse(a);
      req.session.user = pareseResult[0].mName;
      req.session.result = result;   
      ID = result[0].mID;
      phone = result[0].mPhone;
      account = result[0].mAccount;
      pass = result[0].mPass;
      email = result[0].mEmail;
      
    }
    if (req.session.url=="/shop/melaShopBox") {
      res.redirect("/shop/melaShopBox");
    } else {
      res.redirect("/users/memberEdit");
    };
    console.log(result);
  })
  // 判斷路由
  

  })

//登出
router.get('/memberLogout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/users/memberLogin');
})


//會員頁

router.get('/memberEdit', function (req, res, next) {

  req.session.user
  console.log(req.session.user);
  res.render('memberEdit', { name, phone, account, ID,pass, user: req.session.user });// 第二參數撈資料

});

//member_myedit頁的資料更新(修改)
router.post("/memberEdit", function (request, response) {
  db.query(
    `UPDATE member \SET  mName = '${request.body.userName}', mPhone = '${request.body.userPhone}', mAccount = '${request.body.userAccount}',mEmail= '${request.body.userAccount}' \WHERE mID = ${ID}`
  );
})

// 修改密碼頁
router.get('/memberPass', function (req, res, next) {
  // res.send('secret page');
  res.render('memberPass', { name, ID, user: req.session.user });
});

router.post("/memberPass", function (request, response) {
  db.query(
    `UPDATE member \SET  mPass = '${request.body.userPassc}' \WHERE mID = ${ID}`
  );
})






//活動頁
router.get('/memberEvent', function (req, res, next) {

  var sqlevent = 'SELECT `cpoID`,`eDate`,`cpoPay`,`cpoPrice`,`eName`,`cpoNumber`,`cpoPrice`,`cpoSs` FROM `com_product_order` INNER JOIN `event`on com_product_order.cpID = event.emID AND com_product_order.mID = "' + ID + '"';

  db.query(sqlevent, function (err, result) {

    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
    } else {
      res.render('memberEvent', { memberEventData: result, name: name, ID: ID, user: req.session.user });
    }

    return;
  });
});



//方案頁
router.get('/memberOrder', function (req, res, next) {

  // 使用join 針對相應的mid 取值
  var sqlshop = 'SELECT product_order.`poID`,`poDate`,`poPayMethod`,product_order_info.`pID`,product_order.`poPrice`,`poDeliver`FROM `product_order` INNER JOIN `product_order_info`on product_order.poID = product_order_info.poID AND product_order.mID = "' + ID + '"';

  // var sqlshop = 'select * from product_order WHERE mID = "' + ID + '"';
  // let result.poDate = new Date().getDate();
  db.query(sqlshop, function (err, result) {

    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
    } else {
      res.render('memberOrder', { memberOrderData: result, name: name, ID: ID, user: req.session.user });
    } 

    return;
  });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;