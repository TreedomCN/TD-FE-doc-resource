//是否是手Q
export const isMobileQQ = !!(typeof mqq != "undefined" && typeof mqq.QQVersion != "undefined" && mqq.QQVersion != 0 && !(/Qzone/.test(navigator.userAgent)))
console.log(mqq);
//是否是Qzone
export const isQzone = /Qzone/.test(navigator.userAgent)
//是否是微信
export const isWx = /MicroMessenger/.test(navigator.userAgent)

var OS=function(){var a=navigator.userAgent,b=/(?:Android)/.test(a),d=/(?:Firefox)/.test(a),e=/(?:Mobile)/.test(a),f=b&&e,g=b&&!f,c=/(?:iPad.*OS)/.test(a),h=!c&&/(?:iPhone\sOS)/.test(a),k=c||g||/(?:PlayBook)/.test(a)||d&&/(?:Tablet)/.test(a),a=!k&&(b||h||/(?:(webOS|hpwOS)[\s\/]|BlackBerry.*Version\/|BB10.*Version\/|CriOS\/)/.test(a)||d&&e);return{android:b,androidPad:g,androidPhone:f,ipad:c,iphone:h,tablet:k,phone:a}}();

// if (!OS.phone && !OS.ipad && pcUrl) {
//     // location.href = pcUrl
// }

export function getCSRFToken() {
    var hash = 5381;
    var skey = getCookie('skey') || '';
    for (var i = 0, len = skey.length; i < len; ++i) hash += (hash << 5) + skey.charCodeAt(i);
    return hash & 2147483647
}

/**
 * 点击流上报
 */
export const tcssReport = function (hottag) {

    if (typeof (pgvMain) == 'function') {
        pgvSendClick({
            hottag: hottag
        });
    }
};


/**
 * [异步加载js]
 * @param  {[string]} src [js文件路径]
 * @param  {[function]} callback [加载完成回调函数]
 */
export function loadJs(src, callback) {
    var _ = document.createElement('script')
    _.async = 'async'
    _.src = src
    _.onload = callback || function () {}
    document.getElementsByTagName('body')[0].appendChild(_)
}

/**
 * 从URL中查找参数，找不到返回 null
 * @param name
 * @returns {*}
 */
export function getSearch(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substring(1).match(reg)
    if (!!r) {
        return decodeURIComponent((r[2]))
    }
    return null
}

/**
 * [获得用户当前实际的头像]
 * @param  {[type]} uin [用户的uin]
 * @param  {[type]} size [头像的尺寸，40或100]
 * @return {[type]}     [description]
 */
export function getImage(uin,size) {
    var qqLastNum = uin.charAt(uin.length - 1) || 0, //通过QQ号的最后一位来决定请求的头像域名
        k = parseInt(qqLastNum / 2),
        size = size || 40,
        domain = k == 0 ? 'q' : ('q' + k),
        imgUrl = 'http://' + domain + '.qlogo.cn/g?b=qq&s=' + size + '&nk=' + uin
    return imgUrl
};



/**************************分享相关 begin *******************/

/**
 * 微信分享
 */
function shareInWX(shareData) {
    let {
        image_url,
        image_width = "120",
        image_height = "120",
        share_url,
        desc,
        title
    } = shareData
    //微信分享
    let onBridgeReady = function () {
        //转发朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (e) {
            WeixinJSBridge.invoke('shareTimeline', {
                img_url: image_url,
                img_width: image_width,
                img_height: image_height,
                link: share_url + '&adtag=pyq',
                desc: desc, //desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
                title: desc //朋友圈只有title，将正文替换为title
            }, function (res) {
                WeixinJSBridge.log(res.err_msg)
            })
        })
        //同步到微博
        WeixinJSBridge.on('menu:share:weibo', function () {
            WeixinJSBridge.invoke('shareWeibo', {
                "content": desc,
                "url": share_url + '&adtag=wb'
            }, function (res) {
                WeixinJSBridge.log(res.err_msg)
            })
        })
        //分享给朋友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke("sendAppMessage", {
                img_url: image_url,
                img_width: image_width,
                img_height: image_height,
                link: share_url + '&adtag=wx',
                desc: desc,
                title: title
            }, function (res) {
                WeixinJSBridge.log(res.err_msg)
            })
        })
    }
    if (typeof top.window.WeixinJSBridge == "undefined" || !top.window.WeixinJSBridge.invoke) {
        //没有就监听ready事件
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
        }
    } else {
        //初始化结束直接就执行吧！
        onBridgeReady()
    }
}

