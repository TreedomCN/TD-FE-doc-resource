快速入门
========

## 工具&环境准备 ##

* ****[nodejs](https://nodejs.org/zh-cn/)****

* ****[npm](https://www.npmjs.com/)****

* ****Photoshop****

  下载：[http://treedom.com/](http://treedom.com/)内网服务->浏览共享->软件

* ****ftp上传工具****

  1. Transmit（mac）
  
     下载：[http://treedom.com/](http://treedom.com/)内网服务->浏览共享->软件

  2. filezilla(win)   

* ****code编辑器****

  1.  [vscode](https://code.visualstudio.com/)

  2. Sublime Text

     下载：[http://treedom.com/](http://treedom.com/)内网服务->浏览共享->软件

  3. ...

* ****[微信开发者工具](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455784140)****

* ****Shadowsocks（ss）****

  下载：[http://treedom.com/](http://treedom.com/)内网服务->浏览共享->软件

* ****markdown文档编辑器****
  
  1. vscode markdown 插件即可，
  2. 网上下载
  3. [语法文档](https://www.appinn.com/markdown/#list)

* ****资源cnd****
  
  1. 不在自己服务器上线的项目，cnd资源地址一般由客户提供
  2. 在自己服务器上线项目，所有资源上传至七牛云。七牛的HTTPS资源域名请用`qrtss.treedom.cn`

## 规范 ##

   * ### 命名规范 ###
     - ****文件命名****

       1. 文件夹及文件名统一英文<span style="color:#ff0000">不允许出现中文命名</span>。
       
       2. 对于单个资源文件，文件名中<span style="color:#ff0000">不允许出现空格</span>，利用下划线将其分隔。
       ```
       以图片资源为例： bg_xxx.png
       ```

       3. 项目命名
       ```
       例：

       自有项目： td-项目名-时间（td-qqx-20180101）

       服务商项目： 服务公司-项目名-时间（腾讯为例  tx-qqx-20180101）  
       ```

   * ### 代码规范 ###
       - ****代码命名规范****
     
          ***css*** 

          1. 不允许出现中文命名<span style="color:#ff0000">统一英文</span>（原则上不使用拼音，特殊情况可以使用)。
       
          2. class & id 命名规则。
          
             + 模块  `例：.mod-index-page, mod-nav, mod-nav-title...（其中mod可以简写为m）`。

             + 按钮  `例：.btn-start, .btn-back, btn-loading...`。

             + 图标  `icon-start, icon-phone... （其中icon可以简写为i）`。

             + 命名空间 `ns-wrap, ns-xxx`。
               
               命名空间作为一种补充的存在，作用有两种：可以定义在页面比较‘根’的元素上。另外一些比较特殊的模块上。
            
               > css命名规则详细见[模块化CSS指引.pdf](模块化CSS指引.pdf)    

          3. 不允许出现<span style="color:#ff0000">无意义</span>的class、id命名
          ```
          例：.list-a, .list-b
          ```
          4. 单词统一小写，有单词分隔情况使用减号（-）
          ```
          例：.mod-index-page

          错误示例： .modIndexPage .MODINDEX
          ```
          - - -

          ***js*** 
          
          1. 不允许出现中文命名<span style="color:#ff0000">统一英文</span>（原则上不使用拼音，特殊情况可以使用)。

          2. 函数名称应该有意义，不允许出现<span style="color:#ff0000">无意义</span>的函数名。

          3. 变量名规则与函数一样。

          ```
          例：
          // 函数功能获取图片数据 ==> getImgData();
          // 变量是否播放 ==> var isPlay = false;

          错误示例：
          函数： fn(); afn(); aaa() ...
          变量:  var a = 1;  var bbbb = document.querySelector('body');
          ```
          4. 单词的分隔统一使用<span style="color:#ff0000">驼峰式</span>，单词连接不允许出现下划线，减号...。

          ```
          例：createShader();

          错误示例：create-shader(); create_shader()
          ```

          - - -

      - ****代码编写规范**** 
        
        ***html***
        
        1. 不允许出现<span style="color:#ff0000">无意义</span>的标签。

        2. 利用<span style="color:#ff0000">class</span>去表示dom的意义，尽量<span style="color:#ff0000">少用id</span>。

        ```
        例：
        <div class='mod-index-page'>
            <div class="title">页面title</div> 
            <div class="content">页面content</div> 
        </div>
        ```

        - - -

        ***css***
        1. 以级连的方式写style（项目中使用less编写style）。
        
        ```
        例：
        .m-index-page {

            // index page style code

            .title {

                // index title code

            }
            .content {
                
                // content title code
            }
        }


        错误示例：

         .m-index-page .title{

             // style code

         }
        ```
        - - -
        
        ***js***

        1. 尽量以<span style="color:#ff0000">模块化</span>的思路构建代码。

        2. [eslint]() 规则。


        <br/>

        > 统一缩进格式： <span style="color:#ff0000">：缩进形式一个tab（4格）</span>

## 项目框架简介 ##

* ### 作用 ###

  - 减少一些重复劳动，提高工作效率。

  - 利用模块化思想构建代码。

  - 便于团队合作。

* ### 基础目录结构 ###
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
    ├── webpack.config.prod.js                 ----webpack线上&正式环境配置文件
    └── webpack.config.zip.js                  ----webpack打包zip配置文件
    ```
    - ****XXXXViewController.js --页面控制器主要结构****
    ```
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
    
    ```
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
* ### 使用文档 ###

   - 详细见：[Framework-document.md](Framework-document.md)

* ### npm-cli构建目录 ###

   - td-tpl-cli [![npm package](https://img.shields.io/npm/v/td-tpl-cli.svg)](https://www.npmjs.com/package/td-tpl-cli)

     源码github: [https://github.com/TreedomCN/td-tpl-cli](https://github.com/TreedomCN/td-tpl-cli)

     简单使用：

     ```bash
     $ td create <project-name> <tpl-type>

     $ td check
     ```

      | tpl-type (模版类型) | 描述                   | 备注    | 
      | :--------------- | :------------------------- | :--------- |
      | normal           | 项目基础模版     |            |
      | video-once       | 单一视频模版     |            |
      | video-multiple   | 多段视频模版     |整理中...    |
      | pc-normal        | pc基础项目模版   |整理中...    |
      | ...              | ...   |            | 
     
     具体使用：[https://github.com/TreedomCN/td-tpl-cli](https://github.com/TreedomCN/td-tpl-cli)