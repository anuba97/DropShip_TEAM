/*! sidr - v3.0.0 - 2017-12-09
  http://www.berriart.com/sidr/
  * Copyright (c) 2013-2017 Alberto Varela; Licensed MIT */
!function(){"use strict";function e(e){return"status"===e?s:r[e]?r[e].apply(this,Array.prototype.slice.call(arguments,1)):"function"!=typeof e&&"string"!=typeof e&&e?void console.error("Method "+e+" does not exist on sidr"):r.toggle.apply(this,arguments)}function t(e,t){var n=e.getAttribute(t);"string"==typeof n&&""!==n&&"sidr-inner"!==n&&e.setAttribute(t,n.replace(/([A-Za-z0-9_.-]+)/g,"sidr-"+t+"-$1"))}for(var n={},i={add:function(e,t){n[e]=t},get:function(e){return n[e]}},s={moving:!1,opened:!1},o=function(e){return function(t,n){"function"==typeof t?(n=t,t="sidr"):t||(t="sidr"),function(e,t,n){var s=i.get(t);switch(e){case"open":s.open(n);break;case"close":s.close(n);break;case"toggle":s.toggle(n);break;default:console.error("Method "+e+" does not exist on sidr")}}(e,t,n)}},r={},a=["open","close","toggle"],l=0;l<a.length;l++){var u=a[l];r[u]=o(u)}var d={isUrl:function(e){return!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e)},extend:function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},fetch:function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&200===n.status&&t(n.responseText)},n.open("GET",e,!0),n.send()}},c={id:function(e){return document.getElementById(e)},qs:function(e){return document.querySelector(e)},qsa:function(e){return document.querySelectorAll(e)},bind:function(e,t,n){e.addEventListener(t,n,!1)},unbind:function(e,t,n){e.removeEventListener(t,n,!1)},createMenu:function(e){var t=document.createElement("div");return t.id=e,document.body.appendChild(t),t},replaceHTML:function(e,t){return e.innerHTML=t,e},getHTMLContent:function(e){for(var t="",n=this.qsa(e),i=0;i<n.length;i++)t+='<div class="sidr-inner">'+n[i].innerHTML+"</div>";return t},addPrefixes:function(e){var n=document.createElement("div");n.innerHTML=e;for(var i=n.querySelectorAll("*"),s=0;s<i.length;s++)t(i[s],"id"),t(i[s],"class"),i[s].removeAttribute("style");return n.innerHTML},transitions:function(){var e=(document.body||document.documentElement).style,t=!1,n="transition",i="transition",s="transitionend";if(n in e)t=!0;else{var o=["moz","webkit","o","ms"],r=void 0,a=void 0;n=n.charAt(0).toUpperCase()+n.substr(1),i=(t=function(){for(a=0;a<o.length;a++)if((r=o[a])+n in e)return!0;return!1}())?r+n:null,n=t?"-"+r+"-"+n.toLowerCase():null,"webkit"===r?s="webkitTransitionEnd":"0"===r&&(s="oTransitionEnd")}return{cssProperty:i,supported:t,property:n,event:s}}()},h=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},p=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),f="sidr-animating",m=function(){function e(t,n){h(this,e),this.name=t.name,this.item=c.qs(t.body),this.side=t.side,this.speed=t.speed,this.timing=t.timing,this.displace=t.displace,this.menuWidth=n}return p(e,[{key:"prepare",value:function(e){var t="open"===e?"hidden":"";if("BODY"===this.item.tagName){var n=c.qs("html"),i=n.scrollTop;n.style.overflowX=t,n.scrollTop=i}}},{key:"unprepare",value:function(){if("BODY"===this.item.tagName){c.qs("html").style.overflowX=""}}},{key:"move",value:function(e){this.item.classList.add(f),"open"===e?this.open():this.close()}},{key:"open",value:function(){if(this.displace){var e=c.transitions,t=this.item;t.style[e.cssProperty]=this.side+" "+this.speed/1e3+"s "+this.timing,t.style[this.side]=0,t.style.width=t.offsetWidth+"px",t.style.position="absolute",t.style[this.side]=this.menuWidth+"px"}}},{key:"onClose",value:function(){var e=c.transitions,t=this.item;t.style[e.cssProperty]="",t.style.right="",t.style.left="",t.style.width="",t.style.position="",c.unbind(t,e.event,this.temporalCallback)}},{key:"close",value:function(){if(this.displace){var e=c.transitions,t=this.item;t.style[this.side]=0;var n=this;this.temporalCallback=function(){n.onClose()},c.bind(t,e.event,this.temporalCallback)}}},{key:"removeAnimationClass",value:function(){this.item.classList.remove(f)}},{key:"removeOpenClass",value:function(){this.item.classList.remove("sidr-open"),"sidr"!==this.name&&this.item.classList.remove(this.name+"-open")}},{key:"addOpenClass",value:function(){this.item.classList.add("sidr-open"),"sidr"!==this.name&&this.item.classList.add(this.name+"-open")}}]),e}(),v=function(){function e(t){h(this,e),this.name=t.name,this.speed=t.speed,this.side=t.side,this.displace=t.displace,this.source=t.source,this.timing=t.timing,this.method=t.method,this.renaming=t.renaming,this.onOpenCallback=t.onOpen,this.onCloseCallback=t.onClose,this.onOpenEndCallback=t.onOpenEnd,this.onCloseEndCallback=t.onCloseEnd,this.init(t)}return p(e,[{key:"init",value:function(e){var t=this.name,n=c.id(t);n||(n=c.createMenu(t)),n.style[c.transitions.cssProperty]=this.side+" "+this.speed/1e3+"s "+this.timing,n.classList.add("sidr"),n.classList.add("sidr-"+this.side),this.item=n,this.fillWithContent(),this.body=new m(e,this.item.offsetWidth)}},{key:"fillWithContent",value:function(){var e=this;if("function"==typeof this.source){var t=this.source(name);c.replaceHTML(this.item,t)}else if("string"==typeof this.source&&d.isUrl(this.source))d.fetch(this.source,function(t){c.replaceHTML(e.item,t)});else if("string"==typeof this.source){var n=c.getHTMLContent(this.source);this.renaming&&(n=c.addPrefixes(n)),c.replaceHTML(this.item,n)}else null!==this.source&&console.error("Invalid Sidr Source")}},{key:"move",value:function(e,t){s.moving=!0,this.body.prepare(e),this.body.move(e),this.moveMenu(e,t)}},{key:"open",value:function(e){var t=this;if(s.opened!==this.name&&!s.moving)if(!1===s.opened)this.move("open",e),this.onOpenCallback();else{i.get(s.opened).close(function(){t.open(e)})}}},{key:"close",value:function(e){s.opened!==this.name||s.moving||(this.move("close",e),this.onCloseCallback())}},{key:"toggle",value:function(e){s.opened===this.name?this.close(e):this.open(e)}},{key:"onOpenMenu",value:function(e){var t=this.name;s.moving=!1,s.opened=t,c.unbind(this.item,c.transitions.event,this.temporalOpenMenuCallback),this.body.removeAnimationClass(),this.body.addOpenClass(),this.onOpenEndCallback(),"function"==typeof e&&e(t)}},{key:"openMenu",value:function(e){var t=this.item;t.style[this.side]=0;var n=this;this.temporalOpenMenuCallback=function(){n.onOpenMenu(e)},c.bind(t,c.transitions.event,this.temporalOpenMenuCallback)}},{key:"onCloseMenu",value:function(e){var t=this.item;c.unbind(t,c.transitions.event,this.temporalCloseMenuCallback),t.style.left="",t.style.right="",this.body.unprepare(),s.moving=!1,s.opened=!1,this.body.removeAnimationClass(),this.body.removeOpenClass(),this.onCloseEndCallback(),"function"==typeof e&&e(name)}},{key:"closeMenu",value:function(e){var t=this.item;t.style[this.side]="";var n=this;this.temporalCloseMenuCallback=function(){n.onCloseMenu(e)},c.bind(t,c.transitions.event,this.temporalCloseMenuCallback)}},{key:"moveMenu",value:function(e,t){"open"===e?this.openMenu(t):this.closeMenu(t)}}]),e}(),y={init:function(e,t){for(var n=c.qsa(e),i=0;i<n.length;i++)this.addEvent(n[i],t)},addEvent:function(t,n){if(!t.getAttribute("data-sidr")){var i=n.name,s=n.bind,o=n.method;t.setAttribute("data-sidr",i),c.bind(t,s,function(t){t.preventDefault(),e(o,i)})}}},b={name:"sidr",speed:200,side:"left",source:null,renaming:!0,body:"body",displace:!0,timing:"ease",method:"toggle",bind:"click",onOpen:function(){},onClose:function(){},onOpenEnd:function(){},onCloseEnd:function(){}};jQuery.sidr=e,jQuery.fn.sidr=function(e){var t=d.extend(b,e);return i.add(t.name,new v(t)),this.each(function(){y.addEvent(this,t)})}}();