/**
 * Qzone分享
 */
function shareInQzone(shareData) {
    //加载Qzone的js组件。
    loadJs('//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js', function () {
        shareData.share_url += '&adtag=qzone'
        //下载完成后设置分享链接
        //数组对应的是默认文案、QQ空间、手机QQ、微信、微信朋友圈
        if (window.QZAppExternal) {
            window.QZAppExternal.setShare(function (d) {
                //console.log('QZAppExternal.setShare return '+JSON.stringify(d));
            }, {
                'type': "share",
                'image': [shareData.image_url, shareData.image_url, shareData.image_url, shareData.image_url, shareData.image_url],
                'title': [shareData.title, shareData.title, shareData.title, shareData.title, shareData.desc],
                'summary': [shareData.desc, shareData.desc, shareData.desc, shareData.desc, shareData.desc],
                'shareURL': [shareData.share_url, shareData.share_url, shareData.share_url, shareData.share_url, shareData.share_url]
            })
        }
    })
}

/**
 * 在手Q中分享
 */
function shareInQQ(shareData) {
    let initShare = function (type) {
        //0：QQ好友;
        //1：QQ空间;
        //2：微信好友
        //3：微信朋友圈
        let shareUrl = shareData.share_url
        switch (type.toString()) {
            case "0":
                shareUrl += "&adtag=qq"
                break
            case "1":
                shareUrl += "&adtag=qzone"
                break
            case "2":
                shareUrl += "&adtag=wx"
                break
            case "3":
                shareUrl += "&adtag=pyq"
                break
        }
        // //朋友圈将desc和title合并
        let title = type == "3" ? shareData.desc : shareData.title

        mqq.ui.shareMessage({
            title: title,
            desc: shareData.desc,
            share_type: type,
            back: true,
            image_url: shareData.image_url,
            share_url: shareUrl,
            puin: 2720152058,
            sourceName :'QQ团队'
        }, function (res) {
            // if (res.retCode == 0) {
            //     TCISD.hotClick('MMA.TIMEMACHINE.SHARE_' + type + "_SUCCESS");
            //     mqq.ui.popBack();
            // } else {
            //     TCISD.hotClick('MMA.TIMEMACHINE.SHARE_' + type + "_ERROR");
            // }
        })
    }
    setTimeout(function () {
        mqq.ui.setOnShareHandler(function (type) {
            initShare(type)
        })
    }, 200)
}

/**
 * 设置分享
 */
export function setShare(shareData) {
    if (isWx) {
        //微信分享
        shareInWX(shareData)
        return
    }
    if (isQzone) {
        //Qzone分享
        shareInQzone(shareData)
        return
    }
    if (isMobileQQ) {
        //手Q分享
        shareInQQ(shareData)
        return
    }
}

/**************************分享相关 end ***********************/


/**
 * [CGI测速和返回码上报]
 * 依赖用户登录
 * @param  {[string]} domain    [cgi所在的域名]
 * @param  {[string]} cgi       [完整的cgi url(不带参数)]
 * @param  {[number]} type      [1 成功,2 失败,3 逻辑失败]
 * @param  {[number]} code      [具体的返回码]
 * @param  {[number]} time      [cgi延时]
 * @param  {[number]} rate      [采样率,100意味着1/100的采样]
 * @param  {[number]} uin       [用户的uin]
 */
