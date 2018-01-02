$(function(){
	initRank();
	chooseDate();
	getMyMatch();
});

function chooseDate(){
	var dateTime;
	$("select.date").change(function(){
		dateTime =  $("select.date").find("option:selected").val();
		getHistoryRank(dateTime);
	});
}

function initRank(){
	$.ajax({
		type : "post",
		url : ctx+ "/cases2017/mahjongMatch/initMjRankData.do?timestamp="+new Date().getDate(),
		cache : false,
		dataType : "json",
		data : {},
		success : function(data){
			if(data.retCode == 1){
				//当日排行
				var dateHtml = "";
				var rankHtml = "";
				$.each(data.broadCastList, function(i, item){
					rankHtml += item.rankId <=3 ?"<li><span class='num_0"+item.rankId+"'></span>":"<li><span class='num_0"+item.rankId+"'>第"+item.rankId+"名</span>";
					rankHtml += "<span>"+item.userNickName+"</span><span>"+item.rankScore+"</span>";
					rankHtml += item.rankId <=30 ?"<span><i>"+item.sendMoney/100+"元红包</i><i>"+item.typeId+"张房卡</i><i>"+item.alipayAccount/10000+"万积分</i><i>"+item.alipayName.substring(2,6)+"</i></span>":"<span><i>"+item.typeId+"张房卡</i><i>"+item.alipayAccount/10000+"万积分</i></span>";
					rankHtml += "</li>";
				});
				$('ul.paihang_body').html(rankHtml);
				$.each(data.dateList, function(i, item){
					var dateValueM = item.dateValue.toString().substring(4,6);
					var dateValueD = item.dateValue.toString().substring(6,9);
					dateHtml += "<option value='"+item.dateValue+"'>"+dateValueM+"月"+dateValueD+"日</option>"
				});
				$('select.date').html(dateHtml);
			}
		}
	});
}

function getHistoryRank(dateTime){
	$.ajax({
		type : "post",
		url : ctx+ "/cases2017/mahjongMatch/getHistoryRank.do?timestamp="+new Date().getDate(),
		cache : false,
		dataType : "json",
		data : {
			"dateTime" : dateTime
		},
		success : function(data){
			if(data.retCode == 1){
				//历史排行
				var rankHtml = "";
				$.each(data.broadCastList, function(i, item){
					var index = i+1;
					rankHtml += item.rankId <=3 ?"<li><span class='num_0"+item.rankId+"'></span>":"<li><span class='num_0"+item.rankId+"'>第"+item.rankId+"名</span>";
					rankHtml += "<span>"+item.userNickName+"</span><span>"+item.rankScore+"</span>";
					rankHtml += item.rankId <=30 ?"<span><i>"+item.sendMoney/100+"元红包</i><i>"+item.typeId+"张房卡</i><i>"+item.alipayAccount/10000+"万积分</i><i>"+item.alipayName.substring(2,6)+"</i></span>":"<span><i>"+item.typeId+"张房卡</i><i>"+item.alipayAccount/10000+"万积分</i></span>";
					rankHtml += "</li>";
				});
				$('ul.paihang_body').html(rankHtml);
			}
		}
	});
}


function getMyMatch(){
	$.ajax({
		type : "post",
		url : ctx+ "/cases2017/mahjongMatch/getMyMatch.do?timestamp="+new Date().getDate(),
		cache : false,
		dataType : "json",
		data : {},
		success : function(data){
			var myScoreHtml = 0;
			var myRankHtml = 0;
			if(data.retCode == 1){
				var myMatch = data.myMatch;
				myScoreHtml = myMatch.rankScore;
				myRankHtml = myMatch.rankId;
			}
			$('#myScore').html(myScoreHtml);
			$('#myRank').html(myRankHtml);
		}
	});
}




