define("helpers/dnd/ItemDragger", ["./BaseDragAndDropHandler", "./ItemDragEvent", "./ItemDropEvent", "./eventUtil"], function(e, t, i, n) {
    var o = e.prototype
      , a = e.extend({
        initialize: function(e) {
            var t = this;
            o.initialize.call(t),
            t.el = e,
            t.currentItem = null,
            t.hasDragEndHandler = !1,
            t.setDOMEvents({
                dragenter: t._onDragEnter.bind(t),
                dragleave: t._onDragLeave.bind(t),
                dragover: t._onDragOver.bind(t),
                drop: t._onDrop.bind(t)
            });
        },
        _onDragEnter: function(e) {
            var i, o = this, a = n.getItemFromTarget(o.el, e.target);
            a !== o.currentItem && a && (i = new t(e,a),
            o.currentItem && o._leaveCurrentItem(e),
            o.currentItem = a,
            o.trigger("itementer", i));
        },
        _onDragEnd: function(e) {
            var t = this;
            t.currentItem && t._leaveCurrentItem(e),
            t.hasDragEndHandler = !1;
        },
        _onDragLeave: function(e) {
            var t, i, o, a = this, r = n.getItemFromTarget(a.el, e.target);
            a.currentItem && (r ? (i = a.currentItem.getBoundingClientRect(),
            o = {
                x: e.clientX,
                y: e.clientY
            },
            t = !1,
            (o.y < i.top || o.y > i.top + i.height) && (t = !0),
            (o.x < i.left || o.x > i.left + i.width) && (t = !0),
            t && a._leaveCurrentItem(e)) : a._leaveCurrentItem(e));
        },
        _onDragOver: function(e) {
            var i, n = this;
            n.currentItem && (i = new t(e,n.currentItem),
            n.trigger("itemover", i));
        },
        _onDrop: function(e) {
            var t, o = this, a = n.getItemFromTarget(o.el, e.target);
            a && (t = new i(e,a),
            o.trigger("itemdrop", t),
            o.currentItem && o._leaveCurrentItem(e));
        },
        _leaveCurrentItem: function(e) {
            var i = this
              , n = new t(e,i.currentItem);
            i.currentItem = null,
            i.trigger("itemleave", n);
        }
    });
    return a;
})
