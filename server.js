const express = require("express");
const request = require("request-promise");
const app = express();

const HEADERS = {
    "accept": "application/json",
    "authority": "c.y.qq.com",
    "origin": "https://m.y.qq.com",
    "referer": "https://m.y.qq.com",
    "user-agent": "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Mobile Safari/537.36"
}
app.get("/", async (req, res) => {
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+new Date()}`;
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
        }));
    } catch (e) {
        res.json({
            error: e.message
        })
    }
})

app.get("/search", async (req,res) => {
    const {keyword, page=1} = req.query;
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+new Date()}`;
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
        }));
    } catch (e) {
        res.json({
            error: e.message
        })
    }
})
app.listen(4000);


//https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E6%9D%8E%E8%8D%A3%E6%B5%A9&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1533196877862