export function cgiReport (domain, cgi, type, code, time, rate, uin) {
    const img = new Image()
    rate = rate || 1
    img.src = `http://report.huatuo.qq.com/code.cgi?domain=${encodeURIComponent(domain)}&cgi=${encodeURIComponent(cgi)}&type=${type}&code=${code}&time=${time}&rate=${rate}&uin=${uin}`
// TODO: cgi => 只要path
}

/**
 * [获取指定cookie]
 * @param  {[string]} name  [cookie字段名称]
 * @return {[string]} value [该cookie字段的值]
 */
export  function getCookie (name) {
    const cookie = document.cookie
    if (cookie.length) {
        let start = cookie.indexOf(`${name}=`)
        if (start !== -1) {
            start = start + name.length + 1
            let end = cookie.indexOf(';', start)
            if (end === -1) {
                end = cookie.length
            }
            return unescape(cookie.substring(start, end))
        }
    }
    return ''
}

/**
 * [获得UIN]
 * @return {[type]} [description]
 */
export function getUin () {
    var uin = getCookie('uin') || getCookie('luin');
    return parseInt(uin.slice(1), 10).toString();
}

export function openApp(url) {
    //判断是否在手Q中
    if (typeof mqq == "undefined" || typeof mqq.QQVersion == "undefined" || mqq.QQVersion == 0) {
        //非手Q下
        setTimeout(function () {
            showDialog({
                text: '如果页面无法正常跳转，请下载最新版本QQ后查看。',
                left: '取消',
                right: '前往下载',
                leftFunc: function () {
                    $('.dialog-bg').hide()
                    $('.dialog').hide()
                    tcssReport('qqadult.btn.setheader.openqq_cancel')
                    return
                },
                rightFunc: function () {
                    tcssReport('qqadult.btn.setheader.openqq_down')
                    if (OS.iphone) {
                        location.href = 'itms-apps://itunes.apple.com/cn/app/qq-2011/id444934666?mt=8'
                    } else {
                        location.href = '//im.qq.com/mobileqq/touch/android'
                    }
                }
            })
        }, 1500) //1.5秒后执行
        //唤起手Q并跳转到指定页面
        openQQ(url)
    }
}

/*

showDialog()

html:
<div class="dialog">
    <div class="dialog-bg"></div>
    <div class="dialog-content none">
        <div class="dialog-detail"><span>若页面无法正常加载，请下载最新版本QQ后查看。</span></div>
        <div class="dialog-bottom">
            <div class="dialog-left">稍后再试</div>
            <div class="dialog-right">立即下载</div>
        </div>
    </div>
</div>
<div class="dialog-bg none"></div>

css:
.dialog,
.dialog-bg {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    -webkit-transform: translate3d(0,0,0);
}

.dialog-content {
    position: absolute;
    z-index: 500;
    top: 50%;
    left: 50%;
    color: #000;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background-color: #fff;
    //height: 130px * 2;
    width: 256px * 2;
    border-radius: 3px * 2;
    text-align: center;
    font-size: 14px * 2;
}

.dialog-detail {
    width: 256px * 2;
    height: 50px * 2;
    padding: 18px * 2;
    vertical-align: middle;
    display: table-cell;
    text-align: left;
    border-bottom: 0.5px * 2 solid rgba(204, 204, 204, 0.8);
}

.dialog-detail span {
    line-height: 1.5;
}

.dialog-detail::before {
    content: ' ';
    position: absolute;
    height: 2px * 2;
    background: #11b7f5;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 2px * 2;
}

.dialog-bottom {
    display: -webkit-box;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 44px * 2;
    width: 100%;
    line-height: 44px * 2;
    border-radius: 4px * 2;
    font-size: 16px * 2;
    color: #00a5e0;
}

.dialog-left {
    color: #000;
    box-sizing: border-box;
    width: 50%;
    height: 44px * 2;
    line-height: 44px * 2;
    font-size: 16px * 2;
    border-right: 0.5px * 2 solid rgba(204, 204, 204, 1);
}

.dialog-right {
    color: #000;
    width: 50%;
    height: 44px * 2;
    line-height: 44px * 2;
    font-size: 16px * 2;
    box-sizing: border-box;
}

.dialog-left:active,
.dialog-right:active {
    background-color: rgba(0, 0, 0, 0.1);
}

.dialog-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 300;
}

.active:active {
    // background-color: rgba(204, 204, 204, 1);
}
*/
export function showDialog(params) {
    $('.dialog-detail span').text(params.text)
    $('.dialog-left').text(params.left)
    $('.dialog-right').text(params.right)
    if (typeof params.leftFunc == 'function') {
        $('.dialog-left').on('click', params.leftFunc)
    }
    if (typeof params.rightFunc == 'function') {
        $('.dialog-right').on('click', params.rightFunc)
    }
    $('.dialog-bg').show()
    $('.dialog').show()
}

