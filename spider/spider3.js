var source_name = "网易新闻";
var myEncoding = "utf-8";
var seedURL = 'https://news.163.com/';
var seedURL_format = "$('a')";
var title_format = "$('title').text()";
var date_format = "$('html#ne_wrap').attr(\"data\-publishtime\")";//

var pgsql = require('../pg.js');
var Iconv = require('iconv-lite');
var myRequest = require('request');
var myCheerio = require('cheerio');
var url_reg = /\/(\d{2})\/(\d{4})\/(\d{2})\/([A-Z0-9]{16}).html/;
var regExp = /((\d{4}|\d{2})(\-|\/|\.)\d{1,2}\3\d{1,2})|(\d{4}年\d{1,2}月\d{1,2}日)/

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

function request(url, callback) {//request module fetching url
    var options = {
        url: url,
        encoding: null,
        headers: headers,
        timeout: 10000
    }
    myRequest(options, callback)
}

request(seedURL, function (err, res, data) {
    var buf = Iconv.encode(data, 'utf-8');
    var html = Iconv.decode(buf, myEncoding);
    var $ = myCheerio.load(html, { decodeEntities: true });
    try {
        seedurl_news = eval(seedURL_format);
    } catch (e) {  };

    seedurl_news.each(function(){
        var myURL = "";
        try {
            var href = "";
                href = $(this).attr("href");
                if (href == undefined) return;
                if (href.toLowerCase().indexOf('https://') >= 0 || href.toLowerCase().indexOf('http://') >= 0) myURL = href; //http://开头的
                else if (href.startsWith('//')) myURL = 'http:' + href; 
                else myURL = seedURL.substr(0, seedURL.lastIndexOf('/') + 1) + href; //其他
        }catch (e) {
        
            // console.log(e) 
        }
        if (!url_reg.test(myURL)) return; //检验是否符合正则表达式
        var news = {};
        news.url = myURL;
        news.source_name = source_name;
        news.source_encoding = myEncoding; //编码

        var news_url_Sql = 'select url from news where url= $1';
        var news_url_Sql_Params = [myURL];
        pgsql.query(news_url_Sql, news_url_Sql_Params, function(err, result) {
            if (err) {
                // console.log(err)
            } else {               
                getDetail(news, myURL);
            }
        });
    });
});

function getDetail(news, url) {
    request(url, function(err, res, data) {
        var $ = myCheerio.load(data, { decodeEntities: true});
        news.title = "";
        news.content = "";
        news.publish_date = new Date().toLocaleDateString().split('/').join('-');
        if (title_format == "") 
        news.title = ""
        else news.title = eval(title_format); 

        if(!isChinese(news.title[0]) && !isNumber(news.title[0]))
            return  ;
        // console.log(news.title)
        if (date_format == "") news.publish_date = ""; 
        else news.publish_date = eval(date_format);
        if (news.publish_date) {
            news.publish_date = regExp.exec(news.publish_date)[0];
            news.publish_date = news.publish_date.replace('年', '-');
            news.publish_date = news.publish_date.replace('月', '-');
            news.publish_date = news.publish_date.replace('日', '');
        }
        
        var content = ""
        for(var i = 0; i < $(".post_body").children().length; i++){
                content += $(".post_body").children().eq(i).text()
        }
        news.content = content

        // 保存到数据库
        var AddSql = 'INSERT INTO news (url, source_name, title, publish_date, content)' 
        + 'VALUES ($1, $2,$3,$4,$5)';
        var newsAddSql_Params = [news.url, news.source_name,
            news.title, news.publish_date,news.content
        ];

        //执行sql，数据库中fetch表里的url属性是unique的，不会把重复的url内容写入数据库
        if(news.content!=="")
            pgsql.query(AddSql, newsAddSql_Params, function(err, result) {
                if(err) {
                    // console.log(err);
                }
            });
    })
}

function isChinese(temp){
    var re=/[^\u4E00-\u9FA5]/;
    if (re.test(temp)) return false ;
    return true ;
}

//验证字符串是否是数字
function isNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
        return true;
    }
    return false;
}