var express = require('express');
const { compile } = require('morgan');
const { json } = require('express');
var router = express.Router();
const db = require(__dirname + '/db_connect');
var session = require('express-session');

var name;
var phone;
var account;
var email;
var pass;
// 會員購買

router.get('/melaShopBox', function (req, res, next) {
    result = req.session.result;
    res.render('melaShopBox', { result, user: req.session.user });
   });


router.get('/melaShopPayment', function (req, res, next) {
    result = req.session.result;
    res.render('melaShopPayment',{ result, user: req.session.user});
    next();
});

router.get('/melaShopOrder', function (req, res, next) {
    res.render('melaShopOrder',{result,  user: req.session.user});
    next();
});

// 訂單輸入資料庫
router.post('/melaShopOrder', function (req, res, next) {
    result = req.session.result;
     var x = 0;
    x = result[0].mID;
    db.query(
        'insert into product_order set mID=?,poPrice=?, poName=?, poAddress=?,poPhone=?,poMemo=?,poPayMethod=?,poReciptMethod=?,poDeliver=?,poDate=?',
        [
            result[0].mID,
            req.body.total,
            req.body.delName,
            req.body.delAdr,
            req.body.delphone,
            req.body.memo,
            req.body.delpay,
            req.body.recieptMethod,
            "訂單處理中",
            "2020-08-17"
        ]
    );

    //從資料庫調出poID 
    var sqlq = 'select poID from product_order where mID=' + result[0].mID + '  ORDER BY poID desc LIMIT 0 , 1';
    db.query(sqlq, function (err, resultq) {
        if (err) {
            res.send("mysql erro");    //    資料庫錯誤
            console.log(err);
        }
        else {
                     db.query(
                'insert into `product_order_info`(`poID`,`pID`, `pNum`) VALUES (?,?,?)',
                [
                    resultq[0].poID,
                    req.body.list,
                    req.body.amount
                ]
            )
        }
    })

})

//訂單輸入訂單明細Table

router.get('/melaShopList', function (req, res, next) {
    //取得登入會員的ID
    result = req.session.result;
     resultq = db.query('select poID from product_order where mID="' + result[0].mID + '"  ORDER BY poID desc LIMIT 0 , 1'
    );
   
    var sql = 'select * from product_order where mID="' + result[0].mID + '"  ORDER BY poID desc LIMIT 0 , 1';
    db.query(sql, function (err, row) {    //    執行sql語句，並返回結果
        if (err) {
            res.send("mysql erro");    //    資料庫錯誤
            console.log(err);
        } else {
          
            var sql2 = 'select * from product_order_info where poID="' + result[0].poID + '"  ORDER BY poID desc LIMIT 0 , 1';
            db.query(sql2, function (err, row2) {
                console.log("sql2:" + JSON.stringify(row2))
                res.render('melaShopList', { row, row2, result, user: req.session.user });
            })
        }
    })

});

module.exports = router;