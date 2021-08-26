var express = require('express');
var router = express.Router();
var pgsql = require('../pg.js');
var md5 = require("md5");
const uuidv1 = require('uuid/v1');
const Jwt = require('../jwt');
const { JsonWebTokenError } = require('jsonwebtoken');
const e = require('express');

// router.get('/', function(req, res, next) {
//     var jwt = new Jwt(1);
//     var token = jwt.generateToken();
//     console.log(token);
//     res.render('show');
// });
// router.get('/', function (req, res, next) {
//     res.render('index');
// });
router.get('/', function (req, res, next) {
    res.render('index');
});
router.get('/index', function (req, res, next) {
    res.render('index');
});
router.get('/show',function (req,res,next) {
    res.render('show2');
});

router.get('/title', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    var username = req.cookies.username;
    if (typeof (username) != undefined) {
        var fetchSql = "select url,source_name,title,publish_date " + "from news where title like '%" + req.query.title + "%' Order By publish_date desc";
        pgsql.query_noparam(fetchSql, function (err, result, fields) {
            console.log(JSON.stringify(result.rows));
            if (err) {
                console.log(err);
                return;
            }

            var fetchAddSql = 'INSERT INTO ActionLogs (username, action)' + 'VALUES ($1, $2)';
            var fetchAddSql_Params = [username, 'title query: ' + req.query.title];
            pgsql.query(fetchAddSql, fetchAddSql_Params, function (err, result) {
                if (err) {
                    console.log(err);
                }
            })
            res.status = true;
            
            res.end(JSON.stringify(result.rows));
        });
    }
});

router.get('/source_name', function (req, res) {
    var username = req.cookies.username;
    if (typeof (username) != undefined) {
        var fetchSql = "select url,source_name,title,publish_date " +
            "from news where source_name like '%" + req.query.source_name + "%' Order By publish_date desc";
        pgsql.query_noparam(fetchSql, function (err, result, fields) {
            if (err) {
                console.log(err);
                return;
            }

            var fetchInsertSql = 'INSERT INTO ActionLogs (username, action)' + 'VALUES ($1, $2)';
            var fetchInsertSql_Params = [username, 'source_name query: ' + req.query.source_name];
            pgsql.query(fetchInsertSql, fetchInsertSql_Params, function (err, result) {
                if (err) {
                    console.log(err);
                }
            })

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end(JSON.stringify(result.rows));
        });
    }
});

router.get('/keyword', function (req, res) {
    var username = req.cookies.username;
    if (typeof (username) != undefined) {
        var fetch = "select news.url,news.title,news.source_name,keywords.word " +
            "from keywords,news where keywords.word like '%" + req.query.keyword + "%' and news.id_news=keywords.id_news";
        pgsql.query_noparam(fetch, function (err, result, fields) {
            if (err) {
                console.log(err);
                return;
            }
            var fetchAddSql = 'INSERT INTO ActionLogs (username, action)' + 'VALUES ($1, $2)';
            var fetchAddSql_Params = [username, 'Keyword Query: ' + req.query.keyword];
            pgsql.query(fetchAddSql, fetchAddSql_Params, function (err, result) {
                if (err) {
                    console.log(err);
                }
            })

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end(JSON.stringify(result));
        });
    }
});

router.get('/keywords', function (req, res) {
    var username = req.cookies.username;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    console.log(username);
    if (typeof (username) != undefined) {
        var fetchSql = "SELECT publish_date,count(*) as Num FROM news WHERE content like '%" + req.query.keyword + "%' group by publish_date order by publish_date desc;";

        pgsql.query_noparam(fetchSql, function (err, result, fields) {
            if (err) {
                console.log(err);
                return;
            }
            var fetchAddSql = 'INSERT INTO ActionLogs (username, action)' + 'VALUES ($1, $2)';
            var fetchAddSql_Params = [username, 'keyword Query : ' + req.query.keyword];
            pgsql.query(fetchAddSql, fetchAddSql_Params, function (err, result) {
                if (err) {
                    console.log(err);
                }
            })
            res.status = true;
            res.end(JSON.stringify(result.rows));
        });
    }
});

module.exports = router;

router.post('/login', function (req, res) {
    var username = req.body.name;
    var password = req.body.passwd;
    var response = {};
    var fetchSql = "SELECT password,authority FROM users WHERE username =$1;";
    var fetch_name_Sql_Params = [username];
    pgsql.query(fetchSql, fetch_name_Sql_Params, function (err, result, fields) {
        if (err) {
            console.log(err);
            return;
        }
        if (result.rows[0] == null) {
            response.status = '该用户名没有被注册';
            // console.log(response);
            res.end(JSON.stringify(response));
            return;
        }
        passwd = result.rows[0].password;
        authority = result.rows[0].authority;
        if (password == passwd) {
            var fetchInsertSql = 'INSERT INTO ActionLogs (username, action)' + 'VALUES ($1, $2);';
            var fetchInsertSql_Params = [username, 'login'];
            pgsql.query(fetchInsertSql, fetchInsertSql_Params, function (err, result) {
                if (err) {
                    console.log(err);
                }
            })
            if (authority) {
                response.status = '登录成功';
                res.cookie("username", username);
                res.end(JSON.stringify(response));
                return;
            }
            else {
                response.status = '该用户没有权限';
                // res.cookie("username", username);
                res.end(JSON.stringify(response));
                return;

            }
        } else {
            response.status = '密码错误';
            // console.log(response);
            res.end(JSON.stringify(response));
            return;
        }
    });
});

