//从后台取得当前用户的种子数量
//var lower_seed = 100
//var middle_seed = 0
//var greater_seed = 999
var seedAmount = [100,0,999]

!function closePopOver(){
    $('.close_button').on('click',function(e){
        $(this).parent().closest('.active').removeClass('active').closest('.popover').removeClass('active')
    })
}()

!function plantSeed(){
    $('.plant_button').on('click',function(e){
        //查询当前用户有没有种子
        var has_seed = true
        if(!has_seed){
            $('.popover').addClass('active').find('.no_seed').addClass('active')
        }else{
            $('.popover').addClass('active').find('.select_seed').addClass('active')
        }
    })
}()

!function changeBoxBG(){
    for(var i = 0; i<seedAmount.length; i++){
        //var images = ['greater_seed_grey','middle_seed_grey','greater_seed_grey']
        if(seedAmount[i] === 0){
            //$($('.seed_box>li')[i]).css('backgroundImage',`url(../images/${images[i]}.png)`)
            $($('.seed_box>li')[i]).addClass('changeBG')
        }
    }
}()

!function selectSeed(){
    $('.seed_box>li>.box_shadow').on('click',function(e){
        $(this).closest('li').addClass('active').siblings().removeClass('active')
        var index = $(this).closest('li').index()
        console.log(index)
    })
}()
