var express = require('express');
var router = express.Router();
var pgsql = require('../pg.js');
var neo4j = require('../neo4j.js');
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
    res.render('show3');
});

router.get('/show2',function (req,res,next) {
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

router.get('/knowledge',async function (req,res) {
    var json = []
    var result_ = ['B树','渐进']
    var a = "("
    for(const item of result_) {
        item 
    }
    var knowledge = req.query.knowledge;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    var array = ['B树', '渐进', '克鲁', '插值', '主串', 'AO', '二元',
     '遗传', '插入', '子图', '字符', '普里', '树形', '满二', '空间', 
     '先进', '倒排', '线性', '头结', '哈希', '平衡', '孩子', '负载', 
     '快速', '回溯', '循环', '二叉', '健壮', '平均', '索引', '表达', 
     '逻辑', '正则', '三叉', '符号', 'B+', '有限', '折半', 'KM', 
     '进栈', '条件', '空指', '非连', '最高', '完全', '顺序', '分治', 
     '分离', '广度', '图的', '神经', '链队', '栈顶', '链栈', '可读', 
     '实型', '大O', '数据', '负权', '队头', '双端', '弗洛', '散列', 
     'NP', '无向', '表达', '单向', '动态', '堆排', '静态', '非数', 
     '斐波', '分支', '最优', '关键', '关节', '哈夫', '哈希', '红黑', 
     '集合', '计数', '线索', '结构', '扩充', '链式', '旅行', '起泡', 
     '枚举', '模式', '强连', '整除', '十字', '数据', '数据', '双向', 
     '顺序', '顺序', '顺序', '交换', '贪心', '桶排', '循环', '连通', 
     '无向', '稀疏', '内部', '引用', '最短', '一维', '内存', '索引', 
     '枚举', '有向', '割点', '直接', '中序', '主关', '字符'];

    var label_ = ['B树', '渐进时间复杂度', '克鲁斯卡尔算法', '插值',
    '主串', 'AOV网', '二元组', '遗传算法', '插入排序', '子图', '字符型', '普里姆算法',
    '树形选择排序', '满二叉树', '空间复杂度', '先进先出', '倒排文件', '线性数据结构',
    '头结点', '哈希地址', '平衡二叉排序树', '孩子结点', '负载因子', '快速排序', '回溯法',
    '循环链表', '二叉堆', '健壮性', '平均查找长度', '索引文件', '表达式树', '逻辑结构',
    '正则表达式', '三叉树', '符号表', 'B+树', '有限序列', '折半查找', 'KMP算法', '进栈',
    '条件语句', '空指针', '非连通图', '最高位优先法', '完全二叉树', '顺序文件', '分治法',
    '分离链接法', '广度优先遍历', '图的遍历', '神经网络算法', '链队列', '栈顶指针', '链栈',
    '可读性', '实型', '大O表示法', '数据类型', '负权回路', '队头元素', '双端队列', '弗洛伊德算法',
    '散列', 'NPC问题', '无向图', '表达式', '单向链表', '动态规划法', '堆排序', '静态链表',
    '非数值计算', '斐波那契查找', '分支界限法', '最优二叉树', '关键路径', '关节点', '哈夫曼编码',
    '哈希函数', '红黑树', '集合', '计数排序', '线索化', '结构类型', '扩充二叉树', '链式存储结构',
    '旅行商问题', '起泡排序', '枚举型', '模式匹配', '强连通图', '整除', '十字链表', '数据结构',
    '数据元素', '双向链表', '顺序查找', '顺序存取', '顺序结构', '交换排序', '贪心法', '桶排序', '循环队列', '连通分量',
     '无向完全图', '稀疏矩阵', '内部结点', '引用参数', '最短路径', '一维数组',
     '内存地址', '索引', '枚举法', '有向无环图', '割点', '直接插入排序', '中序遍历', '主关键字', '字符'];

    if(knowledge.length <= 3) {
        console.log("字符串长度不够");
        res.end(JSON.stringify("no"));
    }
    var label = knowledge[2] + knowledge[3];
    var index;
    
    if ((index = array.indexOf(label)) !== -1) {
        var fetchSql = "SELECT label,content FROM labeldiscription where label in ($1";
        
        var fetch_Params = [label_[index]];
        // pgsql.query(fetchSql, fetch_Params, function (err, result, fields) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     // json.push(result.rows[0]);
        //     console.log(result.rows[1])
        //     // neo4j.query_(label_[index],function(err,result){
        //     //     if(err) {
        //     //         console.log(err)
        //     //     }
        //     // })
        //     res.end(JSON.stringify(result.rows));
        // }
        neo4j.query_(label_[index],function(err,result){
            if(err) {
                console.log(err)
            }else {
                console.log(result)
                for(i=1;i <= result.length; i++) {
                    fetchSql+=','+'$'+(i+1);
                }
                fetchSql+=');'
                console.log(fetchSql)
                fetch_Params = fetch_Params.concat(result)
                console.log(fetch_Params)
                pgsql.query(fetchSql, fetch_Params,function(err, result, fields) {
                    if(err) {
                        console.log(err)
                    }else {
                        let  arr = result.rows
                        let obj = {};
                        arr.forEach((item,index_)=>{
                            if(item.label === label_[index]){
                                obj = item;
                                arr.splice(index_,1)
                                return;
                            }
                        
                        })
                        arr.unshift(obj);
                        console.log(arr)
                        res.end(JSON.stringify(arr));
                    }
                })
            }
        })
        
    } else {
        console.log("数组不存在该label");
        res.end(JSON.stringify("no"));
    }
});