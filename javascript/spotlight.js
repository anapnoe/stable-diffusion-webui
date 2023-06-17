/**
 * Spotlight.js v0.7.8
 * Copyright 2019-2021 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/spotlight
 */
 /* 
 this library was rewritten by anapnoe to work with https://github.com/anapnoe/stable-diffusion-webui-ux
 it supports multi-instancing, enable-disable panzoom functionallity and input type tools
 */

!function(e){"use strict";let t=function(t,i={}){this.controls=["info","theme","download","play","page","close","autofit","zoom-in","zoom-out","prev","next","fullscreen"],this.controls_default={page:1,close:1,autofit:1,"zoom-in":1,"zoom-out":1,prev:1,next:1,fullscreen:1},this.keycodes={BACKSPACE:8,ESCAPE:27,SPACEBAR:32,LEFT:37,RIGHT:39,UP:38,NUMBLOCK_PLUS:107,PLUS:187,DOWN:40,NUMBLOCK_MINUS:109,MINUS:189,INFO:73};let s=this;Object.assign||(Object.assign=function(e,t){let i=Object.keys(t);for(let s=0,o;s<i.length;s++)e[o=i[s]]=t[o];return e}),Element.prototype.closest||(Element.prototype.closest=function(e){e=e.substring(1);let t=this;for(;t&&1===t.nodeType;){if(t.classList.contains(e))return t;t=t.parentElement}return null}),this.addClass=(e,t)=>{s.toggleClass(e,t,!0)},this.removeClass=(e,t)=>{s.toggleClass(e,t)},this.toggleClass=(e,t,i)=>{e.classList[i?"add":"remove"](t)},this.hasClass=(e,t)=>e.classList.contains(t),this.setStyle=(e,t,i)=>{i=""+i,e["_s_"+t]!==i&&(e.style.setProperty(t,i),e["_s_"+t]=i)};let o=0;this.prepareStyle=(e,t)=>{t&&(s.setStyle(e,"transition","none"),t()),o||(o=e.clientTop&&0),t&&s.setStyle(e,"transition","")},this.setText=(e,t)=>{e.firstChild.nodeValue=t},this.getByClass=(e,t)=>(t||document).getElementsByClassName(e),this.getByTag=(e,t)=>(t||document).getElementsByTagName(e),this.addListener=(e,t,i,o)=>{s.toggleListener(!0,e,t,i,o)},this.removeListener=(e,t,i,o)=>{s.toggleListener(!1,e,t,i,o)},this.toggleListener=(e,t,i,s,o)=>{t[(e?"add":"remove")+"EventListener"](i,s,!o&&!1!==o||o)},this.cancelEvent=(e,t)=>{e.stopPropagation(),t&&e.preventDefault()},this.downloadImage=(e,t)=>{let i=s.createElement("a"),o=t.src;i.href=o,i.download=o.substring(o.lastIndexOf("/")+1),s.body.appendChild(i),i.click(),s.body.removeChild(i)},this.createElement=e=>document.createElement(e),this.toggleDisplay=(e,t)=>{s.setStyle(e,"display",t?"":"none")},this.toggleVisibility=(e,t)=>{s.setStyle(e,"visibility",t?"":"hidden")},this.toggleAnimation=(e,t)=>{s.setStyle(e,"transition",t?"":"none")},this.widget=this.createElement("div"),this.widget.innerHTML="<div class=spl-spinner></div><div class=spl-track><div class=spl-scene><div class=spl-pane></div></div></div><div class=spl-header><div class=spl-page> </div></div><div class=spl-progress></div><div class=spl-footer><div class=spl-title> </div><div class=spl-description> </div><div class=spl-button> </div></div><div class=spl-prev></div><div class=spl-next></div>",this.video_support={},this.tpl_video=this.createElement("video"),this.parse_src=(e,t,i,o)=>{let n,l;if("node"!==o){let a=Object.keys(i);for(let r=0,d;r<a.length;r++)if((d=a[r]).length>3&&0===d.indexOf("src")){if("video"===o){let p=s.video_support[d];if(p){if(p>0){n=i[d];break}}else if(s.tpl_video.canPlayType("video/"+d.substring(3).replace("-","").toLowerCase())){s.video_support[d]=1,n=i[d];break}else s.video_support[d]=-1}else{let c=parseInt(d.substring(4),10);if(c){let h=Math.abs(t-c);(!l||h<l)&&(l=h,n=i[d])}}}}return n||i.src||i.href||e.src||e.href},this.controls_dom={};let n=navigator.connection,l=e.devicePixelRatio||1;this.x,this.y,this.startX,this.startY,this.viewport_w,this.viewport_h,this.media_w,this.media_h,this.scale,this.is_down,this.dragged,this.slidable,this.toggle_autofit,this.toggle_theme,this.current_slide,this.slide_count,this.anchors,this.options,this.options_media,this.options_group,this.options_infinite,this.options_progress,this.options_onshow,this.options_onchange,this.options_onclose,this.options_fit,this.options_autohide,this.options_autoslide,this.options_theme,this.options_preload,this.options_href,this.options_click,this.options_class,this.delay,this.animation_scale,this.animation_fade,this.animation_slide,this.animation_custom,this.body,this.doc,this.panel,this.panes,this.media,this.media_next=this.createElement("img"),this.slider,this.header,this.footer,this.footer_visible=0,this.title,this.description,this.button,this.page_prev,this.page_next,this.maximize,this.page,this.player,this.progress,this.spinner,this.gallery,this.gallery_next,this.playing,this.hide,this.hide_cooldown,this.id="spotlight",this.prefix_request,this.prefix_exit,this.track,this.addListener(document,"click",this.dispatch),this.init=(e,t)=>{s.body||(s.id="spotlight"+t,s.widget.id="spotlight"+t,s.doc=document.body,s.body=e,s.slider=s.getOneByClass("scene"),s.header=s.getOneByClass("header"),s.footer=s.getOneByClass("footer"),s.title=s.getOneByClass("title"),s.description=s.getOneByClass("description"),s.button=s.getOneByClass("button"),s.page_prev=s.getOneByClass("prev"),s.page_next=s.getOneByClass("next"),s.page=s.getOneByClass("page"),s.progress=s.getOneByClass("progress"),s.spinner=s.getOneByClass("spinner"),s.panes=[s.getOneByClass("pane")],s.addControl("close",s.close),s.doc[s.prefix_request="requestFullscreen"]||s.doc[s.prefix_request="msRequestFullscreen"]||s.doc[s.prefix_request="webkitRequestFullscreen"]||s.doc[s.prefix_request="mozRequestFullscreen"]||(s.prefix_request=""),s.prefix_request?(s.prefix_exit=s.prefix_request.replace("request","exit").replace("mozRequest","mozCancel").replace("Request","Exit"),s.maximize=s.addControl("fullscreen",s.fullscreen)):s.controls.pop(),s.addControl("info",s.info),s.addControl("autofit",s.autofit),s.addControl("zoom-in",s.zoom_in),s.addControl("zoom-out",s.zoom_out),s.addControl("theme",s.theme),s.player=s.addControl("play",s.play),s.addControl("download",s.download),s.addListener(s.page_prev,"click",s.prev),s.addListener(s.page_next,"click",s.next),s.track=s.getOneByClass("track"),s.addListener(s.track,"mousedown",s.start),s.addListener(s.track,"mousemove",s.move),s.addListener(s.track,"mouseleave",s.end),s.addListener(s.track,"mouseup",s.end),s.addListener(s.track,"touchstart",s.start,{passive:!1}),s.addListener(s.track,"touchmove",s.move,{passive:!0}),s.addListener(s.track,"touchend",s.end),s.addListener(s.button,"click",function(){s.options_click?s.options_click(s.current_slide,s.options):s.options_href&&(location.href=s.options_href)}))},this.getOneByClass=e=>this.controls_dom[e]=this.getByClass("spl-"+e,this.widget)[0],this.addControl=(e,t,i="")=>{let o=s.createElement("div");return o.className="spl-"+e,o.innerHTML=i,s.addListener(o,"click",t),s.header.appendChild(o),s.controls_dom[e]=o},this.removeControl=e=>{let t=s.controls_dom[e];t&&(s.header.removeChild(t),s.controls_dom[e]=null)},this.dispatch=e=>{let t=e.target.closest(".spotlight");if(t){s.cancelEvent(e,!0);let i=t.closest(".spotlight-group");s.anchors=s.getByClass("spotlight",i);for(let o=0;o<s.anchors.length;o++)if(s.anchors[o]===t){s.options_group=i&&i.dataset,s.init_gallery(o+1);break}}},this.show=(e,t,i)=>{s.anchors=e,t&&(s.options_group=t,s.options_onshow=t.onshow,s.options_onchange=t.onchange,s.options_onclose=t.onclose,i=i||t.index),s.init_gallery(i)},this.panzoom=e=>{s.toggleListener(e,s.track,"wheel",s.wheel_listener,{passive:!1}),s.toggleListener(e,s.track,"mousedown",s.start),s.toggleListener(e,s.track,"mousemove",s.move),s.toggleListener(e,s.track,"mouseleave",s.end),s.toggleListener(e,s.track,"mouseup",s.end),s.toggleListener(e,s.track,"touchstart",s.start,{passive:!1}),s.toggleListener(e,s.track,"touchmove",s.move,{passive:!0}),s.toggleListener(e,s.track,"touchend",s.end)},this.init_gallery=e=>{if(s.slide_count=s.anchors.length,s.slide_count){s.body||s.init(),s.options_onshow&&s.options_onshow(e);let t=s.panes[0],i=t.parentElement;for(let o=s.panes.length;o<s.slide_count;o++){let n=t.cloneNode(!1);s.setStyle(n,"left",100*o+"%"),i.appendChild(n),s.panes[o]=n}s.panel||(s.body.appendChild(s.widget),s.update_widget_viewport()),s.current_slide=e||1,s.toggleAnimation(s.slider),s.setup_page(!0),s.prefix_request&&s.detect_fullscreen(),s.show_gallery()}},this.parse_option=(e,t)=>{let s=i[e];return void 0!==s?"false"!=(s=""+s)&&(s||t):t},this.apply_options=e=>{s.options={},s.options_group&&Object.assign(s.options,s.options_group),Object.assign(s.options,e.dataset||e),s.options_media=s.options.media,s.options_click=s.options.onclick,s.options_theme=s.options.theme,s.options_class=s.options.class,s.options_autohide=s.parse_option("autohide",!1),s.options_infinite=s.parse_option("infinite"),s.options_progress=s.parse_option("progress",!0),s.options_autoslide=s.parse_option("autoslide"),s.options_preload=s.parse_option("preload",!0),s.options_href=s.options.buttonHref,s.delay=s.options_autoslide&&parseFloat(s.options_autoslide)||7,s.toggle_theme||s.options_theme&&s.theme(s.options_theme),s.options_class&&s.addClass(s.widget,s.options_class),s.options_class&&s.prepareStyle(s.widget);let t=s.options.control;if(t){let i="string"==typeof t?t.split(","):t;for(let o=0;o<s.controls.length;o++)s.options[s.controls[o]]=!1;for(let n=0;n<i.length;n++){let l=i[n].trim();"zoom"===l?s.options["zoom-in"]=s.options["zoom-out"]=!0:s.options[l]=!0}}let a=s.options.animation;if(s.animation_scale=s.animation_fade=s.animation_slide=!a,s.animation_custom=!1,a){let r="string"==typeof a?a.split(","):a;for(let d=0;d<r.length;d++){let p=r[d].trim();"scale"===p?s.animation_scale=!0:"fade"===p?s.animation_fade=!0:"slide"===p?s.animation_slide=!0:p&&(s.animation_custom=p)}}s.options_fit=s.options.fit},this.prepare_animation=e=>{e?s.prepareStyle(s.media,s.prepare_animation):(s.toggleAnimation(s.slider,s.animation_slide),s.setStyle(s.media,"opacity",s.animation_fade?0:1),s.update_scroll(s.animation_scale&&.8),s.animation_custom&&s.addClass(s.media,s.animation_custom))},this.init_slide=e=>{if(s.panel=s.panes[e-1],s.media=s.panel.firstChild,s.current_slide=e,s.media)s.disable_autoresizer(),s.options_fit&&s.addClass(s.media,s.options_fit),s.prepare_animation(!0),s.animation_custom&&s.removeClass(s.media,s.animation_custom),s.animation_fade&&s.setStyle(s.media,"opacity",1),s.animation_scale&&s.setStyle(s.media,"transform",""),s.setStyle(s.media,"visibility","visible"),s.gallery_next&&(s.media_next.src=s.gallery_next),s.options_autoslide&&s.animate_bar(s.playing);else{let t=s.gallery.media;if(s.parse_option("spinner",!0),"node"===t){s.media=s.gallery.src,"string"==typeof s.media&&(s.media=gradioApp().querySelector(s.media)),s.media&&(s.media._root||(s.media._root=s.media.parentElement),s.update_media_viewport(),s.panel.appendChild(s.media),s.init_slide(e));return}s.toggle_spinner(s.options_spinner,!0),s.media=s.createElement("img"),s.media.onload=function(){s.media===s&&(s.media.onerror=null,s.toggle_spinner(s.options_spinner),s.init_slide(e),s.update_media_viewport())},s.media.src=s.gallery.src,s.panel.appendChild(s.media),s.media&&(s.options_spinner||s.setStyle(s.media,"visibility","visible"),s.media.onerror=function(){s.media===s&&(s.checkout(s.media),s.addClass(s.spinner,"error"),s.toggle_spinner(s.options_spinner))})}},this.toggle_spinner=(e,t)=>{e&&s.toggleClass(s.spinner,"spin",t)},this.has_fullscreen=()=>document.fullscreen||document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement,this.resize_listener=()=>{if(s.update_widget_viewport(),s.media&&s.update_media_viewport(),s.prefix_request){let e=s.has_fullscreen();s.toggleClass(s.maximize,"on",e),e||s.detect_fullscreen()}},this.detect_fullscreen=()=>{s.toggleDisplay(s.maximize,screen.availHeight-e.innerHeight>0)},this.update_widget_viewport=()=>{s.viewport_w=s.widget.clientWidth,s.viewport_h=s.widget.clientHeight},this.update_media_viewport=()=>{s.media_w=s.media.clientWidth,s.media_h=s.media.clientHeight},this.update_scroll=e=>{s.setStyle(s.media,"transform","translate(-50%, -50%) scale("+(e||s.scale)+")")},this.update_panel=(e,t)=>{s.setStyle(s.panel,"transform",e||t?"translate("+e+"px, "+t+"px)":"")},this.update_slider=(e,t,i)=>{t?s.prepareStyle(s.slider,function(){s.update_slider(e,!1,i)}):s.setStyle(s.slider,"transform","translateX("+(-(100*e)+(i||0))+"%)")},this.toggle_listener=t=>{s.toggleListener(t,e,"keydown",s.key_listener),s.toggleListener(t,e,"resize",s.resize_listener)},this.history_listener=e=>{s.panel&&e.state.spl&&s.close(!0)},this.key_listener=e=>{if(s.panel){let t=!1!==s.options["zoom-in"];switch(e.keyCode){case s.keycodes.BACKSPACE:t&&s.autofit();break;case s.keycodes.SPACEBAR:s.options_autoslide&&s.play();break;case s.keycodes.LEFT:s.prev();break;case s.keycodes.RIGHT:s.next();break;case s.keycodes.NUMBLOCK_PLUS:case s.keycodes.PLUS:t&&s.zoom_in();break;case s.keycodes.NUMBLOCK_MINUS:case s.keycodes.MINUS:t&&s.zoom_out();break;case s.keycodes.INFO:s.info()}}},this.wheel_listener=e=>{if(s.panel&&!1!==s.options["zoom-in"]){let t=e.deltaY;(t=(t<0?1:t?-1:0)*.5)<0?s.zoom_out():s.zoom_in()}},this.play=(e,t)=>{let i="boolean"==typeof e?e:!this.playing;!s.playing===i&&(s.playing=s.playing?clearTimeout(s.playing):1,s.toggleClass(s.player,"on",s.playing),t||s.animate_bar(s.playing))},this.animate_bar=e=>{s.options_progress&&(s.prepareStyle(s.progress,function(){s.setStyle(s.progress,"transition-duration",""),s.setStyle(s.progress,"transform","")}),e&&(s.setStyle(s.progress,"transition-duration",s.delay+"s"),s.setStyle(s.progress,"transform","translateX(0)"))),e&&(s.playing=setTimeout(s.next,1e3*s.delay))},this.autohide=()=>{s.options_autohide&&(s.hide_cooldown=Date.now()+2950,s.hide||(s.addClass(s.widget,"menu"),s.schedule(3e3)))},this.schedule=e=>{s.hide=setTimeout(function(){let e=Date.now();e>=s.hide_cooldown?(s.removeClass(s.widget,"menu"),s.hide=0):s.schedule(s.hide_cooldown-e)},e)},this.menu=e=>{"boolean"==typeof e&&(s.hide=e?s.hide:0),s.hide?(s.hide=clearTimeout(s.hide),s.removeClass(s.widget,"menu")):s.autohide()},this.start=e=>{s.cancelEvent(e,!0),s.is_down=!0,s.dragged=!1;let t=e.touches;t&&(t=t[0])&&(e=t),s.slidable=s.media_w*s.scale<=s.viewport_w,s.startX=e.pageX,s.startY=e.pageY,s.toggleAnimation(s.panel)},this.end=e=>{if(s.cancelEvent(e),s.is_down){if(s.dragged){if(s.slidable&&s.dragged){let t=s.x<-(s.viewport_w/7)&&(s.current_slide<s.slide_count||s.options_infinite),i=t||s.x>s.viewport_w/7&&(s.current_slide>1||s.options_infinite);(t||i)&&(s.update_slider(s.current_slide-1,!0,s.x/s.viewport_w*100),t&&s.next()||i&&s.prev()),s.x=0,s.update_panel()}s.toggleAnimation(s.panel,!0)}else s.menu();s.is_down=!1}},this.move=e=>{if(s.cancelEvent(e),s.is_down){let t=e.touches;t&&(t=t[0])&&(e=t);let i=(s.media_w*s.scale-s.viewport_w)/2;s.x-=s.startX-(s.startX=e.pageX),!s.slidable&&(s.x>i?s.x=i:s.x<-i&&(s.x=-i),s.media_h*s.scale>s.viewport_h&&(i=(s.media_h*s.scale-s.viewport_h)/2,s.y-=s.startY-(s.startY=e.pageY),s.y>i?s.y=i:s.y<-i&&(s.y=-i))),s.dragged=!0,s.update_panel(s.x,s.y)}else s.autohide()},this.fullscreen=e=>{let t=s.has_fullscreen();("boolean"!=typeof e||!!t!==e)&&(t?document[s.prefix_exit]():s.widget[s.prefix_request]())},this.theme=e=>{"string"!=typeof e&&(e=s.toggle_theme?"":s.options_theme||"white"),s.toggle_theme!==e&&(s.toggle_theme&&s.removeClass(s.widget,s.toggle_theme),e&&s.addClass(s.widget,e),s.toggle_theme=e)},this.autofit=e=>{"boolean"==typeof e&&(s.toggle_autofit=!e),s.toggle_autofit=1===s.scale&&!s.toggle_autofit,s.toggleClass(s.media,"autofit",s.toggle_autofit),s.setStyle(s.media,"transform",""),s.scale=1,s.x=0,s.y=0,s.update_media_viewport(),s.toggleAnimation(s.panel),s.update_panel()},this.zoom_in=e=>{let t=s.scale/.65;t<=50&&(s.disable_autoresizer(),s.x/=.65,s.y/=.65,s.update_panel(s.x,s.y),s.zoom(t))},this.zoom_out=e=>{let t=.65*s.scale;s.disable_autoresizer(),t>=1&&(1===t?s.x=s.y=0:(s.x*=.65,s.y*=.65),s.update_panel(s.x,s.y),s.zoom(t))},this.zoom=e=>{s.scale=e||1,s.update_scroll()},this.info=()=>{s.footer_visible=!s.footer_visible,s.toggleVisibility(s.footer,s.footer_visible)},this.disable_autoresizer=()=>{s.toggle_autofit&&s.autofit()},this.show_gallery=()=>{s.toggleAnimation(s.widget,!0),s.addClass(s.body,"hide-scrollbars"),s.addClass(s.widget,"show"),s.toggle_listener(!0),s.update_widget_viewport(),s.resize_listener(),s.autohide(),s.options_autoslide&&s.play(!0,!0)},this.download=()=>{s.downloadImage(s.body,s.media)},this.close=(e,t)=>{if(s.hasClass(s.body,"relative")&&!t){s.fullscreen(!1);return}t||setTimeout(function(){s.body.removeChild(s.widget),s.panel=s.media=s.gallery=s.options=s.options_group=s.anchors=s.options_onshow=s.options_onchange=s.options_onclose=s.options_click=null},200),s.removeClass(s.body,"hide-scrollbars"),s.removeClass(s.widget,"show"),s.fullscreen(!1),s.toggle_listener(),s.gallery_next&&(s.media_next.src=""),s.playing&&s.play(),s.media&&s.checkout(s.media),s.hide&&(s.hide=clearTimeout(s.hide)),s.toggle_theme&&s.theme(),s.options_class&&s.removeClass(s.widget,s.options_class),s.options_onclose&&s.options_onclose(),t&&(s.body.removeChild(s.widget),s.panel=s.media=s.gallery=s.options=s.options_group=s.anchors=s.options_onshow=s.options_onchange=s.options_onclose=s.options_click=null)},this.checkout=e=>{if(e._root)e._root.appendChild(e),e._root=null;else{let t=e.parentNode;t&&t.removeChild(e),e=e.src=e.onerror=""}},this.prev=e=>{if(e&&s.autohide(),s.slide_count>1){if(s.current_slide>1)return s.goto(s.current_slide-1);if(s.options_infinite)return s.update_slider(s.slide_count,!0),s.goto(s.slide_count)}},this.next=e=>{if(e&&s.autohide(),s.slide_count>1){if(s.current_slide<s.slide_count)return s.goto(s.current_slide+1);if(s.options_infinite)return s.update_slider(-1,!0),s.goto(1);s.playing&&s.play()}},this.goto=e=>{if(e!==s.current_slide){s.playing?(clearTimeout(s.playing),s.animate_bar()):s.autohide();let t=e>s.current_slide;return s.current_slide=e,s.setup_page(t),!0}},this.prepare=e=>{let t=s.anchors[s.current_slide-1];s.apply_options(t);let i=n&&n.downlink,o=Math.max(s.viewport_h,s.viewport_w)*l;i&&1200*i<o&&(o=1200*i);let a;if(s.gallery={media:s.options_media,src:s.parse_src(t,o,s.options,s.options_media),title:s.parse_option("title",t.alt||t.title||(a=t.firstElementChild)&&(a.alt||a.title))},s.gallery_next&&(s.media_next.src=s.gallery_next=""),s.options_preload&&e&&(t=s.anchors[s.current_slide])){let r=t.dataset||t,d=r.media;d&&"image"!==d||(s.gallery_next=s.parse_src(t,o,r,d))}for(let p=0;p<s.controls.length;p++){let c=s.controls[p];s.toggleDisplay(s.controls_dom[c],s.parse_option(c,s.controls_default[c]))}},this.setup_page=e=>{if(s.x=0,s.y=0,s.scale=1,s.media){if(s.media.onerror)s.checkout(s.media);else{let t=s.media;setTimeout(function(){t&&s.media!==t&&(s.checkout(t),t=null)},650),s.prepare_animation(),s.update_panel()}}s.footer&&s.toggleVisibility(s.footer,0),s.prepare(e),s.update_slider(s.current_slide-1),s.removeClass(s.spinner,"error"),s.init_slide(s.current_slide),s.toggleAnimation(s.panel),s.update_panel();let i=s.gallery.title,o=s.parse_option("description"),n=s.parse_option("button"),l=i||o||n;l&&(i&&s.setText(s.title,i),o&&s.setText(s.description,o),n&&s.setText(s.button,n),s.toggleDisplay(s.title,i),s.toggleDisplay(s.description,o),s.toggleDisplay(s.button,n),s.setStyle(s.footer,"transform","all"===s.options_autohide?"":"none")),s.options_autohide||s.addClass(s.widget,"menu"),s.toggleVisibility(s.footer,s.footer_visible&&l),s.toggleVisibility(s.page_prev,s.options_infinite||s.current_slide>1),s.toggleVisibility(s.page_next,s.options_infinite||s.current_slide<s.slide_count),s.setText(s.page,s.slide_count>1?s.current_slide+" / "+s.slide_count:""),s.options_onchange&&s.options_onchange(s.current_slide,s.options)}};"undefined"!=typeof module&&void 0!==module.exports?module.exports=t:e.Spotlight=t}(window);