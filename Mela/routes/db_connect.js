const mysql = require('mysql');
// 建立連線物件
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mela'
});

db.on('error', ex=>{
    console.log(ex);
});
db.connect(function (err) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    else {
      console.log('connection mysql')
    }
  });
module.exports = db;