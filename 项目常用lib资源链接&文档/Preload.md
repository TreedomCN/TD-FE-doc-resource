Preload.js 
========

项目预加载资源库。

### 使用 ###

```
var x = new Preload(param);

// 加载的进度，p返回当前加载进度（number）
x.onloading = function (p) {
    console.log(p);
}

// 加载完成
x.onload = function () {
    console.log('succback');
}

//默认只有ajax请求不成功才会触发
x.onfail = function (err) {
    console.log(err.url);
    console.log(err.msg);
}

//启动
x.load();

```
param: object。

imgs: Array (需要加载的单张图片资源)

sprites: Array (需要加载雪碧图逐帧资源)

keyimgs: Array (需要逐帧资源)

ajaxs： Array (请求，一般很少用)
```
param = {
    imgs: [
        {
            url: url,
            name: name
        },
        {
            url: url2,
            name: name2
        }
    ],
    sprites: [
        {
            url: url,
            name: name
        }
    ],
    //keyimgs实际是Preload.LoadKeyImgs的一个二次包装，参数详情参看preloadImgs方法
    keyimgs: [
        {
            el: elDom,
            pathPrefix: 'img/',
            postfix: 'jpg'
            }
        ]
    ajaxs: [
        {
            url: 'xxx.html',
            type: 'POST',
            data: {},
            succback: function (data) {
                console.log(data);
            },
            errback: function (msg) {
                console.log(msg);
            }
        },
        {
            url: 'xxx.html'
        }
    ]
};
```

### 备注

加载完毕后Preload有一个全局的buffer，里面存了所有图片的键值对，格式如下例子：

```
x.buffer = {
    imgs: {
        bg: imgObj
    },
    sprites: {
        sp: imgObj
    },
    keyimgs: {
        title: Preload.LoadKeyImgs.buffer
    }
}
```
