/*
	1、整理结构
	2、获取  保存
	3、增删改查
*/ 

var createBtn=document.querySelector(".nav-list input[type=button]");
var text=document.querySelector(".nav-list input[type=text");
var nowlist=document.querySelector(".now .list");
var comlist=document.querySelector(".com .list");
var nowNum=document.querySelector(".now .num");
var comNum=document.querySelector(".com .num");

createBtn.onclick=function(){
	if(text.value==""){    //判断输入框内有没有内容
		alert("请输入待办事项内容");
		return;
	}
	var data=getData();
	data.push({title:text.value,done:false});
	text.value=="";
	saveData(data);
	reWrite();
}
/*获取数据*/ 
function getData(){
	var data=JSON.parse(localStorage.getItem("todo"));   //把字符串转换成对象
	return data||[];
}
/*保存数据*/
function saveData(data){
	localStorage.setItem("todo",JSON.stringify(data));   //把获取到的对象转换成字符串
} 

/*重汇数据*/
function reWrite(txt){
	var nStr="";
	var cStr="";
	var nNum=0;
	var cNum=0;
	var data=getData();
	data.forEach(function(o,i){  //o是对象 i是下标
		if(o.done==false){
			nStr+='<li id='+i+'><input type="checkbox" onclick=changeState('+i+',true)><div class="cont" contenteditable=true onblur=changeText('+i+',this.innerHTML)>'+o.title+'</div><input type="button" class="del" value="x" onclick=delData('+i+')></li>';
			nNum++;
		}
		else{
			cStr+='<li id='+i+'><input type="checkbox" onclick=changeState('+i+',false) checked><div class="cont" contenteditable=true onblur=changeText('+i+',this.innerHTML)><del>'+o.title+'</del></div><input type="button" class="del" value="x" onclick=delData('+i+')></li>';
			cNum++;
		}
	})
	nowlist.innerHTML=nStr;
	comlist.innerHTML=cStr;
	nowNum.innerHTML=nNum;
	comNum.innerHTML=cNum;
} 

/*改变数据的状态*/
function changeState(id,state){
	var data=getData();  //获取数据
	data[id].done=state;  //将当前id 的状态改变值赋给它
	saveData(data);   //保存数据
	reWrite();   //重汇数据
} 

/*改变文本*/
function changeText(id,txt){
	var data=getData();
	if(data[id].title==txt){
		return;
	}
	data[id].title=txt;
	saveData(data);
	reWrite();
} 
/*删除数据*/
function delData(id){
	var data=getData();
	data.splice(id,1);
	saveData(data);
	reWrite();
}
document.querySelector(".delall").onclick=function(){
	localStorage.clear();
	reWrite();
}