function openPage(url) {
    if (OS.iphone) {
        //如果是IOS
        //iOS 9 不能用ifarme拉起手Q
        location.href = url
    } else if (OS.android) {
        //如果是android
        var proxy_frame = document.createElement('iframe')
        proxy_frame.style.display = 'none'
        proxy_frame.src = url
        proxy_frame.onload = function () {}
        setTimeout(function () {
            document.body.appendChild(proxy_frame)
        }, 0)
    }
}

function condition() {
    var ua = navigator.userAgent,
        inChrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)

    //获取android的大版本号（4或者5，如果需要全部的版本号去掉split）
    var getAndroidVersion = function () {
        var ua = navigator.userAgent.toLowerCase(),
            version = ua.match(/android\s([0-9\.]*)/)
        return version ? version[1].split('.')[0] : false
    }
    return {
        inChrome: inChrome,
        androidVersion: getAndroidVersion()
    }
}


function getURL(jumpURL) {
    if (mqq.android && condition.inChrome && condition.androidVersion() >= 5) {
        //安卓 5.0 后改用 chrome 作为默认浏览器，scheme 地址有变
        return 'intent://forward/url?src_type=web&style=default&=1&version=1&url_prefix=' + btoa(jumpURL) + '#Intent;scheme=mqqapi;package=com.tencent.mobileqq;end'
    } else {
        return 'mqqapi://forward/url?src_type=web&style=default&=1&version=1&url_prefix=' + btoa(jumpURL)
    }
}

export function openQQ(jumpURL) {
    if (OS.iphone) {
        //iOS 9 不能用ifarme拉起手Q
        location.href = getURL(jumpURL)
    } else {
        var proxy_frame = document.createElement("iframe")
        proxy_frame.style.display = 'none'
        proxy_frame.src = getURL(jumpURL)

        proxy_frame.onload = function () {}
        setTimeout(function () {
            document.body.appendChild(proxy_frame)
        }, 0)
    }
}

export function qqVersion (cb){
    
    if (mqq.compare('6.6.8') < 0) {
        //手Q版本不对
        tcssReport('qqadult.btn.setheader.version')

        showDialog({
            text: '您的手机QQ版本过低，无法设置QQ头像，是否升级？',
            left: '取消',
            right: '前往升级',
            leftFunc: function () {
                tcssReport('qqadult.btn.setheader.version_cancel');
                $('.dialog-bg').hide()
                $('.dialog').hide()
                return
            },
            rightFunc: function () {
                tcssReport('qqadult.btn.setheader.version_down')
                if (mqq.iOS) {
                    tcssReport('qqadult.btn.setheader.version_down_iso')
                    location.href = 'itms-apps://itunes.apple.com/cn/app/qq-2011/id444934666?mt=8'
                } else {
                    tcssReport('qqadult.btn.setheader.version_down_android')
                    location.href = '//im.qq.com/mobileqq/touch/android'
                }
            }
        })

        tcssReport('qqadult.index.blow');
        
        return
        
    } else {

        //设置头像
        cb && cb();
        
    }
    
}