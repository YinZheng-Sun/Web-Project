var nodejieba = require("nodejieba");
var pgsql = require('../pg.js');
var fs = require("fs");
var readLine = require("readline");
var fetchAddSql = 'select id_news, content from news';

var stop_words = new Set();

fs.readFile('stopwords.txt','utf-8', function(err, data) {
    if(err) {
        console.log(err);
    } else {
        var temp = data.split('\n');
        for(var i = 0; i < temp.length; i++) {
            stop_words.add(temp[i]);
        }
    }
})

// //执行sql，数据库中fetch表里的url属性是unique的，不会把重复的url内容写入数据库
pgsql.query_noparam(fetchAddSql, function(err, result) {
    for(var i = 0; i < result.rows.length; i++) {
        var words = nodejieba.extract(result.rows[i].content,30);
        var id_news = result.rows[i].id_news;
        var insert_word_Sql;
        var insert_word_Params;
        for(var j = 0; j < words.length; j++) {
            if(!stop_words.has(words[j].word)) {
                insert_word_Sql = 'insert into keywords(id_news, word)' + ' VALUES ($1, $2)';
                insert_word_Params = [id_news, words[j].word];  
                // console.log(words[j]);
                pgsql.query(insert_word_Sql, insert_word_Params, function(err, result) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        }
    }
    
});
