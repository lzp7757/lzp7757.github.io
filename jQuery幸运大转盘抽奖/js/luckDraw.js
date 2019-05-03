//抽奖DOM
var scrollH=document.documentElement.scrollHeight||document.body.scrollHeight;//获取网页高度
var scrollW=document.documentElement.scrollWidth||document.body.scrollWidth;//获取网页宽度
var clientH=$(window).height();//获取屏幕可见高度
var clientW=document.documentElement.clientWidth||document.body.clientWidth;//获取屏幕可见宽度
var luckDrawIco=document.createElement('div');//创建抽奖缩略图
luckDrawIco.className='luckDrawIco';
luckDrawIco.innerHTML='<img src="luckDraw/turplate-icon.png" />';
document.body.appendChild(luckDrawIco);
var luckDrawBox=document.createElement('div');//创建抽奖转盘
var bodyBg=document.createElement('div');//创建抽奖背景
luckDrawBox.className='wrapper';
bodyBg.className='bodyBg';
luckDrawBox.innerHTML='<img src="luckDraw/turplate-bg.gif" class="luckdraw-bg" />\
      <img src="luckDraw/close.png" class="close" id="close" />\
      <div class="ribbon">\
        你的抽奖次数：0 次\
      </div>\
      <div class="box" id="box">\
          <img src="luckDraw/turplate.png" alt="">\
      </div>\
      <div id="button" class="luckDraw-btn">\
          <img src="luckDraw/btn.png" alt="">\
      </div>'
//背景宽高赋值
bodyBg.style.width=scrollW+"px";
bodyBg.style.height=scrollH+'px';
//每5秒抽奖缩略图添加css3样式
setInterval(function(){
    luckDrawIco.className='luckDrawIco animated swing';
},5000);
//每7秒抽奖缩略图删除css3样式
setInterval(function(){
    luckDrawIco.className='luckDrawIco';
},7000);

//创建抽奖结果
var prizeBox=document.createElement('div');
prizeBox.className='prize-box';
prizeBox.innerHTML='<p id="prize-cont"></p>\
    <img src="luckDraw/close.png" class="prizeBox-close" id="prizeBox-close" />\
    <a href="#" class="prize-a" id="prize-a"></a>\
';
//抽奖结果写入body
function prizeBoxAddFun(){
    document.body.appendChild(prizeBox);
    document.body.appendChild(bodyBg);
    //设置抽奖结果居中
    var prizeBoxH=prizeBox.offsetHeight,
        prizeBoxW=prizeBox.offsetWidth;
    prizeBox.style.left=(clientW-prizeBoxW)/2+"px";
    prizeBox.style.top=(clientH-prizeBoxH)/2+"px";
}
//关闭抽奖结果
function prizeBoxremove(){
    document.body.removeChild(prizeBox);
    document.body.removeChild(bodyBg);
};
//转盘写入body
function appendFun(){
    document.body.appendChild(luckDrawBox);
    document.body.appendChild(bodyBg);
    //设置转盘居中
    var luckDrawBoxH=luckDrawBox.offsetHeight,
        luckDrawBoxW=luckDrawBox.offsetWidth;
    luckDrawBox.style.left=(clientW-luckDrawBoxW)/2+"px";
    luckDrawBox.style.top=(clientH-luckDrawBoxH)/2+"px";
};
//关闭转盘
function removeFun(){
    document.body.removeChild(luckDrawBox);
    document.body.removeChild(bodyBg);
};
//抽奖
//初始化isDoing，false时可以启动抽奖按钮
var isDoing=false;
//点击抽奖缩略图创建转盘
eventUtil.addHandler(luckDrawIco,'click',function(){
    appendFun();
    //关闭转盘
    var closes=document.getElementById('close');
    eventUtil.addHandler(closes,'click',removeFun);
    init();
});
function init(){
    var button=document.getElementById('button');
    var box=document.getElementById('box');
    isDoing=false;//false时可以启动抽奖按钮
    //初始化转盘css3样式
    var deg = $(pars.body).attr('data-deg');
    $(pars.body).find('.box').css({
        transform: 'rotate(' + deg + 'deg)',
        transition: 'none'
    })
    //点击转盘抽奖
    button.onclick=function(){
        //通过AJAX从后台传数据，获取奖品
        /* $.ajax({
            type:"post",//请求方式
            url:"/",//请求地址
            dataType:"json",//响应数据类型
            success:function(data){
                var index = data.prize;
                var degNum;//通过角度获取奖品顺时针，45度一个奖品
                if(index==1){
                    degNum=248;
                }else if(index==2){
                    degNum=248;
                }else if(index==3){
                    degNum=248;
                }else if(index==4){
                    degNum=248;
                }else if(index==5){
                    degNum=248;
                }else if(index==6){
                    degNum=248;
                }else if(index==7){
                    degNum=248;
                }else if(index==8){
                    degNum=248;
                }
                if(!$this.isDoing) {
                    goRotate(degNum);//调用
                    isDoing = true;//ture阻止连续点击抽奖
                }
            },
            error:function(){
               alert('服务器连接失败，请稍后再试！');
            }
        })*/
        //测试用
        if(isDoing==false) {
            //goRotate(248);//获取指定角度
            clickCbFun();//测试用获取随机角度
            isDoing = true;//ture阻止连续点击抽奖
        }
    }
    //初始化转盘css3样式
    box.addEventListener("transitionend", transitionendFun);
};
//初始化转盘css3样式
function transitionendFun(){
    var deg = $(pars.body).attr('data-deg');
    renderCbFun(deg);
    $(pars.body).find('.box').css({
        transform: 'rotate(' + deg + 'deg)',
        transition: 'none'
    })
    isDoing=false;//false时
}
//设置转盘停止位置
function goRotate(deg) {
    // var rotateEnd = this.rotateAll + deg;
    var rotateEnd = pars.rotateNum * 360 + deg;
    $(pars.body).find('.box').css({
        transform: 'rotate(' + rotateEnd + 'deg)',
        transition: 'all 5s'
    })
    $(pars.body).attr('data-deg',deg);
};
//初始化奖项参数
var pars = {
    rotateNum: 8,
    body: '.wrapper',
    //clickCb: clickCbFun,
};
//创建转盘随机角度
function clickCbFun(deg) {
    var random = Math.floor(Math.random() * 360);//获取随机角度
    goRotate(random);
}
//对应奖品
function renderCbFun(deg) {
    var str = '';
    if (deg >= 0 && deg < 45) {
        str = '1000美元现金券';
    } else if (deg >= 45 && deg < 90) {
        str = '5000美元现金券';
    } else if (deg >= 90 && deg < 135) {
        str = '20美金抵现券';
    } else if (deg >= 135 && deg < 180) {
        str = '500美元现金券';
    } else if (deg >= 180 && deg < 225) {
        str = '8美元抵现券';
    } else if (deg >= 225 && deg < 270) {
        str = 'iPhone XS Max';
    } else if (deg >= 270 && deg < 315) {
        str = '10美元抵现劵';
    } else if (deg >= 315 && deg < 360) {
        str = '2000美金现金券';
    }
    removeFun();//关闭转盘
    prizeBoxAddFun();//创建奖品结果层
    var prizeCont=document.getElementById('prize-cont');
    var prizeBoxClose=document.getElementById('prizeBox-close');
    prizeCont.innerHTML='恭喜你获得:"' + str + '"';//写入对应奖品
    eventUtil.addHandler(prizeBoxClose,'click',prizeBoxremove);//关闭奖品结果层
}

