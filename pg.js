var pg = require('pg');

var config = {  
    host:"127.0.0.1",
    user:"root",
    database:"spider",
    password:"syz0615",
    port:5432,
    max:20, // 连接池最大连接数
    idleTimeoutMillis:3000, // 连接最大空闲时间 3s
}

var pool = new pg.Pool(config);

var query = function(sql, sqlparam, callback) {
    pool.connect(function(err, conn, done) {
        if (err) {
            console.log(err)
            callback(err, null, null);
        } else {
            conn.query(sql, sqlparam, function(err, result) {
                done();
                callback(err, result);  
            });
        }
    });
};

var query_noparam = function(sql, callback) {
    pool.connect(function(err, conn, done) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function(err, result) {
                conn.release(); 
                callback(err, result); 
            });
        }
    });
};

exports.query = query;
exports.query_noparam = query_noparam;