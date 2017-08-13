/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-07-27 08:17:18
 * @modify date 2017-07-27 08:17:18
 * @desc [第一步核心index.js]
 */
const fs = require('fs')
const path = require('path')

class App {
    constructor() {
        this.middlewareArr = []

        // 设计一个空的 promise
        this.middlewareChain = Promise.resolve()
    }

    use(middleware) {
        this.middlewareArr.push(middleware)
    }

    composeMiddleware(context) {
        let { middlewareArr } = this

        for (let middleware of middlewareArr) {
            this.middlewareChain = this.middlewareChain.then(() => {
                return middleware(context)
            })
        }

        return this.middlewareChain
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
            this.composeMiddleware(context)
                .then(() => {
                    let base = { 'Author': 'StarLikeRain' }
                    let { body, headers } = context.resCtx

                    // writeHead 会覆盖 setHeader(name, value)
                    res.writeHead(200, 'resolve ok', Object.assign(base, headers))
                    res.end(body)
                })
        }
    }
}

module.exports = App;