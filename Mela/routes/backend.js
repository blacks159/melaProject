var express = require('express');
const { get } = require('./users');
var router = express.Router();
// 引用獨立sql
const db = require(__dirname + '/db_connect');
console.log('ok');

// 後台活動頁
router.get('/backendMember',function(req,res,next){

    var backendMembersql = 'SELECT * FROM `member`';

    db.query(backendMembersql,function(err,result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
          } else {
            res.render('backendMember', {backendMembersql: result});
          }
    });
});

router.post('/backendMember',function(req,res,next){
    db.query(
      "insert into member set mName =? ",
      [
        req.body.memberName,
      ]
    );
    console.log('post_ok');
    res.redirect('backendMember')
    next();
  });



module.exports = router;