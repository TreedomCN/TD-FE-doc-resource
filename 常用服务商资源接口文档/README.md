常用服务商资源接口文档
========

### QQ ###

* 常用接口list---[qqAPI.js](qqAPI.js)

* 接口使用
  
  引入：
  ```bash
      1、<script src="http://open.mobile.qq.com/sdk/qqapi.js?_bid=152"></script>

      2、webpack 中去除对qqAPI.js的eslint检测

      3、import { setShare } from './qqAPI';   // 引入需要用到的方法
  ```

* 接口描述

  - `isMobileQQ`
    
    判断是否手q环境
    
  - `isQzone`
   
    判断是否手Qzone环境  
    
  - `isQzone`

    判断是否手Qzone环境      

  - `tcssReport(hottag)`

    点击流上报

    @hottag： 上报内容

  - `getSearch(name)`

    获取url内容

    @name：名称 

  - `getImage(uin, size)`

    获取用户头像

    @uin：用户uin （可由cookie获得） 

    @size：头像尺寸

  - `setShare(shareData)`
    
    设置分享

    @shareData：分享配置 {object}
    
    ```bash
    window.shareConfig = {
        image_url: 'http://wa.qq.com/anniversary/1_100.png',
        title: '标题',
        desc: '分享描述？',
        share_url: location.origin + location.pathname + '?_wv=1'
    } 
    ```  
  - `getCookie(name)`

    获取指定cookie

    @name cookie字段名称

   - `getUin()`
   
     获取uin

  - `openApp(url)`

    跳转手q

    @url：跳转之后的地址 

  - `qqVersion(cb)`

    判断版本操作（qqAPI.js中使用的是6.6.8可根据具体需求修改）

    @cb：回调 

  - `showDialog(params)`
  
    弹出提示框（tips：添加html&style） 

    @params：{object}

    ```bash
    {
        text: '您的手机QQ版本过低，无法设置QQ头像，是否升级？',
        left: '取消',
        right: '前往升级',
        leftFunc: function () {},
        rightFunc: function () {}
    }
    ```   

### 互动娱乐（tgideas） ###

* 文档地址：[http://tgideas.qq.com/doc/](http://tgideas.qq.com/doc/) 

* 接口使用：

  引入：

  1、 统计

  ```bash
    <script src="//ossweb-img.qq.com/images/js/PTT/ping_tcss_tgideas_https_min.js"></script>

    var setSite={
        siteType: "a20180423wangchao", //必填项:"os"代表是官网，如果不是，则填写actName例如a20160701xxx
        pageType: "index", //必填项:本页面的定位；按照页面含义填写例如main||list||detail||download||share||page1||pageN
        pageName: "首页", //必填项:页面中文名
        osact:0, //选填项:是否是官网专题(在官网运营的专题)boolean；默认是0；可以在链接上加入参数osact=1来灵活设置
        ingame:0, //选填项:是否投放在游戏APP内boolean；默认是0；可以在链接上加入参数ingame=1来灵活设置
        stayTime:0 //选填项:是否需要统计停留时长boolean；默认是0
    }

    if(typeof(pgvMain)=='function')pgvMain();
  ```

  2、分享：

  ```bash
    <script src="//ossweb-img.qq.com/images/js/TGMobileShare/TGMobileShare.min.js"></script>

    window.shareText = {
        shareTitle: '标题。', //不设置或设置为空时，页面有title，则调取title
        shareDesc: '描述。', //不设置或设置为空时，页面有Description，则调取Description
        shareImgUrl: 'http://game.gtimg.cn/images/tgideas/act/a20151127tgmsdemo/share.jpg',//分享图片尺寸200*200，且填写绝对路径
        shareLink: '', //分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
        actName: 'a20180423wangchao' //点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
    }

    TGMobileShare(shareText);
  ```

  3、微信登陆

  ```bash
    <script src="//game.gtimg.cn/images/js/su/TGLogin.min.js"></script>
    
    TGLogin.init({
        wxAppId: 'wxf8773b4d31a9a719' //游戏在微信平台的appId
        }, function(TGLoginManager) {
            setShareInfo();

        //获取当前平台类型(wx/qq/other)
        var platform = TGLoginManager.mGetPlatformType();

        if (platform === 'wx') {
            //微信平台 - 进行微信登录
            TGLoginManager.mWXLogin(function(uinfo) {
                window.global.name = uinfo.nickname;
            });
        } else if (platform === 'qq') {
            //QQ平台 - 进行手Q登录
            TGLoginManager.mQQLogin(function(uinfo) {
                window.global.name = uinfo.nickname;
            });
        } else {
            //非微信、QQ平台
            //拉起手QAPP打开页面
            TGLoginManager.mOpenQQ();
        }
    });
  ```