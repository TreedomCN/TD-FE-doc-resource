# 项目框架简介 #

### 作用 ###

  - 减少一些重复劳动，提高工作效率。

  - 利用模块化思想构建代码。

  - 便于团队合作。

### 基础目录结构 ###

  - ****目录结构****
    ```
    .
    ├── README.md               ----项目描述
    ├── config.path.js          ----各类环境路径配置文件
    ├── index.ejs               ----首页html文件。ejs模版编译 
    ├── package.json            ----项目描述
    ├── src                     ----项目主要文件，所有资源都会存于src文件下
    │   ├── img                 ----图片文件资源
    │   │   └── XXX.png
    │   ├── js            
    │   │   ├── app                            ----存一些公用，自有模块文件
    │   │   │   ├── Config.js                  ----配置文件，在项目中相当于一个全局对象
    │   │   │   ├── XXXXViewController.js      ----页面模块控制器，每个页面模块的业务逻辑入口 
    │   │   │   ├── module                     ----存放一些自有lib资源
    │   │   │   │   ├── KeyAnimation.js        ----逐帧库
    │   │   │   │   ├── MediaSprite.js         ----视频播放库
    │   │   │   │   ├── Preload.js             ----资源预加载库
    │   │   │   │   ├── TD.js                  ----存一些常用方法
    │   │   │   │   └── fx_methods.js          ----zepto动画模块
    │   │   │   └── rem.js                     ----rem计算
    │   │   ├── index.js                       ----程序唯一入口
    │   │   └── lib                            ----存放一些需要用第三方lib包
    │   │       └── zepto.min.js
    │   ├── less
    │   │   ├── common.less                    ----公用less
    │   │   ├── keyframe.less                  ----animation-keyframe less
    │   │   ├── reset.less                     ----重制浏览器样式 less
    │   │   └── style.less                     ----页面布局 less
    │   └── media                              ----存放媒体文件
    │       └── XXX.mp3
    ├── .eslintrc                              ----elsint规则配置文件
    ├── .babelrc                               ----babel转译规则配置文件
    ├── .postcssrc                             ----postcss规则配置文件（css插件）
    ├── webpack.config.base.js                 ----webpack通用配置文件
    ├── webpack.config.dev.js                  ----webpack开发环境配置文件
    ├── webpack.config.handover.js             ----webpack交接配置文件
    └── webpack.config.prod.js                 ----webpack线上&正式环境配置文件
    ```
  - ****XXXXViewController.js --页面控制器主要结构****
    ```javascript
    var XXXXViewController = function () {
        var _that = this;

        // 初始化模块
        var init = function () {
            // ..
        }

        // 函数内部私有方法
        var XXX = function () {
            // ..
        }

        // 对外暴露show方法，显示模块
        _that.show = function () {
            // ..
        }

        // 对外暴露hide方法，隐藏模块
        _that.hide = function () {
            // ..

            // 模块的转接
            _that.onhide && _that.onhide(); 
        }

        init();
    }

    module.exports = XXXXViewController;
    ```
    > tips：也可用es6 class的形式编写。

  - ****index.js --程序主入口结构****
    
    ```javascript
    作用： 各个模块的显示与隐藏的切换

    例：
    var LoadViewController = require('LoadViewController');
    var IndexViewController = require('IndexViewController');

    var loadView = loadView || new LoadViewController();
    loadView.show();
    
    loadView.onhide = function () {
        // 下一页模块的显示
    }

    ```
### 使用文档 ###

   - 详细见：[Framework-document.md](./Framework-document.md)
