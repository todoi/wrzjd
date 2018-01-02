$(function(){
	$(".diaBox").closePop();
	getmyAwardDate();
	$(".diaBox .dia_close").click(function(){
		$(".diaBox").closePop();
	});
	addOpBind();
});

function getmyAwardDate(){
	$.ajax({
		type : "post",
		url : ctx+ "/cases2017/mahjongMatch/getmyAwardDate.do?timestamp="+new Date().getDate(),
		cache : false,
		dataType : "json",
		data : {},
		success : function(data){
			$('.get_award').hide();
			$('.no_award').show();
			if(data.retCode == 0){
				//没有登录
				showLogin();
				return;
			}
			else if(data.retCode == 1){
				//当日排行
				var myReward = "";
				$.each(data.myAwardList, function(i, item){
					var activityId = item.activityId;
					var dateValueM = item.dateValue.toString().substring(4,6);
					var dateValueD = item.dateValue.toString().substring(6,9);
					myReward += "<li>";
					if(activityId == "1017120601"){
						myReward += "<li ><span>第"+item.rankId+"名</span><span>"+dateValueM+"月"+dateValueD+"日</span><span>"+item.rankScore+"</span>";
						myReward += item.typeId == 1?"<span>"+item.sendMoney/100+"元红包</span>":"<span>"+item.sendMoney+"张房卡</span>";
						myReward += item.isCheck == 0?"<span activityId='"+activityId+"' itemid='"+item.id+"' class='btn_get'></span></li>":"<span>已领取</span></li>";
					}else if(activityId == "1017121201"){
						myReward += "<span>第"+item.rankId+"名</span><span>"+dateValueM+"月"+dateValueD+"日</span><span>"+item.rankScore+"</span>";
						myReward += item.rankId <=30 ?"<span><i>"+item.sendMoney/100+"元红包</i><i>"+item.typeId+"张房卡</i><i>"+item.alipayAccount/10000+"万积分</i><i>"+item.alipayName.substring(2,6)+"</i></span>":"<span><i>"+item.typeId+"张房卡</i><i>"+item.alipayAccount/10000+"万积分</i></span>";
						myReward += item.isCheck == 0?"<span activityId='"+activityId+"' rankid='"+item.rankId+"' itemid='"+item.id+"' class='btn_get'></span></li>":"<span>已领取</span>";
					}
					myReward += "</li>";
				});
				$('ul.jiangli_body').html(myReward);
				if(data.myAwardList.length>0){
					$('.no_award').hide();
					$('.get_award').show();
				}
				addAwardBind();
			}
		}
	});
}

function addAwardBind(){
	$(".btn_get").unbind().bind("click", function() {
		var $this=$(this);
		var itemId = $this.attr("itemid");
		var rankId = $this.attr("rankid");
		var activityId = $this.attr("activityId");
		if(rankId <= 30 && activityId == 1017121201){
			openPersonInfo(itemId);
		}else{
			receiveAward(itemId);
		}
	});
}

function addOpBind(){
	$(".btn_lingqu").unbind().bind("click", function() {
		subimtReceive();
	});
}

function openPersonInfo(elemId){
	$("#elemId").val("").val(elemId);
	$(".diaPersonInfo").openPop();
}

function subimtReceive(){
	var elemId = $("#elemId").val();
	
	var realName = $.trim($('.realName').val());
	if(realName == ""){
		alert("姓名不能为空！");
		return;
	}
	var mobile = $.trim($('.mobile').val());
	var isPhone = validatemobile(mobile);
	if(isPhone == false){
		alert("请输入正确的手机号！");
		return;
	}
	$(".diaPersonInfo").closePop();
	receiveAward(elemId);
}

function receiveAward(id){
	var elem = $("[itemid='"+id+"']");
	elem.unbind();//解除按钮点击绑定 
	$(".btn_lingqu").unbind()
	var mobile = $.trim($('.mobile').val());
	var realName = $.trim($('.realName').val());
	$.ajax({
		type : "post",
		url : ctx+ "/cases2017/mahjongMatch/receiveAward.do?timestamp="+new Date().getDate(),
		cache : false,
		dataType : "json",
		data : {
			"id" : id, "mobile" : mobile, "realName" : realName
		},
		success : function(data){
			var attentionHtml = "";
			var successHtml = "";
			if(data.retCode == 0){
				//没有登录
				showLogin();
				return;
			}else if(data.retCode == 1){			//发放奖励成功
				var myaward = data.myaward;
				elem.removeClass("btn_get").html("已领取");
				$(".diaSuccess").openPop();
			}else if(data.retCode == -1){			//未关注公众号
				$(".diaWeixin").openPop();
			}
			else if(data.retCode < -1){	
				$(".diaSuccess").openPop();
				$(".diaSuccess .dia_body .red").html(data.retMsg);
			}
			addAwardBind();
			addOpBind();
		}
	});
}


//校验手机号
function validatemobile(mobile){
    if(mobile.length!=11){
        return false;
    }
    var myreg = /^(((1[3,4,5,7,8]{1}))+\d{9})$/;
    if(!myreg.test(mobile)) {
        return false;
    }
    return true;
}


