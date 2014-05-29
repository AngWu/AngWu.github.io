// JavaScript Document
function get(node){
	node = typeof node=="string" ? document.getElementById(node) : node;
	return node;
}
function $(node){
	node = typeof node=="string" ? document.getElementById(node) : node;
	return node;
}

//获取下一个节点，封装IE-Firefox的区别 （node为当前节点的id）
function getNextNode(node){
	node = typeof node=="string"?document.getElementById(node):node;
	var nextNode = node.nextSibling; //下一个节点 ， IE将忽略节点之间的文字和空格，firefox不会
	if(!nextNode) return null;
	if(!document.all){
		while(true){
			if(nextNode.nodeType==1){  //对于nodeType : 1=元素节点 2=属性节点 3=文本节点 8=注释 9=文档
				break;	
			} else {
				if(nextNode.nextSibling){
					nextNode = nextNode.nextSibling;
				} else {
					break;
				}
			}
		}	
	}
	return nextNode;	
};

//设置透明度，也是针对IE-Firefox的差别 （node为目标节点的id，level是透明度值：0-100）
function setOpacity(node,level){
		node = typeof node=="string" ? document.getElementById(node) : node;
		if(document.all){
			node.style.filter ='alpha(opacity='+level+')'; //IE的设置透明方法
		} else {
			node.style.opacity = level/100; 
		}		//firefox的方法
}

//阻止事件冒泡
function stopPropagation(e){
	e = window.event || e; //在ie下，event对象是作为window的属性作用域全局作用域的，在firefox下是作为事件参数存在的
	if(document.all){
		e.cancelBubble = true;
	} else {
		e.stopPropagation();	
	}
}


//同样的onXxx()作用于同一个对象时会产生覆盖，比如后面的btn.onclick()会覆盖掉前面的btn.onclick()
//解决：封装的on();函数，包含了IE:attachEvent();和FF:addEventListener
function on(node,eventType,handler){
	node = typeof node == "string" ? document.getElementById(node) : node;
	if(document.all){   //用于区分ie 和ff
		node.attachEvent("on"+eventType,handler);
	} else {
		node.addEventListener(eventType,handler,false);
	}
}

//返回去掉首位空格的字符串
function trim(ostr){
	return ostr.replace(/^\s+|\s+$/g,""); 
}	
function isNumber(s){
	return !isNaN(s);
}	
function isString(s){
	return typeof s ==="string";
}	
function isBoolean(s){
	return typeof s==="boolean";
}	
function isFunction(s){
	return typeof s ==="function";	
}	
function isNull(s){
	return s===null;	
}
function isUndefined(s){
	return typeof s ==="undefined";	
}
function isEmpty(s){
	return /^\s*$/.test(s);	
}
function isArray(s){
	return s instanceof Array;	
}
//封装的getElementsByClassName
function getElementsByClassName(str,root,tag){			
	if(root){
		root = typeof root =="string" ? document.getElementById(root) : root ;
	}else{
		root = document.body;
	}
	tag = tag || "*";
	var els = root.getElementsByTagName(tag),arr=[];
	for(var i=0 , n=els.length ; i<n ; i++){
		for(var j=0 ; k=els[i].className.split(" ") , l=k.length , j<l ; j++){
			if(k[j]==str){
				arr.push(els[i]);
				break;
			}
		}
	}
	return arr;
};
//封装的继承函数
function extend(subClass , superClass){
	var F = function(){};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
	subClass.superclass = superClass.prototype;
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.constructor = superClass;
	}	
}

//sort()函数的比较函数 array.sort(compare);
function compare(v1,v2){
	if(v1<v2){
		return -1;
	} else if(v1>v2){
		return 1;
	} else {
		return 1;	
	}
}
