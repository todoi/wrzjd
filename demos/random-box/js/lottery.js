$(function(){
	loginSend();
	getUserProperty();
	addLotteryBind();
	
	$('.pop_close').click(function(){
		$('.diaMin').closePop();
	});
	$('.btn_hecheng').click(function(){
		$('.diaMin').closePop();
	});
	$('.btn_rule').click(function(){
		$('#rule').openPop();
	});
	$('.detail_close').click(function(){
		$('#rule').closePop();
	});
	
	$('.btn_jilu').click(function(){
		getLotteryRecord();
	});
	$('.dia_close').click(function(){
		$('#recordBox').closePop();
	});
});

function loginSend(){
	$.ajax({
		type : "post",
		url : ctx+ "/cases2016/olympicGames/loginSend.do?timestamp="+ new Date().getTime(),
		cache : false,
		dataType : "json",
		data : {
		},
		success : function(data) {
			if(data.retCode == 1){
				$('#goldMedalNum').html(data.goldMedalNum);
				errShow(99, 1);
			}
		}
	});
}

function getUserProperty(){
	$.ajax({
		type : "post",
		url : ctx+ "/cases2016/olympicGames/getUserProperty.do?timestamp="+ new Date().getTime(),
		cache : false,
		dataType : "json",
		data : {
		},
		success : function(data) {
			if(data.retCode == 1){
				//显示用户红包余额
				$('#goldMedalNum').html(data.goldMedalNum);
				$('#redPacket').html((data.redPacket/100).toFixed(2));
			
				var luckyHtml = "<div class=\"rollCon\"><ul class=\"liveList clearfix\">";
				$.each(data.luclyList, function(i, item) {
					luckyHtml+="<li><span class=\"span_1\"><i class=\"text-yellow\">" + item.nickName + "</i></span>" +
							"<span class=\"span_2\">于<i class=\"text-yellow\">" + item.recordTime.substring(0,16) + "</i></span>" +
							"<span class=\"span_3\">抽中<i class=\"text-yellow\">" + item.giftName + "</i></span></li>";
				});
				luckyHtml+="</ul></div>";
				$('.rollBox').empty().html(luckyHtml);
				var n=$('.rollCon ul li').length;
			    var s=$('.rollCon ul li').width();
			    $('.rollCon').rollOdao({dir: "left",width:s*n   });
				
			}
		}
	});
}

//转盘绑定点击事件
function addLotteryBind(){
	$(".btn_chou").bind('click',function(){
		playerGo();
	});
}

var timer;
var giftObj = new Object();
function playerGo(){
	$(".btn_chou").unbind();//解除按钮点击绑定 
	
	$.ajax({
		type : "post",
		url : ctx+ "/cases2016/olympicGames/playerGo.do?timestamp="+ new Date().getTime(),
		cache : false,
		dataType : "json",
		data : {
		},
		success : function(data) {
			if (data.retCode == 0) {
				//没有登录
				showLogin();
				return;
			}else if (data.retCode < 0) {
				errShow(data.retCode, data.retMsg);
				addLotteryBind();
			}else if (data.retCode == 1) {//转盘成功
				$('#goldMedalNum').html(data.goldMedalNum);
				giftObj = data.zpGiftConfig;
				StartGame(data.zpGiftConfig.giftID);
			}
		}
	});
}

var index=1,   //当前亮区位置
	prevIndex=19,   //前一位置
	Speed=300,   //初始速度
	Time,   //定义对象
	arr_length = 19; //GetSide(5,5),   //初始化数组
	EndIndex=1,   //决定在哪一格变慢
	cycle=0,   //转动圈数 
	EndCycle=3,   //计算圈数
	flag=false,   //结束转动标志
	random_num=1,  //中奖数
	quick=0;   //加速
	
function StartGame(giftID){
	$(".random_box li").removeClass("random_current"); //取消选中
	random_num = giftID;
	index=1; //再来一次,从1开始
	cycle=0;
	flag=false;
	Speed=300;

	if(random_num>8) {
		EndIndex = random_num - 8; //前8格开始变慢
	} else {
		EndIndex = random_num + 19 - 8; //前8格开始变慢
	}

	Time = setInterval(Star, Speed);
}

function Star(){
	//跑马灯变速
	if(flag==false){
		//走五格开始加速
		if(quick==5){
			clearInterval(Time);
			Speed=100;
			Time=setInterval(Star, Speed);
		}
		//跑N圈减速
		if(cycle==EndCycle && index-1==EndIndex){
			clearInterval(Time); 
			Speed=300;
			flag=true;   //触发结束
//			Time=setInterval(Star,Speed);
			TheEnd();
		}
	}
 
	if(index>arr_length){//转动个数超过19时从第一个算起且圈数加1
		index=1;
		cycle++; 
	}
 
	//结束转动并选中号码
	if(flag==true && index==parseInt(random_num)){ 
		quick=0;
		clearInterval(Time);
	}
	$("#random_"+index).addClass('random_current'); //设置当前选中样式
	if(index>1){
		prevIndex=index-1; 
	}else{
		prevIndex=arr_length;
	}
	$("#random_"+prevIndex).removeClass('random_current'); //取消上次选择样式 
	//最终弹窗
	if(flag==true && index==parseInt(random_num)){
		clearTimeout(timer);
	    timer = setTimeout("msgShow()", 600);
//		msgShow();
	}
	
	index++;
	quick++;
	
}

function TheEnd(){
	if(flag==true && Speed<1000){
		clearInterval(Time);
		Star();
		Time=setInterval(TheEnd, Speed);
		Speed=Speed + 100;
	}else{
		clearInterval(Time);
	}
}

