# 规范 #

## 命名规范 ##

### 文件命名 ###

1. 文件夹及文件名统一英文<span style="color:#ff0000">不允许出现中文命名</span>。

2. 对于单个资源文件，文件名中<span style="color:#ff0000">不允许出现空格</span>，利用下划线将其分隔。

  ```
  以图片资源为例： bg_xxx.png
  ```
3. 项目命名

  ```
  项目归属 + 项目简称 + 平台类型 + 时间

  例：
  自有移动端项目： td-qqxxx-web-20180101

  腾讯PC端项目： tx-qqxxx-pc-20180101

  oppo小程序端项目： oppo-qqxxx-wxapp-20180101
  ```

## 代码规范 ##
### 代码命名规范 ###

* ***css*** 

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

* ***javascript*** 

   1. 不允许出现中文命名<span style="color:#ff0000">统一英文</span>（原则上不使用拼音，特殊情况可以使用)。
   
   2.  函数名称应该有意义，不允许出现<span style="color:#ff0000">无意义</span>的函数名。
   
   3.  变量名规则与函数一样。
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

### 代码编写规范 ###

* ***html*** 

   1. 不允许出现<span style="color:#ff0000">无意义</span>的标签。
   
   2. 利用<span style="color:#ff0000">class</span>去表示dom的意义，尽量<span style="color:#ff0000">少用id</span>。
   ```html
   例：
   <div class='mod-index-page'>
       <div class="title">页面title</div> 
       <div class="content">页面content</div> 
   </div>
   ```
   
* ***css***
   1. 以级连的方式写style（项目中使用less编写style）。
   ```css
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
   ```

   ```css
   错误示例：
   .m-index-page .title{
   // style code
   }
   ```
   
   ```
   * ***javascript***

      1. 尽量以<span style="color:#ff0000">模块化</span>的思路构建代码。
      2. [eslint](#) 规则。
   <br/>

   > 统一缩进格式： <span style="color:#ff0000">：缩进形式一个tab（4格）</span>
   ```
### Git提交规范 ###

   * feat：提交新功能
   * fix：修复了bug
   * docs：只修改了文档
   * style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
   * refactor：代码重构，既没修复bug也没有添加新功能
   * perf：性能优化，提高性能的代码更改
   * test：添加或修改代码测试
   * chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改