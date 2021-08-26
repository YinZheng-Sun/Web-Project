var source_name = "雪球网";
var Encoding_type = "utf-8";
var SeekURL = 'https://xueqiu.com/';
var title_format = "$('.article__bd__title').text()";
var pgsql = require('../pg.js');
var myIconv = require('iconv-lite');
var Request = require('request');
var myCheerio = require('cheerio');
var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
function request(url, callback) {
    var options = {
        url: url,
        encoding: null,
        headers: headers,
        timeout: 10000
    }
    Request(options, callback)
}

request(SeekURL, function (err, res, body) {
    var html = myIconv.decode(body, Encoding_type);
    var $ = myCheerio.load(html, { decodeEntities: true });
    try {
        seedurl_news = $('.AnonymousHome_home__timeline__item_3vU');
    } catch (e) { console.log('url列表所处的html块识别出错：' + e) };

    seedurl_news.each(function(){
        try {
            var url = SeekURL.substr(0, SeekURL.lastIndexOf('/')) + $(this).find('.AnonymousHome_a__placeholder_3RZ').attr("href");
            time = $(this).find('.AnonymousHome_auchor_1RR').children().last().text();
            time = time.split(/\s+/)[0];
            time = '2021-' + time;
        }catch (e) { 
            console.log('识别种子页面中的新闻链接出错：' + e) 
        }
        var news = {};
        news.url = url;
        news.source_name = source_name;
        news.source_encoding = Encoding_type; 
        news.publish_date = time;
        
        var news_url_Sql = 'select url from news where url= $1';
        var news_url_Sql_Params = [url];
        pgsql.query(news_url_Sql, news_url_Sql_Params, function(err, result) {
            if (err) {
                console.log(err)
            } else { 
                if(result.rows[0] != null) {
                    console.log(url + " repeat");
                } else { //a new page
                    getDetail(news, url);
                }
            }
        });
    });
});

function getDetail(news, url) {
    request(url, function(err, res, body) {
        var html_news = myIconv.decode(body, Encoding_type);
        var $ = myCheerio.load(html_news, { decodeEntities: true });
        news.title = "";
        news.content = "";

        if (title_format == "") news.title = ""
        else news.title = eval(title_format); //标题

        var content = ""
        for(var i = 0; i < $(".article__bd__detail").children().length; i++){
                content += $(".article__bd__detail").children().eq(i).text()
        }
        news.content = content

        var AddSql = 'INSERT INTO news (url, source_name, title, publish_date, content)' 
        + 'VALUES ($1, $2,$3,$4,$5)';
        var newsAddSql_Params = [news.url, news.source_name,
            news.title, news.publish_date,news.content];

        pgsql.query(AddSql, newsAddSql_Params, function(err, result) {
            if(err) {
                console.log(err);
            }
        });
    })
}

