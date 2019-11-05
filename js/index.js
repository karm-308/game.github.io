/**
 * Created by Administrator on 2019/11/5.
 */
$(function () {
    //监听游戏规则按钮
    $(".rules").click(function () {
        //点击游戏规则按钮进行淡入
        $(".rule").stop().fadeIn(1000);
    });
    //监听关闭按钮
    $(".close").click(function () {
        //点击关闭按钮进行淡出
        $(".rule").stop().fadeOut(1000);
    });
//    点击游戏开始按钮，按钮淡出消失
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        //    调用处理进度条的方法
        progressHandle();
    //    调用第一次点击开始游戏处理灰太狼动画的方法
        startWolfAnimation();
    });
    //监听重新开始按钮
    $(".reStart").click(function () {
        $(".mask").stop().fadeOut(100);
        //    重新调用处理进度条的方法
        progressHandle();
        //    调用灰太狼动画的方法
        startWolfAnimation();
    });


    //定义一个专门处理进度条的方法
    function progressHandle() {
        //    重新设置进度条的宽度
        $(".progress").css({
            width: 180
        });
        //    1.开启定时器处理进度条
        var timer = setInterval(function () {
            //    2.拿到当前进度条的宽度
            var progressWidth = $(".progress").width();
            //    3.减少当前的宽度
            progressWidth -= 1;
            //    4.重新给进度条定义宽度
            $(".progress").css({
                width: progressWidth
            });
            //5.监听进度条是否走完
            if (progressWidth <= 0) {
                //    关闭定时器
                clearInterval(timer);
                //    显示重新开始界面
                $(".mask").stop().fadeIn(100);
            //    停止灰太狼动画
                stopWolfAnimation();
            };
        }, 100);

    };
//    定义一个专门处理灰太狼动画的方法

// 全局变量，利于调用
    var wolfTimer;
    function startWolfAnimation() {
        //    1.定义俩个数组专门处理灰太狼和小灰灰的动画
        var wolf1 = ['./images/h0.png', './images/h1.png', './images/h2.png',
            './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png',
            './images/h7.png', './images/h8.png', './images/h9.png'];
        var wolf2 = ['./images/x0.png', './images/x1.png', './images/x2.png',
            './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png',
            './images/x7.png', './images/x8.png', './images/x9.png'];
    //   2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        // 3.创建一个图片
        var $wolfImage = $("<img src='' class='wolfImage'>");
    //    4.获取图片的随机位置(向上取整完取随机数)
        var posIndex = Math.round(Math.random() * 8);
    //    5.设置图片的位置
        $wolfImage.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
    //    6.随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf1 : wolf2;

    //    7.设置图片的内容,利用定时器设置图片不断的切换,添加window，变成全局变量
             window.wolfIndex = 0;
             window.wolfIndexEnd =5;
                wolfTimer = setInterval(function(){
            //判断图片是不是到了第五张，如果到了第五张就清除定时器，然后开始新的动画
            if(wolfIndex >wolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                //调用动画方法
                startWolfAnimation();
            }
            $wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;
        },300);

    //    将图片添加到界面上
        $(".container").append($wolfImage);

    //  调用处理游戏规则的方法
        gameRules($wolfImage);
    }

    function gameRules($wolfImage){
        //.one事件只执行一次
        $wolfImage.one("click",function(){
        //    修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
        //    拿到当前点击图片的地址
            var $src = $(this).attr("src");
        //    根据图片地址判断是否是灰太狼
            var flag = $src.indexOf("h") >=0;
        //    根据点击的图片类型增减分数
            if(flag){
                $(".score").text(parseInt($(".score").text())+10);
            }else{
                $(".score").text(parseInt($(".score").text())-10);
            };
        });

    }
//    定义一个停止动画的方法
    function stopWolfAnimation(){
        $(".wolfImage").remove();
        clearInterval(wolfTimer)
    };

});