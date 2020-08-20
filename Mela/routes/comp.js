var express = require('express');
const { compile } = require('morgan');
var router = express.Router();
// 引用獨立sql
const db = require(__dirname + '/db_connect');

router.get('/melaPlaceBox', function (req, res, next) {
    result = req.session.user;
    res.render('melaPlaceBox', { result });
    next();
});

router.get('/melaPlacePayment', function (req, res, next) {
    result = req.session.user;
    res.render('melaPlacePayment', { result });
    next();
});

router.get('/melaPlaceOrder', function (req, res, next) {
    res.render('melaPlaceOrder', { result });
    next();
});

// 訂單輸入資料庫
router.post('/melaPlaceOrder', function (req, res, next) {
    result = req.session.user;
    db.query(
        'insert into `com_product_order`(`mID`,`mName`,`cpoName`, `cpoPhone`, `cpoEmail`,`cpoNumber`,`cpoPrice`,`cpoPayMethod`,`cpoReciptMethod`,`cpoDate`) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [
            result[0].mID,
            req.body.Name,
            req.body.comName,
            "",
            req.body.email,
            req.body.comAmount,
            req.body.comTotal,
            req.body.payMethod,
            req.body.recieptMethod,
            new Date()
        ]
    );
    console.log("melaPlaceOrder:" + result)
});

router.get('/melaPlaceList', function (req, res, next) {
    //取得登入會員的ID
    result = req.session.user;
    var sql = 'select * from `com_product_order` where mID="' + result[0].mID + '"  ORDER BY cpoID desc LIMIT 0 , 1';
    db.query(sql, function (err, row) {    //    執行sql語句，並返回結果
        if (err) {
            res.send("mysql erro");    //    資料庫錯誤
            console.log(err);
        } else {
            console.log("list: " + JSON.stringify(row));
            res.render('melaPlaceList', { row, result });
        }
    })
});

module.exports = router;
