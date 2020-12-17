var APP_DATA = {"url":"https://nostalgic-caterwauling-limit.glitch.me/","rssId":null,"selectors":{"news":"","title":"","content":"","date":"","author":"","link":"","pic":""},"options":[],"copySelectors":[],"gSess":"1IAB1F4DFCCB2E20305CF8AC135CC47025I28139634I34323837IFBDI0Id6290990","token":"851605980034.98960","prh":"2b24188b"}
var generator = function() {
    var e = {}
      , s = {}
      , a = APP_DATA.options
      , c = !0
      , r = null
      , i = null
      , l = " "
      , d = !1;
    function n() {
        var e = $(this)
          , n = e.val();
        d = !0,
        b("news");
        var t = parseInt(n);
        if (-1 === t)
            return d = !1,
            void P();
        var r = y()
          , i = APP_DATA.copySelectors[t].selectors;
        for (var o in i)
            i.hasOwnProperty(o) && (r.setType(o),
            r.highlightSelected(("news" === o ? "" : i.news + " ") + i[o]));
        d = !1,
        P(),
        e.val(n)
    }
    function o() {
        var e = APP_DATA.token.split(".")[0]
          , n = APP_DATA.url.trim().length;
        for (var t in s)
            s.hasOwnProperty(t) && (n += s[t].trim().length);
        return e + "." + n + e.substr(10)
    }
    function h(e) {
        var n = m();
        n && (y().highlightPath(n),
        "keyup" === e.type && 13 === e.keyCode && g())
    }
    function u() {
        var e, n, t, r, i, o = $(this).parents(".btn-block:first");
        o.hasClass("disabled") || (S(e = o.data("type")),
        n = $("#configSelectorDialog"),
        t = n.find(".prefix"),
        r = n.find("#configSelectorInput"),
        n.modal("show"),
        "news" === e ? t.hide() : (20 < (i = s.news + l).length ? (t.attr("title", i),
        i = "... " + (i = i.split(" > "))[i.length - 1]) : t.attr("title", ""),
        t.text(i).show()),
        w(!0),
        n.find(".option").hide(),
        n.find(".option-" + e).show(),
        "link" === e && ($('label[for="op-link-src-page"] a').attr("href", APP_DATA.url),
        w(!a["link-src"])),
        n.find(".option-" + e + " input").each(function() {
            var e = $(this)
              , n = a[e.attr("name")] || "";
            "checkbox" === e.attr("type") ? e.prop("checked", !!n) : e.val(n)
        }),
        r.width(1).val(x(s[e] || "")),
        setTimeout(function() {
            n.find("#configSelectorInput").width(n.find(".input-wrapper").innerWidth() - (t.is(":visible") ? t.outerWidth() : 0) - 24).focus()
        }, 500))
    }
    function f() {
        b($(this).parents(".btn-block:first").data("type"))
    }
    function p() {
        var e = $(this)
          , n = e.data("type");
        e.hasClass("disabled") || (n !== r && (c = !1),
        S(n))
    }
    function v() {
        if (!$(this).hasClass("disabled")) {
            var e, n = {
                url: APP_DATA.url,
                rss: APP_DATA.rssId,
                token: o(),
                sess: k(),
                prh: APP_DATA.prh
            };
            for (e in APP_DATA.selectors)
                n[e + "-selector"] = "";
            for (e in s)
                n[e + "-selector"] = s[e] || "";
            for (e in a)
                n[e + "-param"] = a[e];
            n["pic-src-param"] = _();
            var t = $("#rssForm");
            for (e in n)
                $("<input />", {
                    type: "hidden",
                    id: e,
                    name: e
                }).val(n[e]).appendTo(t);
            t.submit()
        }
    }
    function g() {
        $(".option:visible input").each(function() {
            var e = $(this)
              , n = e.attr("name")
              , t = e.val();
            "checkbox" !== e.attr("type") || e.is(":checked") || (t = !1),
            a[n] = t
        });
        var e = m();
        e ? (y().highlightSelected(e),
        $("#configSelectorDialog").modal("hide")) : b(r)
    }
    function A() {
        w(!$("#op-link-src-page").is(":checked"))
    }
    function w(e) {
        var n = $("#configSelectorInput")
          , t = n.parent();
        e ? (n.removeAttr("disabled"),
        t.removeClass("disabled")) : (n.attr("disabled", "disabled"),
        t.addClass("disabled"))
    }
    function b(e) {
        if (y().removeSelector(e),
        s = function(e, n) {
            var t = [];
            for (var r in e)
                r !== n && (t[r] = e[r]);
            return t
        }(s, e),
        $("#" + e + "-btn-bock").removeClass("done"),
        "news" === e) {
            var n = C();
            for (t in n) {
                var r = n[t];
                "news" !== r && b(r)
            }
            $(".gen-rss").addClass("disabled"),
            $(".btn-block").not("#news-btn-bock").addClass("disabled"),
            S("news")
        } else
            "title" !== e && "content" !== e || D("title") || D("content") || $(".gen-rss").addClass("disabled");
        T(),
        P()
    }
    function P() {
        if (!d) {
            $(".gen-rss").addClass("disabled"),
            $("#preview-error").hide(),
            $("#preview-loader").show(),
            $(".preview").show();
            var e = {
                url: APP_DATA.url,
                "pic-src": _(),
                token: o(),
                sess: k(),
                prh: APP_DATA.prh,
                "gen-ses": i
            };
            for (var n in s)
                e[n] = s[n];
            for (var t in a)
                e[t] = a[t];
            $("#preview-content").hide().attr("src", "/generator/preview?" + I(e))
        }
    }
    function k() {
        return gss()
    }
    function m() {
        var e = $("#configSelectorInput").val();
        if (!e)
            return "";
        "news" !== r && (e = s.news + " " + e);
        try {
            $(e)
        } catch (e) {
            return ""
        }
        return e
    }
    function S(e) {
        r = e,
        $(".buttons-block .active").removeClass("active"),
        $("#" + e + "-btn-bock").addClass("active");
        var n = y();
        n && n.setType(e)
    }
    function y() {
        return $("#dissectionSite")[0].contentWindow.rssGenHighlighter
    }
    function T() {
        $("#copy-selectors-control").val("-1")
    }
    function C() {
        var e = [];
        return $(".btn-block").each(function() {
            e.push($(this).data("type"))
        }),
        e
    }
    function D(e) {
        return y().isSelected(e)
    }
    function _() {
        var e = y();
        if (!e || void 0 === e.getCustomSrc)
            return "";
        var n = e.getCustomSrc();
        return n && n.length ? n.join(";") : ""
    }
    function I(e) {
        var n = [];
        for (var t in e)
            n.push(t + "=" + encodeURIComponent(e[t]));
        return n.join("&")
    }
    function x(e) {
        if (!s.news)
            return e;
        var n = new RegExp("^" + (s.news || "").replace(/([()[{*+.$^\\|?])/g, "\\$1") + l);
        return e.replace(n, "")
    }
    return e.itemsSelected = function(e, n) {
        if (s[e] = n,
        $("#" + e + "-btn-bock").addClass("done"),
        "news" === e) {
            $(".btn-block").removeClass("disabled");
            var r = C();
            for (t in r) {
                var i = r[t];
                "news" !== i && void 0 !== s[i] && s[i] && 0 !== s[i].indexOf(s.news) && b(i)
            }
        }
        var o;
        c && (o = "news",
        $(".btn-block").each(function() {
            var e = $(this);
            return !!e.hasClass("done") || (o = e.data("type"),
            !1)
        }),
        S(o)),
        T(),
        P()
    }
    ,
    e.highlighterGenerated = function() {
        !function() {
            if (APP_DATA.rssId) {
                var e, n = y();
                if (n) {
                    for (var t in d = !0,
                    APP_DATA.selectors) {
                        APP_DATA.selectors.hasOwnProperty(t) && ((e = APP_DATA.selectors[t]) && e.length && (n.setType(t),
                        n.highlightSelected(e)))
                    }
                    d = !1,
                    P()
                }
            }
        }()
    }
    ,
    e.previewLoaded = function(e) {
        $("#preview-loader").hide(),
        $("#preview-content").show(),
        s && s.news && e && $(".gen-rss").removeClass("disabled")
    }
    ,
    e.rmNewsSelector = x,
    e.getNewsSelector = function() {
        return s.news || ""
    }
    ,
    $(".btn-block").click(p),
    $(".glyphicon-trash").click(f),
    $(".glyphicon-cog").click(u),
    $(".gen-rss").click(v),
    i = Math.random().toString().replace(/[.,]/, ""),
    k(),
    S("news"),
    $("#dissectionSite").attr("src", "/generator/sandbox?" + I({
        url: APP_DATA.url,
        token: o(),
        sess: k(),
        prh: APP_DATA.prh
    })),
    $("#configSelectorDialog .js-save-config").click(g),
    $("#configSelectorInput").on("keyup change", h),
    $("#copy-selectors-control").val("-1").on("change", n),
    $("#op-link-src-page").on("change", A),
    e
}();
function urlLoaded() {
    $("#dissectionSite").removeClass("hidden-iframe"),
    $("#loading-indicator").hide(),
    $("#operating-table .custom-info-pan").show()
}
function urlIsRSS() {
    $("#loading-indicator").hide(),
    $("#dissectionSite").hide(),
    $("#is-rss").show()
}
function downloadError() {
    $("#loading-indicator").hide(),
    $("#dissectionSite").hide(),
    $("#download-error").show()
}
function hideCustomPan() {
    $("#operating-table .custom-info-pan").hide()
}
function showTutorial() {
    $("#tutorialDialog").modal()
}
