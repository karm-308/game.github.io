/**
 * Created by Administrator on 2019/11/5.
 */
$(function () {
    //������Ϸ����ť
    $(".rules").click(function () {
        //�����Ϸ����ť���е���
        $(".rule").stop().fadeIn(1000);
    });
    //�����رհ�ť
    $(".close").click(function () {
        //����رհ�ť���е���
        $(".rule").stop().fadeOut(1000);
    });
//    �����Ϸ��ʼ��ť����ť������ʧ
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        //    ���ô���������ķ���
        progressHandle();
    //    ���õ�һ�ε����ʼ��Ϸ�����̫�Ƕ����ķ���
        startWolfAnimation();
    });
    //�������¿�ʼ��ť
    $(".reStart").click(function () {
        $(".mask").stop().fadeOut(100);
        //    ���µ��ô���������ķ���
        progressHandle();
        //    ���û�̫�Ƕ����ķ���
        startWolfAnimation();
    });


    //����һ��ר�Ŵ���������ķ���
    function progressHandle() {
        //    �������ý������Ŀ��
        $(".progress").css({
            width: 180
        });
        //    1.������ʱ�����������
        var timer = setInterval(function () {
            //    2.�õ���ǰ�������Ŀ��
            var progressWidth = $(".progress").width();
            //    3.���ٵ�ǰ�Ŀ��
            progressWidth -= 1;
            //    4.���¸�������������
            $(".progress").css({
                width: progressWidth
            });
            //5.�����������Ƿ�����
            if (progressWidth <= 0) {
                //    �رն�ʱ��
                clearInterval(timer);
                //    ��ʾ���¿�ʼ����
                $(".mask").stop().fadeIn(100);
            //    ֹͣ��̫�Ƕ���
                stopWolfAnimation();
            };
        }, 100);

    };
//    ����һ��ר�Ŵ����̫�Ƕ����ķ���

// ȫ�ֱ��������ڵ���
    var wolfTimer;
    function startWolfAnimation() {
        //    1.������������ר�Ŵ����̫�Ǻ�С�һҵĶ���
        var wolf1 = ['./images/h0.png', './images/h1.png', './images/h2.png',
            './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png',
            './images/h7.png', './images/h8.png', './images/h9.png'];
        var wolf2 = ['./images/x0.png', './images/x1.png', './images/x2.png',
            './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png',
            './images/x7.png', './images/x8.png', './images/x9.png'];
    //   2.����һ�����鱣�����п��ܳ��ֵ�λ��
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
        // 3.����һ��ͼƬ
        var $wolfImage = $("<img src='' class='wolfImage'>");
    //    4.��ȡͼƬ�����λ��(����ȡ����ȡ�����)
        var posIndex = Math.round(Math.random() * 8);
    //    5.����ͼƬ��λ��
        $wolfImage.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
    //    6.�����ȡ��������
        var wolfType = Math.round(Math.random()) == 0 ? wolf1 : wolf2;

    //    7.����ͼƬ������,���ö�ʱ������ͼƬ���ϵ��л�,���window�����ȫ�ֱ���
             window.wolfIndex = 0;
             window.wolfIndexEnd =5;
                wolfTimer = setInterval(function(){
            //�ж�ͼƬ�ǲ��ǵ��˵����ţ�������˵����ž������ʱ����Ȼ��ʼ�µĶ���
            if(wolfIndex >wolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                //���ö�������
                startWolfAnimation();
            }
            $wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;
        },300);

    //    ��ͼƬ��ӵ�������
        $(".container").append($wolfImage);

    //  ���ô�����Ϸ����ķ���
        gameRules($wolfImage);
    }

    function gameRules($wolfImage){
        //.one�¼�ִֻ��һ��
        $wolfImage.one("click",function(){
        //    �޸�����
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
        //    �õ���ǰ���ͼƬ�ĵ�ַ
            var $src = $(this).attr("src");
        //    ����ͼƬ��ַ�ж��Ƿ��ǻ�̫��
            var flag = $src.indexOf("h") >=0;
        //    ���ݵ����ͼƬ������������
            if(flag){
                $(".score").text(parseInt($(".score").text())+10);
            }else{
                $(".score").text(parseInt($(".score").text())-10);
            };
        });

    }
//    ����һ��ֹͣ�����ķ���
    function stopWolfAnimation(){
        $(".wolfImage").remove();
        clearInterval(wolfTimer)
    };

});