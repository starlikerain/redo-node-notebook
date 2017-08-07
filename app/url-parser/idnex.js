/**
 * @author [pengyaokang]
 * @email [pengyaokang@icloud.com]
 * @create date 2017-08-07 10:36:59
 * @modify date 2017-08-07 10:36:59
 * @desc [处理客户端request的 url的query参数，body参数，method参数]
 */

module.exports = (req) => {

    let {method, url, context} = req // 注意写了一个 context
    method = method.toLowerCase()

    // 原型链 readble stream eventEmitter
    return Promise.resolve({
        then: (resolve, reject) => {

            context.method = method // context.method 赋值
            // @TODO
            context.query = {} // context.query 赋值

            if (method === 'post') {
                let data = ''

                req.on('data', (chunk) => {
                    data += chunk
                }).on('end', () => {
                    context.body = JSON.parse(data) // context.body 赋值
                    resolve()
                })
            }else {
                resolve()
            }
        }
    })
}