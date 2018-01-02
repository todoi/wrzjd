//从后台取得当前用户的种子数量
//var lower_seed = 100
//var middle_seed = 0
//var greater_seed = 999
var seedAmount = [101,1,999]

function resetSeedIndex(){
    seedIndex = null
    $('.seed_box>li').removeClass('active')
}

function closePopover(element){
    if(typeof element === 'string'){
        $(element).closest('li').removeClass('active').closest('.popover').removeClass('active')
    }
    if(element instanceof HTMLElement){
        $(element).closest('li').removeClass('active').closest('.popover').removeClass('active')
    }
}

!function clickCloseButton(){
    $('.close_button').on('click',function(e){
        closePopover(this)
        if(this === document.querySelector('.select_seed>.close_button')){ //重置seedIndex
            resetSeedIndex()
        }
    })
}()

!function plantSeed(){
    $('.plant_button').on('click',function(e){
        //查询当前用户有没有种子
        var hasSeed = true
        if(!hasSeed){
            $('.popover').addClass('active').find('.no_seed').addClass('active')
        }else{
            $('.popover').addClass('active').find('.select_seed').addClass('active')
        }
    })
}()

function changeBoxBG(){
    for(var i = 0; i<seedAmount.length; i++){
        //更新popover中种子数量
        $($('.seed_box>li')[i]).find('.number').text(seedAmount[i])

        if(seedAmount[i] === 0){
            //数量为零时显示灰色背景
            $($('.seed_box>li')[i]).addClass('changeBG')
        }
    }
}
changeBoxBG()

var seedIndex
var seed = ['lower','middle','greater']
var isSuccessed 
!function selectSeed(){
    //选中种子显示外围绿色的阴影
    $('.seed_box>li>.box_shadow').on('click',function(e){
        $(this).closest('li').addClass('active').siblings().removeClass('active')
        seedIndex = $(this).closest('li').index()
    })

    $('.select_seed>.confirm_button').on('click',function(e){
        var popoverClass
        isSuccessed = Math.random() > 0 ? true : false
        closePopover(this)
        if (seedIndex !== null && seedIndex !== undefined){
            seedAmount[seedIndex] -= 1
            changeBoxBG()
            popoverClass = '.success_' + seed[seedIndex]
            popoverClass = isSuccessed ? popoverClass : '.no_award'
            $('.popover').addClass('active').find(popoverClass).addClass('active')
            var index = seedIndex
            $(popoverClass + '>.confirm_button').on('click',function(e){
                closePopover(this)
                if(isSuccessed){
                    $('.farmer_water_' + seed[index]).addClass('active').siblings().removeClass('active').closest('.watering').addClass('active').siblings().removeClass('active')
                }
            })
        }
        resetSeedIndex()
    })
}()

var rainNumber = 9999999
function uploadRainNumber(rainNumber){
    $('.rain>p').text((rainNumber+'').replace(/(\d)(?=(\d{3})+$)/g,function($1,$2){return $2+','}))
}
uploadRainNumber(rainNumber)

!function irrigate(){
    $('.rain>p').on('click',function(e){
        var inWaterAction = $('.watering').hasClass('active')
        var live = parseInt($('li.active .progress_bar_text>i').text(),10)
        if(inWaterAction && live < 10000){
            rainNumber -= 1000
            live += 1000
            uploadRainNumber(rainNumber)
            $('li.active .progress_bar_text>i').text(live)
            $('li.active .progress_bar_bg').css('width', live *100 / 10000  + '%')

            //生命满格之后，切换收获果实背景
            if(live === 10000){
                var index = $('.watering li.active').index()
                $('.watering li.active').removeClass('active').closest('.watering').removeClass('active').next('.gain').addClass('active').children().eq(index).addClass('active')
            }
        }
    })
}()
