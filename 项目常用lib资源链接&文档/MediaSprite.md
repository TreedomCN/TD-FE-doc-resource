MediaSprite.js
========

单个视频or多个视频播放库。

### 使用 ###

```
var param = {
    wrap: '#videoWrap',   //如果没有wrap,直接添加到body
    type: 'video',        //如果是雪碧音可以填audio, 也可以不填
    fps: 25,              // 视频帧率；
    src: 'http://hymm.treedom.cn/sound/bg.mp3',
    timeline: {
        'first': {
            begin: 0.0, // Premiere中对应的时间
            end: 6.0
        },
        'second': {
            begin: 10.0,
            end: 15.0
        }
    }
}

var newMediaSprite = new MediaSprite(param);

newMediaSprite.play('first', function (name) {
    console.log(name + ' end');
}, true);
```

### Methods ###

- `play(string, callback, bool)`

   播放

- `started(callback)`
  
    media开始播放时触发function一次
