KISSY.add("my/apps/timer", function(t, e) {
  var i = (t.DOM, t.Event, 3e5),
    n = '<p class="min"><span class="t{{minute0}}"></span><span class="t{{minute1}}"></span></p><span class="label">:</span><p class="sec"><span class="t{{second0}}"></span><span class="t{{second1}}"></span></p>',
    r = '<p class="hour">{{hours}}</p><span class="label">:</span><p class="min">{{minutes}}</p><span class="label">:</span><p class="sec">{{seconds}}</p>'

  // M start
  var M = function() {
    var s = function(e) {
      var i = { timeEnd: 0, timeCurrent: 0, timeLeft: 0, container: null, callback: null, template: null },
        n = this;
      this.config = t.merge(i, e || {})
      this._leftTime = 0
      this._container = null
      this._timeHandler = null
      this._timeOffset = 0
      this._domBox = null
      n._init()
    };

    //prototype start
    s.prototype = {
      _init: function() {
        if (this._valider()) {
          var t = this._divider();
          "1" == this.config.style ? this._display1(t) : this._display(t),
            this._counter()
        }
      },
      _counter: function() {
        var t = this,
          e = +new Date;
        this._timeHandler = setInterval(function() {
          var i = +new Date;
          if (t._leftTime -= i - e,
            e = i,
            t._leftTime < 0)
            return void t.onOver();
          var n = t._divider();
          "1" == t.config.style ? t._display1(n) : t._display(n)
        }, 100)
      },
      _valider: function() {
        if (this._container = t.get(this.config.container),
          this._container && (this.config.timeLeft || this.config.timeEnd)) {
          if (!this.config.timeCurrent) {
            var e = new Date;
            this.config.timeCurrent = e.getTime()
          }
          if (this._leftTime = this.config.timeLeft || this.config.timeEnd - this.config.timeCurrent,
            this._leftTime <= 0) {
            this._leftTime = 0;
            var i = this._divider();
            return "1" == this.config.style ? this._display1(i) : this._display(i),
              void this.onOver()
          }
          return !0
        }
      },
      _divider: function() {
        var t, e, i, n, r, s, a = parseInt(this._leftTime / 1e3);
        return t = Math.floor(a / 3600),
          e = Math.floor(a / 60 % 60),
          i = Math.floor(a % 60),
          s = Math.floor(this._leftTime % 1e3 / 100),
          n = Math.floor(t / 24),
          r = t % 24, { hours: t, minutes: e, seconds: i, days: n, hours24: r, msecs: s }
      },
      _display: function(t) {
        var i = this.config.template || r,
          n = e(i).render(t);
        this._container.innerHTML = n
      },
      _display1: function(e) {
        var i = this._divStr(e.hours),
          r = this._divStr(e.minutes),
          s = this._divStr(e.seconds),
          a = {};
        a.hour0 = i.charAt(0),
          a.hour1 = i.charAt(1),
          a.minute0 = r.charAt(0),
          a.minute1 = r.charAt(1),
          a.second0 = s.charAt(0),
          a.second1 = s.charAt(1);
        var c = t.Template(n).render(a);
        this._container.innerHTML = c
      },
      _replaceHtml: function(t, e) {
        var i = KISSY.get(t),
          n = i.cloneNode(!1);
        return n.innerHTML = e,
          i.parentNode.replaceChild(n, i),
          n
      },
      _divStr: function(t) {
        var e = "0" + t;
        return e = e.substr(e.length - 2, 2)
      },
      onOver: function() {
        try {
          clearInterval(this._timeHandler)
        } catch (t) {}
        var e = this.config.callback;
        e && this._leftTime <= 0 ? e && e.call(this, this._container) : this._leftTime = 0
      },
      calibrate: function(t) {
        return this._leftTime <= 0 ? !1 : (this._timeOffset ? this._leftTime = this._timeOffset - t : this._timeOffset = t + this._leftTime, !0)
      }
    };
    // prototype end

    // a start
    var a = {
      _checkerRunner: null,
      _checkerOn: 0,
      _serverDate: 0,
      init: function() {
        if (!this._checkerOn) {
          var t = this;
          this._checkerRunner = setInterval(function() {
            var e, i, n = t._getXMLHttpRequest();
            n.onreadystatechange = function() {
                4 == n.readyState && (e = new Date(n.getResponseHeader("date")),
                  i = e.getTime(),
                  t._calibrater(i))
              },
              n.open("HEAD", "/sync.htm?" + Math.random()),
              n.send(null)
          }, i)
          t._checkerOn = 1
        }
      },
      _getXMLHttpRequest: function() {
        try {
          if (window.XMLHttpRequest)
            return new XMLHttpRequest;
          if (window.ActiveXObject)
            return new ActiveXObject("MSXML2.XmlHttp")
        } catch (t) {}
      },
      _calibrater: function(e) {
        if (this._serverDate != e) {
          var i = 0;
          t.each(c, function(t) {
              i = i || t._leftTime > 0,
                t.calibrate(e)
            }),
            this._serverDate = e,
            i || this._clearChecker()
        }
      },
      _clearChecker: function() {
        try {
          clearInterval(this._checkerRunner)
        } catch (t) {}
        this._checkerOn = 0
      }
    };
    //a end
    var c = [];
    return {
      create: function(t) {
        a.init();
        var e = new s(t);
        return c.push(e), e
      },
      remove: function(e) {
        t.inArray(e, c) && e.onOver()
      }
    }
  }();
  // M end
  return M
}, {
  requires: ["template", "core"]
});

if (t) {
  var a = e.one(".J_juItemTimer");
  if (a) {
    if (+M.onlineStartTime > +t)
      var s = "notbegin",
        r = M.onlineStartTime;
    else
      var s = "avil",
        r = M.onlineEndTime;
    var c = "notbegin" == s ? "距开团还有:" : "还剩:";
    if ("notbegin" == s && n(r, 1)) {
      var u = o.timeFormat(new Date(parseInt(r)), "M月d日h:mm");
      a.css("zoom", "0"),
        a.html("<p>" + u + " 开抢</p>"),
        a.before('<div class="icon-time">&#xe62a;</div>')
    } else
      "avil" == s && n(r, 72) ? a.html("<span>数量有限，赶快下单吧！</span>") : (a.before('<div class="icon-time">&#xe62a;</div>'),
        i.create({
          timeEnd: r,
          timeCurrent: t,
          timeLeft: 0,
          container: a,
          style: "simple",
          template: c + ' {{#if days}}<span class="day">{{days}}</span>天{{/if}}<span class="hour">{{hours24}}</span>小时<span class="min">{{minutes}}</span>分<span class="sec">{{seconds}}.{{msecs}}</span>秒',
          callback: function(e) {
            if (e) {
              var t = I.get(".J_mainBox"),
                n = (I.get(".J_statusBanner", t),
                  I.get(".J_juItemTimer", t));
              I.hasClass(t, "notbegin") ? (f("avil"),
                n.innerHTML = '<p class="begin">团购已经开始!</p>') : (I.hasClass(t, "avil") || I.hasClass(t, "chance") || I.hasClass(t, "soldout")) && f("timeout")
            }
          }
        }))
  }
}
