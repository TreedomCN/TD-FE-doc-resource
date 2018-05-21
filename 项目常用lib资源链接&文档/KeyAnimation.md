KeyAnimation.js
========

逐帧绘制库。

### 使用 ###

- ****step1: create kf el****

  data-prefix: 逐帧图前缀

  data-keyto: 帧数
  ```
  <div class="ns-kf" data-prefix="kf_XX_" data-keyto="32"></div>
  ```
- ****step2: load kf Img****
 
   将逐帧图添加到资源加载中，Preload一起使用
   ```
   // 以数组图为例：
   
    Config.pageImgs = {
        imgs: [],
        sprites: [],
        keyimgs: [
            {
                el: elDom,
                pathPrefix: Config.imgPath,
                postfix: 'jpg'
            }
        ]
    };
  ```

- ****step3: create kf object****
  
  在需要使用逐帧的地方
  ```
  /*
  new KeyAnimation(el, type：图片源模式, imgs, options);
  param: {
        el：canvas容器，jq对象；
        type：图片源模式，'array'和'sprite'模式，array需要后面提供图片对象数组，sprite需要提供基于宽度扩展的单张雪碧图
        imgs：图片帧对象数组或单图，对应不同模式；
        options:{
            cover: 10, //从数组中指定cover，默认是0
            fps: 30, //默认是24
            loop: 10 //初始化默认的循环数，在formTo中可以设置，默认是infinite,
            resolution: 2 //雪碧图模式才需要，图片的高清比例，与@2x相似，默认是2，低清模式是1,
            width: 300, //注意，隐藏元素是拿不到宽度的，所以特殊情况下需要指定宽度
            height: 300
        }
   }

   // 例：

   let buffer = Config.Preload.buffer;

   kfObject = new KeyAnimation(kfel, 'array', buffer.keyimgs['kf_XX'], {
      fps: 24,
      width: 750 / 2,  // 图片实际宽
      height: 1500 / 2 // 图片实际高
   });
  */
  ```
- ****play****
  得到逐帧对象后，调用其方法
  ```
  kfObject.from();
  ...
  kfObject.XX();
  ```

  ### Methods ###

  - `fromTo(10, 20, 1, callback)`;

    param: 启始帧，结束帧，循环次数，结束回调

  - `toFrom(20, 10, 1, callback)`;

    param: 启始帧，结束帧（从低位结束），循环次数，结束回调

  - `repeatplay(10, 20, 1, callback)`;  
    
    正播过去，再倒播回来

    param: 启始帧，结束帧，循环次数，结束回调

  - `from(10, 1, callback)`

    param: 启始帧（从0开始），循环次数 || infinite，结束回调

  - `to(20, 1, callback)`

    param: 结束帧（从0开始），循环次数 || infinite，结束回调

  - `goto(10)`

    param: 跳到某一帧

  - `next()`

    向后一帧

  - `prev()`

    向前一帧
    
  - `play(callback)`
    
    从当前位置播放动画，会继承上次使用fromTo、form或to的属性

  - `pause()`
    
    暂停动画，目前只是使计时器内部函数不再运作，不推荐使用该方法
                 
  - `stop()`
    
    停止并回到第一帧或cover帧

  - `getState()`
    
    获取当前状态，值有“stop、play”

  - `destroy()`
    
    销毁对象

