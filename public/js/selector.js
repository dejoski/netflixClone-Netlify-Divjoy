console.log("hello")
var $$ = $.noConflict(!0),
  rssGenHighlighter = (function () {
    var t,
      e,
      r = {},
      h = null,
      o = !1,
      a = "rssGenHighlighter_highlighted",
      l = null,
      g = [],
      i = [],
      s = null;
    function $(t) {
      var e = t.prop("tagName").toLowerCase();
      if ("body" === e || "html" === e) return !1;
      if ("news" !== s && t.hasClass("rssGenHighlighter-root-dom")) return !1;
      var r = t.attr("class"),
        i =
          e +
          ((r =
            r &&
            (r = (function (t) {
              var e = [],
                r = [];
              for (var i in t) {
                var n = t[i];
                n &&
                  ("string" == typeof n || n instanceof String) &&
                  (-1 === n.search(/\d/) ? r.push(n) : e.push(n));
              }
              return r.concat(e);
            })(
              (r = r
                .replace(/rssGenHighlighter_[\w_]+/g, "")
                .replace(/\s\s+/g, " ")
                .split(" "))
            )) &&
            r[0])
            ? "." + r
            : ""),
        n = $(t.parent());
      return (
        n ? (i = n + " > " + i) : "news" !== s && (i = p() + " > " + i),
        i.replace(/> tbody >/g, "")
      );
    }
    function n(t) {
      var e = t.prop("tagName"),
        r = "rssGenHighlighter_type_news";
      return (
        ("news" === s || t.hasClass(r) || 0 !== t.parents("." + r).length) &&
        e &&
        $$.inArray(e.toLowerCase(), "html body input".split(" ")) < 0
      );
    }
    function c(t, e) {
      var i = "rssGenHighlighter_type_" + e;
      $$("." + i)
        .removeClass(i)
        .filter(".rssGenHighlighter_highlightedImg")
        .remove(),
        d(),
        ("news" === e
          ? $$(t)
          : $$(p()).find(parent.generator.rmNewsSelector(t))
        )
          .addClass(i)
          .filter("img")
          .each(function () {
            var t = $$(this),
              e = t.offset(),
              r = $$(
                '<div class="rssGenHighlighter_highlightedImg ' + i + '"/>'
              ).css({
                left: e.left,
                top: e.top,
                width: t.outerWidth(),
                height: t.outerHeight(),
              });
            $$("body").append(r);
          }),
        parent.generator.itemsSelected(e, t);
    }
    function d() {
      $$(g).each(function (t, e) {
        $$(e).hide();
      });
    }
    function f(t, e) {
      var i, n, r, s;
      t.hasClass(a) ||
        (l && (l.removeClass(a), d()),
        (l = t).addClass(a),
        o ||
          ((s = (r = t).offset()),
          h
            .css({
              left: s.left - 3,
              top: s.top - 3,
              width: r.outerWidth() + 5,
              height: r.outerHeight() + 6,
            })
            .show(),
          (n = 0),
          e.each(function (t, e) {
            if ((e = $$(e)).hasClass("rssGenHighlighter_highlighted"))
              return !0;
            void 0 === g[n]
              ? ((i = $$('<div class="rssGenHighlighter_borderClone"></div>')),
                $$("body").append(i),
                g.push(i))
              : (i = g[n]),
              n++;
            var r = e.offset();
            i.css({
              left: r.left - 3,
              top: r.top - 3,
              width: e.outerWidth() + 5,
              height: e.outerHeight() + 6,
            }).show();
          })));
    }
    function u(t) {
      var e,
        r = t.data("fetch-src").split(";");
      r &&
        r.length &&
        ((e = r.pop()),
        t.data("fetch-src", r.join(";")),
        t.attr("fetch-test-src", e),
        t.attr("src", t.attr(e)));
    }
    function p() {
      return parent.generator.getNewsSelector();
    }
    return (
      (r.setType = function (t) {
        s = t;
        var e,
          r = h.attr("class").match(/rssGenHighlighter_border_(?:\w+)/);
        r && h.removeClass(r[0]),
          h.addClass("rssGenHighlighter_border_" + s),
          $$(".rssGenHighlighter-root-dom").removeClass(
            "rssGenHighlighter-root-dom"
          ),
          "news" === s ||
            ((e = p()) && $$(e).addClass("rssGenHighlighter-root-dom"));
      }),
      (r.removeSelector = function (t) {
        var e = "rssGenHighlighter_type_" + t;
        $$(".rssGenHighlighter_highlightedImg." + e).remove(),
          $$("." + e).removeClass(e);
      }),
      (r.isSelected = function (t) {
        return 0 < $$("." + ("rssGenHighlighter_type_" + t)).length;
      }),
      (r.highlightPath = function (t) {
        var e,
          r = $$(t);
        !r.length || (n((e = r.first())) && f(e, r));
      }),
      (r.highlightSelected = function (t) {
        var e = $$(t);
        e.length && n((e = e.first())) && c(t, s);
      }),
      (r.getCustomSrc = function () {
        return i;
      }),
      "hidden" === (t = $$("body")).css("visibility") &&
        t.attr(
          "style",
          "visibility: visible !important; " + (t.attr("style") || "")
        ),
      true,
      (h = $$('<div class="rssGenHighlighter_border"></div>')).hide(),
      $$("body").append(h),
      (e = $$("<div/>").hide()).html(
        "\x3c!--[if lt IE 11]><i></i><![endif]--\x3e"
      ),
      (o = 1 === e.find("i").length),
      e.remove(),
      o && (a = "rssGenHighlighter_highlightedIE"),
      r.setType("news"),
      $$("iframe").removeAttr("src"),
      $$("*").unbind("click").off(),
      $$("*")
        .not(".rssGenHighlighter_border, .rssGenHighlighter_borderClone")
        .on({
          mouseover: function (t) {
            var e,
              r = $$(this);
            t.preventDefault(),
              t.stopPropagation(),
              n(r) && ((e = $(r)), f(r, $$(e)));
          },
          click: function (t) {
            t.preventDefault(), t.stopPropagation();
            var e = $$(this);
            return (
              n(e) &&
                c(
                  (function (t, e) {
                    if (!t) return t;
                    var r = $$(t),
                      i = 0,
                      n = "";
                    r.each(function () {
                      (n += ++i), $$(this).data("hash", i);
                    });
                    for (
                      var s = t.split(" > "), h = "", o = s.length - 1;
                      0 <= o;
                      o--
                    ) {
                      h = s[o] + (h.length ? " > " : "") + h;
                      var a = $$(h),
                        l = "";
                      if (
                        a.length === r.length &&
                        (a.each(function () {
                          l += $$(this).data("hash");
                        }),
                        n === l)
                      )
                        return t === h
                          ? t
                          : ("news" !== e && (h = p() + " " + h), h);
                    }
                    return t;
                  })($(e), s),
                  s
                ),
              !1
            );
          },
        }),
      $$("img").each(function () {
        var t = $$(this),
          e = t.attr("src");
        if (
          e &&
          "" !== e &&
          "#" !== e &&
          "//:0" !== e &&
          "javascript:void(0)" !== e
        )
          return !0;
        var r = [];
        $$.each(this.attributes, function () {
          this.specified && -1 !== this.value.indexOf(".") && r.push(this.name);
        }),
          t.data("fetch-src", r.join(";")),
          t.attr("onerror", function () {
            u(t);
          }),
          t.attr("onload", function () {
            !(function (t) {
              var e = t.attr("fetch-test-src");
              if (-1 !== $$.inArray(e, i)) return;
              i.push(e);
            })(t);
          }),
          u(t);
      }),
      r
    );
  })();
console.log("world")