function msgShow(){
	var title = "恭喜您获得" + giftObj.giftName;
	var msgInfo="";
	var butStr = "<a class=\"btn_dia btn_hecheng\">继续抽奖</a>";
	if(giftObj.giftTypeID == 1){
		msgInfo = "赢越多抽越多, 继续加油噢！";
	}else if(giftObj.giftTypeID == 6){
		msgInfo = "可在狼羊大战游戏中代替积分消耗！";
	}else if(giftObj.giftTypeID == 7){
		if(parseInt(giftObj.userType) > 0){
			msgInfo = "由于您在金杯奖励排行榜之外，系统额外赠送您"+ giftObj.userType +"个金杯，您的排名已提升，快去查看吧！";
		}else{
			msgInfo = "您的排名提升了，赶快去查看吧！";
		}
		butStr = "<a class=\"btn_green\" style=\"margin-right: 30px\" href='" + ctx + "/cases2016/olympicGames/min/goldCupRanking.do'>查看排名</a> <a class=\"btn_red\">继续抽奖</a>";
	}else if(giftObj.giftTypeID == 9){
		msgInfo = "您可在\"红包商城\"提取或兑换丰富奖品！";
	}else if(giftObj.giftTypeID == 5){
		msgInfo = "我们的工作人员将会在3个工作日内与您取得联系！";
	}
	//设置弹框信息
	$('#title').html(title);
	$('#msgInfo').html(msgInfo);
	$('#butStr').html(butStr);
	$('#msgBox').openPop();
	//点击关闭按钮
	$('.btn_hecheng').click(function(){
		$('#msgBox').closePop();
	});
	$('.btn_red').click(function(){
		$('#msgBox').closePop();
	});
	addLotteryBind();
	getUserProperty();
}

function errShow(type, errMsg){
	var title ="";
	var errInfo = errMsg;
	var butStr = "继续抽奖";
	if(type == -4){
		title = "金牌不够怎么办？";
		errInfo = "游戏10分钟送1枚，单局赢1000分有几率获得，赢得越多获得几率越大，单局赢100万100%获得！";
		butStr = "立即游戏";
	}else if(type == 99){
		title = "获得金牌*1";
		errInfo = "恭喜您今日首次登陆获得金牌1枚，赶快来抽iPhone6s Plus，明天登录将再赠送1枚！";
	}
	//设置弹框信息
	$('#errTitle').html(title);
	$('#errInfo').html(errInfo);
	$('#butShow').html(butStr);
	$('#errBox').openPop();
}

var currentDataList;
function getLotteryRecord(page){
	$.ajax({
		type : "post",
		url : ctx+ "/cases2016/olympicGames/getLotteryRecord.do?timestamp="+ new Date().getTime(),
		cache : false,
		dataType : "json",
		data : {
			"currentPage" : page,
			"pageSize" : 10
		},
		success : function(data) {
			
			if(data.retCode==0){
				//没有登录
				showLogin();
				return;
			}else if(data.retCode == 1){
				currentDataList = data.recordList;
				laodDataByPage(1);
				$('#recordBox').openPop(); //弹出弹框
			}
		}
	});
}

function laodDataByPage(pageNo){
	var pageSize = 8;
	var dataPaging = new Object();
	dataPaging.currentPage = pageNo;
	
	var list = new  Array();
	
	var totalCount = 0;
	var totalPage = 0;
	
	totalCount = currentDataList.length;
	
	if(totalCount == 0){
		//totalPage = totalPage;
		//return stallPaging;
	}else{
		if (totalCount % pageSize == 0){
			totalPage = parseInt(totalCount / pageSize);
		}else{
			totalPage = parseInt(totalCount / pageSize) + 1;
		}
		
		if(totalPage == 1){
			list = currentDataList.slice(0,totalCount);
		}else if(pageNo == totalPage){
			list = currentDataList.slice((pageNo-1)*pageSize);
		}else{
			if(parseInt(pageNo) == 1){
				list = currentDataList.slice(0,parseInt(pageNo)*parseInt(pageSize));
			}else{
				list = currentDataList.slice((parseInt(pageNo)-1)*parseInt(pageSize),parseInt(pageNo)*parseInt(pageSize));
			}
		}
	}
	
	dataPaging.totalPage = totalPage;
	dataPaging.currentData = list;
	showPageData(dataPaging);
}

function showPageData(dataPaging){
	
	var dataHtml = "";
	if(dataPaging.totalPage==0){
		dataHtml += "";
	}else{
		$.each(dataPaging.currentData, function(i, item) {
			dataHtml += "<tr><td>"+ item.giftName +"</td><td>" + item.recordTime.substring(0, 19)+"</td>";
		});
		
		var pageHtml = "";
		var totalPage = dataPaging.totalPage;
		var currentPage = dataPaging.currentPage;
		
		if(totalPage> 1){
			if (parseInt(currentPage) == 1) {
				pageHtml += "<a>上一页</a><a class=\"active\" href=\"javascript:laodDataByPage(2);\">下一页</a>";
			}else if (parseInt(currentPage) == parseInt(totalPage)) {
				pageHtml += "<a class=\"active\" href=\"javascript:laodDataByPage('" + (parseInt(currentPage) - 1)+"');\">上一页</a><a>下一页</a>";
			}else{
				pageHtml +="<a class=\"active\" href=\"javascript:laodDataByPage('" + (parseInt(currentPage) - 1)+"');\">上一页</a>"
					+"<a class=\"active\" href=\"javascript:laodDataByPage('" + (parseInt(currentPage) + 1) +"');\">下一页</a>";
			}
		}
		$('#recordlist').html(dataHtml);//页面展示列表
		$('#recordPage').html(pageHtml); //分页
	}
}
