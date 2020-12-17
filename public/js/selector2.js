console.log("hello");
console.log("world");


function getSelector(el){
  var names = [];
  while (el.parentNode){
    if (el.id){
      names.unshift('#'+el.id);
      break;
    }else{
      if (el===el.ownerDocument.documentElement) names.unshift(el.tagName);
      else{
        for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
        names.unshift(el.tagName+":nth-child("+c+")");
      }
      el=el.parentNode;
    }
  }
  return names.join(" > ");
}






$(document).on({
  mouseout: function(e) {
  e.preventDefault();
    e.stopPropagation();
$(e.target).removeClass("rssGenHighlighter_highlightedIE rssGenHighlighter_border_content");
}
,
mouseover:function(e) {
e.preventDefault();
  e.stopPropagation();
$(e.target).addClass("rssGenHighlighter_highlightedIE rssGenHighlighter_border_content");
}
,
click:function(e) {
e.preventDefault();
  e.stopPropagation();
  // $(e.target).removeClass("rssGenHighlighter_highlightedIE rssGenHighlighter_border_content");
  var x = getSelector(e.target);
  console.log(x);
  parent.postMessage(JSON.stringify(x), '*');
}
});
