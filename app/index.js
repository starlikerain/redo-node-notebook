/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-07-27 08:17:18
 * @modify date 2017-07-27 08:17:18
 * @desc [第一步]
 */
const fs = require('fs')
const path = require('path')
const staticServer = require('./static-server')
const apiServer = require('./api/index')
const urlParser = require('./url-parser/idnex') // 处理客户端request的 url的query参数，body参数，method参数

class App {
    constructor() {

    }

    initServer() {
        // 初始化工作
        return (req, res) => {

            let context = {
                req: req, // request
                reqCtx: {
                    body: '', // post请求的数据
                    query: {} // 用于处理客户端get请求

                },
                res: res, // response
                resCtx: {
                    headers: {}, // 关于response的返回报文
                    body: '' // 返回给前端的内容区
                }
            }

            // 先给context的body query method赋值
            urlParser(context)
                .then(() => {
                    // XHR JS网络请求
                    return apiServer(context)
                })
                .then(() => {
                    // HTML CSS IMG 请求
                    return staticServer(context)
                })
                .then(() => {
                    let base = { 'Author': 'StarLikeRain' }
                    let { body } = context.resCtx

                    // writeHead 会覆盖 setHeader(name, value)
                    res.writeHead(200, 'resolve ok', base)
                    res.end(body)
                })
        }
    }
}

module.exports = App;