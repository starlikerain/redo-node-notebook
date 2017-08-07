// this is index.js from '/public/js'

setTimeout(() => {
    $.ajax({
        url: '/user.action',
        method: 'get',
        // 返回数组
        success: function (arr) {
            console.log('success');
            var liStr = arr.map((ele) => {
                return '<li>' + ele + '</li>'
            }).join('');

            $('#root').html(liStr);
        },
        error: function (err) {
            console.log('error');
            console.log(err);
        }
    });
    // 模拟post
    $.ajax({
        url: '/list.action',
        method: 'post',
        data: JSON.stringify([
            "name", "EvanYann"
        ]),
        // return an Array
        success: function (arr) {
            var liStr = arr.map((ele) => {
                return '<li>' + ele + '</li>'
            }).join('');

            $('#shop').html(liStr);
        },
        error: function (err) {
            console.log(err);
        }
    })

}, 1000);