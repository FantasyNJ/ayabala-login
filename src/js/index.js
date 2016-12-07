//判断是否登录
// $(function(){
//     if(window.localStorage.username){   //已经登录
//         $('.h-btn.comments').css('display', 'block');
//     }else{
//         $('.h-btn.login').css('display', 'block');
//     }
// })
//作品展示
$(function(){
    var wrap = $('.production-con');

    var cfg = [
        {
           img: {
               img: './img/licaibao.jpg',
               img_p: './img/licaibao-p.jpg'
           },
            h3: '理财宝',
            title: '响应式网站',
            con: '使用gulp进行css和js的整合和压缩，运用Owl Carousel实现了网页轮播图，使用picture标签实现响应式图片、picturefill实现响应式图片的兼容。适配手机端、平板和PC端。'
        },
        {
            img: {
                img: './img/component.jpg',
                img_p: './img/component-p.jpg'
            },
            h3: '互联网数据展示',
            title: '面向对象组件化',
            con: '组件方式开发的 Web App全站。使用fullpage插件实现页面滚动，运用面向对象组件化构建各个图标、CSS3和Canvas绘制图标。建议使用移动端Chrome浏览器访问。'
        },
        {
            img: {
                img: './img/yun.jpg',
            },
            h3: 'AYABALA云盘',
            title: '网络云盘',
            con: '通过Node.js和MongoDB数据库搭建，使用mongoose对数据库进行操作、babel将es6代码转换成es5、swig模板引擎渲染页面。主页使用jQuery，网盘页面使用原生JS，运用到了ES6中的模板字符串渲染文件夹，登录注册使用Ajax数据交互完成。云盘数据使用对象模拟JSON，整体实现了对文件夹的创建、删除、拖拽移动、拖拽选中、重命名、右键菜单等功能。'
        },
        {
            img: {
                img: './img/edu.jpg',
            },
            h3: '网易教育产品部 ',
            title: '网易云课堂内部项目',
            con: '根据设计图完成了网易教育产品部页面。通过ajax获取课程详细内容以及账号登录验证。使用cookie实现了顶部通知条关闭后下次访问不再出现。右侧热门推荐每隔5秒更新一门课程，实现滚动更新热门课程的效果。当窗口宽度小于1205px时使用小屏布局。项目全部使用原生JS完成，没有使用任何框架。'
        },
        {
            img: {
                img: './img/photo.jpg',
            },
            h3: 'React版照片墙',
            title: '单页面照片展示',
            con: '使用 Yeoman 脚手架搭建项目结构，CSS3动画实现图片、下方按钮的切换旋转。'
        },
        {
            img: {
                img: './img/163music.jpg',
            },
            h3: '网易云音乐',
            title: '网易云音乐',
            con: '使用全屏布局和原生js实现了网易云音乐首页。图片托管在七牛云上。实现了轮播图，专辑切换、回到顶部按钮和底部播放器的锁定隐藏。'
        },
    ];

    for(var i = 0;i < cfg.length;i++){
        var f1 = 'fl',
            f2 = 'fr';
        if(i % 2 === 1){
            f1 = 'fr';
            f2 = 'fl';
        }
        create(cfg[i], f1, f2);
    }
    /*
    * 创建单个产品容器
    * @param   obj     json
    * @param   f1,f2   float left or right
    * */
    function create(obj, f1, f2){
        var section = $('<section class="section clearfix">');
        var website = $('<div class="website '+f1+'">');
        var desc = $('<div class="desc '+f2+'">');
        var strW = '';
        if(obj.img.img){
            strW = '<div class="screen"><div class="img-s"><img src="'+ obj.img.img +'"></div></div>';
        }
        if(obj.img.img_p){
            strW += '<div class="phone"><div class="img-p"><img src="'+ obj.img.img_p +'"></div></div>';
        }
        website.html(strW);
        var strD = '';
        strD = '<h3>'+obj.h3+'</h3><p class="title">'+obj.title+'</p><p class="con">'+obj.con+'</p>';
        desc.html(strD);
        section.append(website);
        section.append(desc);
        wrap.append(section);
    }
})

//头部内容居中
$(function(){
    var headerWrap = $('.header-wrap');
    var video = $('.header-wrap video');
    var videoShade = $('.video-shade');
    var bgImg = $('.bg-img');

    center();

    $(window).resize(center);

    //图片视频居中
    function center(){
        var l = Math.floor((headerWrap.width() - $(window).width())/2);
        headerWrap.css('left', -l);
    }
    //视频可以播放时隐藏图片
    //修改火狐浏览器的BUG
    //使用canplay事件问题太多,但是折中考虑
    $('video').on('canplay', function(){
        video[0].play();
        videoShade.css('opacity', .5);
        bgImg.css('opacity', 0);
    })

})