router.post('/register', function (req, res) {
    var response = {}
    var name = req.body.name;
    // console.log(name);
    var password = req.body.passwd;
    // console.log(password);
    var fetchSql = "SELECT username FROM users WHERE username = $1;";
    var fetch_name_Sql_Params = [name];
    pgsql.query(fetchSql, fetch_name_Sql_Params, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        if (result.rows[0] == null) {            //该username没有被注册过
            var AddSql = 'INSERT INTO users (uuid,username, password,authority)'
                + 'VALUES ($1, $2,$3,$4);';
            var newsAddSql_Params = [uuidv1(), name, password, 'true'];
            pgsql.query(AddSql, newsAddSql_Params, function (err, result) {
                if (err) {
                    response.status = "注册失败";
                    // console.log(response);
                    res.end(JSON.stringify(response));
                    return;
                } else {
                    var fetchInsertSql = 'INSERT INTO ActionLogs (username, action)' + 'VALUES ($1, $2);';
                    var fetchInsertSql_Params = [name, 'register'];
                    pgsql.query(fetchInsertSql, fetchInsertSql_Params, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                    })
                    response.status = "注册成功";
                    res.end(JSON.stringify(response));
                    return;
                }
            });
        } else {
            response.status = "该用户已经注册过";
            console.log(response);
            res.end(JSON.stringify(response));
            return
        }
    });
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/chart', function (req, res) {
    res.render('chart');
});
router.get('/chart2', function (req, res) {
    res.render('chart2');
});

router.get('/get_source_num', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    var fetchSql = "SELECT source_name,count(*) FROM news group by source_name;";
    pgsql.query_noparam(fetchSql, function (err, result, fields) {
        console.log(JSON.stringify(result.rows));
        res.end(JSON.stringify(result.rows));
        // console.log(res);
    });
});

router.get('/get_keyword_num', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    var fetchSql = "SELECT word,count(*) as num FROM keywords group by word order by num desc;";
    pgsql.query_noparam(fetchSql, function (err, result, fields) {
        console.log(JSON.stringify(result.rows));
        res.end(JSON.stringify(result.rows));
    });
});


router.get('/administrate', function (req, res) {
    res.render("administrate");
});


router.get('/get_user_info', function (req, res) {
    var fetchSql = "SELECT username,authority FROM users;";
    pgsql.query_noparam(fetchSql, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        console.log(JSON.stringify(result.rows));
        res.end(JSON.stringify(result.rows));
    });
});

router.get('/get_user_logs', function (req, res) {
    console.log(req.query.username);
    var fetchSql = "SELECT username,action,operation_time FROM ActionLogs where username = $1;";
    var fetch_Params = [req.query.username];
    pgsql.query(fetchSql, fetch_Params, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        console.log(JSON.stringify(result.rows));
        res.end(JSON.stringify(result.rows));
    });
});

router.get('/administrate_off', function (req, res) {
    var response = {};
    var fetchDeleteSql = "UPDATE users SET authority = 'false' WHERE username = $1;";
    var fetch_Sql_Params = [req.query.username];

    pgsql.query(fetchDeleteSql, fetch_Sql_Params, function (err, result, fields) {
        if (err) {
            console.log(err);
            response.status = false;
            res.end(JSON.stringify(response));
        }
        response.status = true;
        res.end(JSON.stringify(response));
    })
});

router.get('/administrate_open', function (req, res) {
    var response = {};
    var fetchAddSql = "UPDATE users SET authority = 'true' WHERE username = $1;";
    var fetchAddSql_Params = [req.query.username];
    pgsql.query(fetchAddSql, fetchAddSql_Params, function (err, result, fields) {
        if (err) {
            console.log(err);
            response.status = false;
            res.end(JSON.stringify(response));
        }
        response.status = true;
        res.end(JSON.stringify(response));
    })
});

router.get('/get_user_logs', function (req, res) {
    console.log(req.query.username);
    var fetchSql = "SELECT username,action,operation_time FROM AcitionLogs where username = $1;";
    var fetch_Params = [req.query.username];
    pgsql.query(fetchSql, fetch_Params, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        console.log(JSON.stringify(result.rows));
        res.end(JSON.stringify(result.rows));
    });
});

router.get('/get_date_num', function (req, res) {
    var username = req.cookies.username;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    var fetchSql = "SELECT publish_date,count(*) FROM news group by publish_date order by publish_date;";
    pgsql.query_noparam(fetchSql, function (err, result, fields) {
        var fetchAddSql = 'INSERT INTO ActionLogs (username, action)' + 'VALUES ($1, $2);';
        var fetchAddSql_Params = [username, 'view chart'];
        pgsql.query(fetchAddSql, fetchAddSql_Params, function(err,result) {
            if(err) {
                console.log(err);
            }
        })
        res.end(JSON.stringify(result.rows));
    });
});