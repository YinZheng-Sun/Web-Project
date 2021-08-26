var source_name = "中新网财经频道";
var Encoding_type = "utf-8";
var SeekURL = 'http://www.chinanews.com/finance/';

var title_format = "$('.content > h1').text()";
var date_format = "$('#pubtime_baidu').text()";
var author_format = "$('#author_baidu').text()";
var content_format = "$('.left_zw').text()";
var source_format = "$('.left-t').text()";
var url_reg = /\/(\d{4})\/(\d{2})-(\d{2})\/(\d{7}).shtml/;


var fs = require('fs');
var Request = require('request')
var myCheerio = require('cheerio')
var myIconv = require('iconv-lite')
require('date-utils');
var pgsql = require('../pg.js');

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

function request(url, callback) {
    var options = {
        url: url,
        encoding: null,
        headers: headers,
        timeout: 10000 //
    }
    Request(options, callback)
}

request(SeekURL, function(err, res, body) { 
    var html = myIconv.decode(body, Encoding_type); 
    var $ = myCheerio.load(html, { decodeEntities: true });
    var seedurl_news;
    try {
        seedurl_news = $('a');
    } catch (e) {  };

    seedurl_news.each(function(){
        try {
            var href = "";
            href = $(this).attr('href');
        }catch(e) {
            // console.log('get the seed url err' + e);
        }
        if (!url_reg.test(href)) {
            return;
        }
        href = String(href);
        if (href.indexOf("//www.chinanews.com/cj") != 0) {
            return ;
        }
        href = 'http:' + href;
        // console.log("crawler " + href);

        var fetch_url_Sql = 'select url from news where url= $1';
        var fetch_url_Sql_Params = [href];
        pgsql.query(fetch_url_Sql, fetch_url_Sql_Params, function(err, result) {
            if (err) {
                console.log(err)
            } else { 
                newsGet(href); 
            }
        });
    })

});


function newsGet(myURL) { //读取新闻页面
    request(myURL, function(err, res, body) { //读取新闻页面
        try {
        var html_news = myIconv.decode(body, Encoding_type); //用iconv转换编码
        //console.log(html_news);
        //准备用cheerio解析html_news
        var $ = myCheerio.load(html_news, { decodeEntities: true });
        myhtml = html_news;
        } catch (e) {    console.log('读新闻页面并转码出错：' + e);};

        //动态执行format字符串，构建json对象准备写入文件或数据库
        var fetch = {};
        fetch.title = "";
        fetch.content = "";
        fetch.publish_date = (new Date()).toFormat("YYYY-MM-DD");
        fetch.url = myURL;
        fetch.source_name = source_name;
        fetch.source_encoding = Encoding_type; //编码
        fetch.crawltime = new Date();

        if (title_format == "") fetch.title = ""
        else fetch.title = eval(title_format); //标题

        if (date_format != "") fetch.publish_date = eval(date_format); //$('.article-meta').children().eq(1).text(); //刊登日期   
        fetch.publish_date = fetch.publish_date.split(" ")[0];
        fetch.publish_date = fetch.publish_date.replace('年', '-')
        fetch.publish_date = fetch.publish_date.replace('月', '-')
        fetch.publish_date = fetch.publish_date.replace('日', '')
        fetch.publish_date = new Date(fetch.publish_date).toFormat("YYYY-MM-DD");

        if (author_format == "") fetch.author = source_name; //eval(author_format);  //作者
        else fetch.author = eval(author_format).replace('作者：','');

        if (content_format == "") fetch.content = "";
        else fetch.content = eval(content_format).replace('\n', "").replace(" ", ""); //内容

        if (source_format == "") fetch.source = fetch.source_name;
        else fetch.source = eval(source_format).split('：')[1]; 
        fetch.source = source_name;
        

        // 将数据保存到postgresql
        var fetchAddSql = 'INSERT INTO news (url, source_name, title, publish_date, content)' 
        + 'VALUES ($1, $2,$3,$4,$5)';
        var fetchAddSql_Params = [fetch.url, fetch.source,
            fetch.title, fetch.publish_date, fetch.content
        ];

        pgsql.query(fetchAddSql, fetchAddSql_Params, function(err, result) {
            if(err) {
                console.log(err);
            }
        });
        
    });
}
