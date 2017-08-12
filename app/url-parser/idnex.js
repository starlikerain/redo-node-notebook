/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-08-07 10:36:59
 * @modify date 2017-08-07 10:36:59
 * @desc [处理客户端request的 url的query参数，body参数，method参数]
 */


// 目前仅仅是处理了 前段post的 data
module.exports = (ctx) => {

    let {method, url} = ctx.req
    let {reqCtx} = ctx

    method = method.toLowerCase()

    // 原型链 readble stream eventEmitter
    return Promise.resolve({
        then: (resolve, reject) => {

            if (method === 'post') {
                let data = ''

                ctx.req.on('data', (chunk) => {
                    data += chunk
                }).on('end', () => {
                    reqCtx.body = JSON.parse(data) // context.body 赋值
                    resolve()
                })
            } else {
                resolve()
            }
        }
    })
}