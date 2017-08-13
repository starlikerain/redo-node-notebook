/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-08-05 10:54:28
 * @modify date 2017-08-05 10:54:28
 * @desc [api所谓api就是给js调用用的]
 */

// 处理 XHR请求

module.exports = (ctx) => {

    let { url, method } = ctx.req
    let { resCtx, reqCtx, res } = ctx

    let apiMap = {
        '/list.action': ['吃饭', '睡觉', '洗澡澡'],
        '/user.action': ['evan', 'male', '人类']
    }

    method = method.toLowerCase()

    return Promise.resolve({
        then: (resolve, reject) => {
            // 只处理 XHR
            if (url.match('action')) {
                if (method === 'get') {
                    // Unhandled promise rejection (rejection id: 4): TypeError:
                    // First argument must be a string or Buffer
                    // 所以写JSON.stringify
                    resCtx.body = JSON.stringify(apiMap[url])
                } else {
                    // 如果是post 就把url-parser获得的body，
                    // 赋值给 resCtx.body
                    let { body } = reqCtx
                    resCtx.body = JSON.stringify(body)
                }

                // res.setHeader('Content-Type', 'application/json')
                resCtx.headers = Object.assign(resCtx.headers, { 'Content-Type': 'application/json' })
                debugger
            }
            resolve()
        }
    })
};