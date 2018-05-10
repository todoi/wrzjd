// define("helpers/dnd/ItemDragger", ["./BaseDragAndDropHandler", "./ItemDragEvent", "./ItemDropEvent", "./eventUtil"], function(e, t, i, n) {
function handler(base, drag, drop, util) {
    var basePrototype = base.prototype
    var extenseBase = base.extend({
        initialize: function(event) {
            var obj = this;  // this 是什么不确定
            basePrototype.initialize.call(obj)
            obj.el = event
            obj.currentItem = null
            obj.hasDragEndHandler = !1
            obj.setDOMEvents({
                dragenter: obj._onDragEnter.bind(obj),
                dragleave: obj._onDragLeave.bind(obj),
                dragover: obj._onDragOver.bind(obj),
                drop: obj._onDrop.bind(obj)
            })
        },
        _onDragEnter: function(event) {
            var eventListener
            var obj = this  // this 是什么 不知道
            var item = util.getItemFromTarget(obj.el, event.target)
            item !== obj.currentItem && item && (eventListener = new drag(event, item);
            obj.currentItem && obj._leaveCurrentItem(event)
            obj.currentItem = item
            obj.trigger("itementer", eventListener))
        },
        _onDragEnd: function(event) {
            var obj = this;
            obj.currentItem && obj._leaveCurrentItem(event),
            obj.hasDragEndHandler = !1;
        },
        _onDragLeave: function(event) {
            var isLeave, elRect, pos;
            var obj = this
            var item = util.getItemFromTarget(obj.el, event.target);
            if(obj.currentItem){
              if (item){
                elRect = obj.currentItem.getBoundingClientRect()
                pos = {
                    x: event.clientX,
                    y: event.clientY
                }
                isLeave = !1
                (pos.y < elRect.top || pos.y > elRect.top + elRect.height) && (isLeave = !0)
                (pos.x < elRect.left || pos.x > elRect.left + elRect.width) && (isLeave = !0)
                isLeave && obj._leaveCurrentItem(event)
              }else{
                obj._leaveCurrentItem(event)
              }
            }
        },
        _onDragOver: function(event) {
            var eventListener
            var obj = this;
            obj.currentItem && (eventListener = new drag(event, obj.currentItem),
            obj.trigger("itemover", eventListener));
        },
        _onDrop: function(event) {
            var eventListener
            var obj = this
            var item = util.getItemFromTarget(obj.el, event.target)
            item && (eventListener = new drop(event, item);
            obj.trigger("itemdrop", eventListener),
            obj.currentItem && obj._leaveCurrentItem(event));
        },
        _leaveCurrentItem: function(event) {
            var obj = this
            var eventListener = new drag(event, obj.currentItem);
            obj.currentItem = null,
            obj.trigger("itemleave", eventListener);
        }
    });
    return extenseBase;
})
