var eventUtil = {
	//添加句柄
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
				}else{
					element["on"+type] = handler;
					}
		},
	
	//删除句柄
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
			}else if(element.detachEvent){
				element.detachEvent("on"+type,handler);
				}else{
					element["on"+type] = null;
					}
		},
	  //获取事件
	  getEvent:function(event){
		return event?event:window.event;
	  },
	  //获取类型
	  getType:function(event){
		return event.type;
	  },
	  //获取对象目标
	  getElement:function(event){
		return event.target || event.srcElement;
	  },
	  //取消默认行为
	  preventDefault:function(event){
		if(event.preventDefault){
		  event.preventDefault();
		}else{
		  event.returnValue=false;
		}
	  },
	 //阻止冒泡 
	 stopPropagation:function(event){
	   if(event.stopPropagation){
		 event.stopPropagation();
	   }else{
		 event.cancelBubble=true;
	   }
	 },
	 //获取Class
	 getByClass:function(clsName,parent){
	  var oParent=parent?document.getElementById(parent):document,
		  eles=[],
		  elements=oParent.getElementsByTagName('*');
	  for(var i=0,l=elements.length;i<l;i++){
		if(elements[i].className==clsName){
		  eles.push(elements[i]);
		}
	  }
	  return eles;
	},
	
	//获取ID
	getByID:function(id){
	  return document.getElementById(id);
	},
	
	//获取样式
    getStyle:function(obj,attr){
		 if(obj.currentStyle){
			 return obj.currentStyle[attr];
			 }else{
				 return getComputedStyle(obj,false)[attr];
				 }
	 },
	 
	//运动
	//starMove(obj,{attr1:iTarget1,attr2:iTarget},fn);	 
    starMove:function(obj,json,fn){//添加一个回调函数fn
	 clearInterval(obj.timer);
	 obj.timer = setInterval(function(){
		 var flag = true; //假设都到达了目标值
		 for(var attr in json){
			 //1.取当前值
			 var icur = 0;
			 if(attr == 'opacity'){
				 icur = Math.round(parseFloat(eventUtil.getStyle(obj,attr))*100);
				 }else{
					 icur = parseInt(eventUtil.getStyle(obj,attr));
					 }
					 
			 //2.算速度
			 var speed = (json[attr] - icur)/8;
			 speed = speed>0?Math.ceil(speed):Math.floor(speed);
			 
			 //3.检查停止
			if(icur != json[attr]){
				 flag = false;
				 }
			if(attr == 'opacity'){
					 obj.style.filter = "alpha(opacity:'+(icur + speed)+')";
					 obj.style.opacity = (icur + speed)/100;
					 }else{
						 obj.style[attr] = icur + speed + "px";
						 }
			if(flag){
				clearInterval(obj.timer);
				if(fn){//判断是否存在回调函数,并调用
					fn();
					}
				}
			}
		 },30);
	 }
	}