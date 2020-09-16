if (self.CavalryLogger) { CavalryLogger.start_js(["URbBo"]); }

__d("PixelRatioConst",[],(function(a,b,c,d,e,f){e.exports={cookieName:"dpr"}}),null);
__d("ResetScrollOnUnload",["Run"],(function(a,b,c,d,e,f){a={disableScrollRestoration:function(){b("Run").onUnload(function(){window.history.scrollRestoration="manual"})},init:function(a){b("Run").onUnload(function(){window.history.scrollRestoration="manual",a.style.opacity="0",window.scrollTo(0,0)})}};e.exports=a}),null);
__d("TimezoneAutoset",["AsyncRequest","DateConsts","FBLogger","emptyFunction","killswitch"],(function(a,b,c,d,e,f){__p&&__p();var g=b("DateConsts").HOUR_PER_DAY,h=b("DateConsts").MIN_PER_HOUR,i=b("DateConsts").MS_PER_SEC,j=b("DateConsts").SEC_PER_MIN,k=!1;function l(a){var c=h*g,d=new Date(),e=d.getTimezoneOffset();d=d.getTime()/i;var f=15;a=a-d;d=Math.round(a/(f*j))*f;d!=0&&b("FBLogger")("TimezoneAutoset").warn("Adjusting timezone offset for clock skew. Browser offset: %s. Raw skew %s. Rounded skew %s",e,a,d);f=Math.round(e+d)%c;f>12*h?f-=c:f<-14*h&&(f+=c);return f}function a(a,b,c){m({serverTimestamp:a,serverTimezone:null,serverGmtOffset:b,forceUpdate:c})}function m(a){__p&&__p();var c=a.serverTimestamp,d=a.serverTimezone,e=a.serverGmtOffset;a=a.forceUpdate;if(!c||e==null)return;if(k)return;k=!0;c=-l(c);var f=b("killswitch")("TIMEZONE_SET_IANA_ZONE_NAME")?null:n();if(a||c!=e||f!=null&&f!=d){e="/ajax/timezone/update.php";new(b("AsyncRequest"))().setURI(e).setData({tz:f,gmt_off:c,is_forced:a}).setErrorHandler(b("emptyFunction")).setTransportErrorHandler(b("emptyFunction")).setOption("suppressErrorAlerts",!0).send()}}function n(){try{var a;a=((a=window.Intl)==null?void 0:a.DateTimeFormat)&&Intl.DateTimeFormat();a=(a==null?void 0:a.resolvedOptions)&&a.resolvedOptions();return a==null?void 0:a.timeZone}catch(a){b("FBLogger")("TimezoneAutoset").catching(a).warn("Could not read IANA timezone from browser");return null}}c={setInputValue:function(a,b){a.value=l(b).toString()},setTimezone:a,getBrowserGMTOffsetAdjustedForSkew:l,getBrowserTimezone:n,setTimezoneAndOffset:m};e.exports=c}),null);
__d("DOMTraverser",["DOM"],(function(a,b,c,d,e,f){__p&&__p();var g={previousNode:function(a){if(a.previousElementSibling){var b=a.previousElementSibling;while(b.lastElementChild!==null)b=b.lastElementChild;return b}return a.parentElement},nextNode:function(a){__p&&__p();if(a.firstElementChild)return a.firstElementChild;if(a.nextElementSibling)return a.nextElementSibling;a=a.parentElement;while(a!=null){if(a.nextElementSibling)return a.nextElementSibling;a=a.parentElement}return null},previousFilteredNode:function(a,b,c){__p&&__p();if(b===a)return null;b=g.previousNode(b);while(b!=null){if(b instanceof HTMLElement&&c(b))return b;if(b===a)return null;b=g.previousNode(b)}return null},nextFilteredNode:function(a,c,d){c=g.nextNode(c);while(c!=null){if(a&&!b("DOM").contains(a,c))return null;if(c instanceof HTMLElement&&d(c))return c;c=g.nextNode(c)}return null}};e.exports=g}),null);
__d("NavigationMenubarInteractionsTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:NavigationMenubarInteractionsLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:NavigationMenubarInteractionsLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:NavigationMenubarInteractionsLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setAction=function(a){this.$1.action=a;return this};c.setTargetItem=function(a){this.$1.target_item=a;return this};c.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};return a}();var g={action:!0,target_item:!0};e.exports=a}),null);
__d("NavigationAssistantController",["csx","cx","fbt","Arbiter","AsyncRequest","CSS","DOM","DOMEventListener","DOMQuery","DOMTraverser","Event","Focus","KeyboardShortcuts","KeyEventController","Menu","MenuItem","NavigationMenubarInteractionsTypedLogger","PageTransitions","RTLKeys","TabbableElements","debounce","ge","getActiveElement","getOrCreateDOMID","gkx","setImmediate","setTimeout"],(function(a,b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j=["main","banner","search","navigation","region","complementary","form","contentinfo"],k={main:function(a){return a?i._("Main: {section name}",[i._param("section name",a)]):i._("Main section")},banner:function(a){return i._("{section name} banner",[i._param("section name",a)])},search:function(a){return i._("Search {section name}",[i._param("section name",a)])},navigation:function(a){return a?i._("Navigate {section name}",[i._param("section name",a)]):i._("Navigation")},region:function(a){return a},complementary:function(a){return a?a:i._("Complementary information")},form:function(a){return i._("{section name} form",[i._param("section name",a)])},contentinfo:function(a){return i._("{section name} footer",[i._param("section name",a)])}},l=500;a={init:function(a,c,d,e,f,g){__p&&__p();var h=this;this._banner=a;this._menubar=c;this._sectionsMenu=d;this._accessibilityMenu=e;this._globalMenu=f;this._shortcutMenuItem=this._accessibilityMenu&&this._accessibilityMenu.getItemAt(0);this._menubarMenus=[{menu:this._sectionsMenu,logName:"page_sections"}];this._accessibilityMenu&&this._menubarMenus.push({menu:this._accessibilityMenu,logName:"accessibility"});this._globalMenu&&this._menubarMenus.push({menu:this._globalMenu,logName:"global"});document.body&&b("CSS").addClass(document.body,"hasAXNavMenubar");this._hasBanner=document.body&&b("CSS").hasClass(document.body,"hasBanner");this._shown=!1;this._items=[];this._hotKeyTrigger=null;this._menubarMenuItems=b("DOMQuery").scry(this._menubar,'[role="button"]');this._menubarMenuItems.forEach(function(a){a.setAttribute("role","menuitem")});this._activeItem=this._menubarMenuItems[0];this._activeItemIndex=0;if(g!=null)for(var i in g)Object.prototype.hasOwnProperty.call(g,i)&&g[i]!=null&&g[i].disableTypeaheadActivation();this._setupEvents();this._keysSoFar="";this._clearKeysSoFarAfterDelay=b("debounce")(function(){h._keysSoFar=""},l);this._handlePageLoad()},_setupEvents:function(){__p&&__p();var a=this;this._menubarMenuItems[0].addEventListener("focus",this._showMenubar.bind(this));this._menubar.addEventListener("keydown",this._checkHide.bind(this));this._menubar.addEventListener("keyup",this._checkMenuSwitch.bind(this));this._menubarMenus.forEach(function(b){b.menu.subscribe("show",a._menuShown.bind(a,b)),b.menu.subscribe("hide",a._menuHidden.bind(a,b)),b.menu.subscribe("done",a._checkBlur.bind(a)),b.menu.getRoot().addEventListener("keyup",a._checkMenuSwitch.bind(a))});b("DOMEventListener").add(document,"click",this._checkClickBlur.bind(this));this._sectionsMenu.subscribe("focus",this._highlightFocused.bind(this));this._sectionsMenu.subscribe("blur",this._unhighlightFocused.bind(this));this._accessibilityMenu&&this._accessibilityMenu.subscribe("itemclick",this._checkShortcutsShow.bind(this));this._globalMenu&&this._globalMenu.subscribe("itemclick",this._checkLogEvent.bind(this));b("gkx")("677762")&&(b("DOMEventListener").add(document,"keydown",this._checkHotKey.bind(this)),b("DOMEventListener").add(document,"keypress",this._trackHotKeyPress.bind(this)),b("DOMEventListener").add(document,"keyup",this._unsetHotKey.bind(this)))},_checkHide:function(a){var c=this;a=b("Event").getKeyCode(a);if(a===b("RTLKeys").ESC){this._hideMenubar();this._returnFocus();return}a===b("RTLKeys").TAB&&b("setImmediate")(function(){c._hideMenubar()})},_returnFocus:function(){if(this._hotKeyTrigger)b("Focus").set(this._hotKeyTrigger,!0),this._hotKeyTrigger=null;else{var a=this._banner.nextElementSibling;b("TabbableElements").isTabbable(a)||(a=b("DOMTraverser").nextFilteredNode(document.body,a,b("TabbableElements").isTabbable));b("Focus").set(a)}},_setActiveItem:function(a){if(a<0||a>=this._menubarMenuItems.length)return;this._activeItem.setAttribute("tabindex","-1");this._activeItem=this._menubarMenuItems[a];this._activeItemIndex=a;this._activeItem.setAttribute("tabindex","0")},_checkMenuSwitch:function(a){__p&&__p();var c=this;a=b("Event").getKeyCode(a);var d=this._menubarMenus.length,e=this._activeItemIndex;switch(a){case b("RTLKeys").getLeft():e=this._activeItemIndex===0?d-1:this._activeItemIndex-1;break;case b("RTLKeys").getRight():e=this._activeItemIndex===d-1?0:this._activeItemIndex+1;break;default:e=this._findItemToFocus(a);if(e<0)return!1}this._isShowingMenu&&this._isShowingMenu.done();this._setActiveItem(e);b("setTimeout")(function(){b("Focus").set(c._activeItem,!0)},0);return!0},_findItemToFocus:function(a){if(this._isShowingMenu)return-1;a=String.fromCharCode(a).toLowerCase();this._keysSoFar||(this._searchIndex=this._activeItemIndex);this._keysSoFar+=a;this._clearKeysSoFarAfterDelay();a=this._findMatchInRange(this._searchIndex+1,this._menubarMenuItems.length);a<0&&(a=this._findMatchInRange(0,this._searchIndex));return a<0?this._searchIndex:a},_findMatchInRange:function(a,b){for(var a=a;a<b;a++){var c=this._menubarMenuItems[a].innerText;if(c.toLowerCase().indexOf(this._keysSoFar)===0)return a}return-1},_menuShown:function(a){this._ignoreBlur=!0,this._isShowingMenu=a.menu,this._logEvent("menu_shown",a.logName)},_menuHidden:function(a){this._ignoreBlur=!1,this._isShowingMenu===a.menu&&(this._isShowingMenu=null)},_checkClickBlur:function(){this._ignoreBlur||this._checkBlur()},_checkBlur:function(){var a=this,c=b("getActiveElement")();this._shown&&c&&!b("DOM").contains(this._menubar,c)&&!this._ignoreBlur&&b("setImmediate")(function(){a._hideMenubar()});this._highlighted&&(b("CSS").removeClass(this._highlighted,"_1toc"),this._highlighted=null)},_highlightFocused:function(a,c){this._highlighted&&b("CSS").removeClass(this._highlighted,"_1toc"),this._highlighted=b("ge")(c.item.getValue()),this._highlighted&&b("CSS").addClass(this._highlighted,"_1toc")},_unhighlightFocused:function(a,c){this._highlighted&&b("CSS").removeClass(this._highlighted,"_1toc")},_checkHotKey:function(a){__p&&__p();var c=this,d=b("Event").getKeyCode(a),e=a.altKey;if(!b("gkx")("677763")&&!b("KeyEventController").filterEventTargets(a,"keydown"))return;if(d===b("RTLKeys").FORWARD_SLASH&&e){d=b("getActiveElement")();this._listenHotKeyPress=!0;if(this._shown){this._menubarMenus.forEach(function(a){a.menu.done()});b("setTimeout")(function(){c._returnFocus(),c._hideMenubar()},0);return}if(d&&this._isInDialog(d))return;this._hotKeyTrigger=d;this._showMenubar();b("Focus").set(this._activeItem,!0);this._logEvent("hotkey_triggered","menubar");return}this._listenHotKeyPress=!1;this._shown&&this._checkHide(a)},_unsetHotKey:function(a){this._listenHotKeyPress=!1},_trackHotKeyPress:function(a){if(this._listenHotKeyPress){a=b("Event").getKeyCode(a);this._logEvent("hotkey_char",""+a)}},_handlePageLoad:function(){var a=this;this._validateMainSection();this._setupSectionsMenu();this._setupAccessibilityMenu();b("PageTransitions").registerCompletionCallback(function(){a._handlePageLoad()})},_validateMainSection:function(){var a=document.getElementById("content");if(!a)return;var c=b("DOMQuery").scry(a,'[role="main"]'),d=a.getAttribute("role")==="main";c.length&&d?a.setAttribute("role",""):!c.length&&!d&&a.setAttribute("role","main")},_isInDialog:function(a){a=a;while(a&&a!==document&&a.getAttribute("role")!=="dialog")a=a.parentNode;return a!==document},_hideMenubar:function(){if(!this._shown)return;this._shown=!1;b("KeyboardShortcuts").popLayer();b("CSS").addClass(this._banner,"_1toe");this._setActiveItem(0);!this._hasBanner&&document.body&&b("CSS").removeClass(document.body,"hasBanner");b("setTimeout")(function(){b("Event").fire(window,"scroll")},350)},_showMenubar:function(){__p&&__p();if(this._shown)return;this._shown=!0;this._ignoreBlur=!1;this._validateMainSection();this._setupSectionsMenu();this._setupAccessibilityMenu();b("KeyboardShortcuts").pushLayer();this._banner.nextElementSibling&&b("CSS").matchesSelector(this._banner.nextElementSibling,"._73y_")?b("CSS").addClass(this._banner,"_1tof"):b("CSS").removeClass(this._banner,"_1tof");b("CSS").removeClass(this._banner,"_1toe");!this._hasBanner&&document.body&&b("CSS").addClass(document.body,"hasBanner");b("setTimeout")(function(){b("Event").fire(window,"scroll"),b("Arbiter").inform("banner/shown",null,"state")},50);this._logEvent("shown","menubar")},_addMenuItem:function(a,c,d){var e=this;c=b("Menu").buildItemFromData({ctor:b("MenuItem"),label:a,selected:!1,value:c,onclick:function(c){b("setTimeout")(function(){b("Focus").set(b("ge")(d),!0),e._hideMenubar()},0),e._logEvent("selected_item",a),e._ignoreBlur=!1}});this._sectionsMenu.addItem(c);this._items.push(c)},_getLandmarkSections:function(a){var b=[],c=[];a.forEach(function(a){var d=a.getAttribute("role");d==="main"?b.push(a):j.indexOf(d)>-1&&c.push(a)});return b.concat(c)},_computeElementLabel:function(a,b,c){__p&&__p();var d=this,e=a.getAttribute("id");c=c||[];var f=c.includes(e);!f&&e&&c.push(e);e=a.getAttribute("aria-labelledby");if(!f&&e){f=e.split(" ");var g="";f.forEach(function(a){a=document.getElementById(a);if(!a)return;g+=d._computeElementLabel(a,!1,c)});return g}e=a.getAttribute("aria-label");if(e)return e;return b?"":a.innerText?a.innerText.substring(0,100):""},_addSectionItems:function(a){__p&&__p();var c=this;a.forEach(function(a){__p&&__p();if(!b("TabbableElements").isVisible(a)||!a.offsetHeight||!a.offsetWidth)return;var d=a.getAttribute("role");if(!d||!Object.prototype.hasOwnProperty.call(k,d))return;var e=k[d](c._computeElementLabel(a,!0)),f=a;if(d==="search"||d==="region"||d==="form"){d=b("DOMQuery").scry(a,".navigationFocus");d.length&&(f=d[0],!b("TabbableElements").isTabbable(f)&&b("TabbableElements").find(f).length&&(f=b("TabbableElements").find(f)[0]))}e&&c._addMenuItem(e,b("getOrCreateDOMID")(a),b("getOrCreateDOMID")(f))})},_setupSectionsMenu:function(){var a=b("DOMQuery").scry(document.body,"[role]");a=this._getLandmarkSections(a);this._cleanupSectionsMenu();this._addSectionItems(a)},_cleanupSectionsMenu:function(){while(this._items.length)this._sectionsMenu.removeItem(this._items.pop())},_setupAccessibilityMenu:function(){if(!this._accessibilityMenu)return;if(b("KeyboardShortcuts").hasFlyoutToShow()){var a=this._accessibilityMenu.getItemAt(0);a!==this._shortcutMenuItem&&this._accessibilityMenu.addItemBefore(this._shortcutMenuItem,a)}else this._accessibilityMenu.removeItem(this._shortcutMenuItem)},_logEvent:function(a,c){new(b("NavigationMenubarInteractionsTypedLogger"))().setAction(a).setTargetItem(c).log()},_checkShortcutsShow:function(a,c){c.item.getValue()==="key_shortcuts"&&(this._ignoreBlur=!1,this._hideMenubar(),b("setTimeout")(function(){b("KeyboardShortcuts").showShortcutFlyout()},0)),this._logEvent("selected_item_ax",c.item.getValue())},_checkLogEvent:function(a,b){a=b.item.getValue();this._logEvent("selected_item_global",a);this._ignoreBlur=!1},_getHelpDialogRequest:function(){if(!this._dialogRequest)this._dialogRequest=new(b("AsyncRequest"))("/ajax/keyboard_shortcuts"),this._dialogRequest.setReadOnly(!0);else if(this._dialogRequest.transport)return null;return this._dialogRequest}};e.exports=a}),null);
__d("FormTypeABTester",["Base64","Event"],(function(a,b,c,d,e,f){__p&&__p();function a(a){__p&&__p();var c=32,d=65,e=90,f=48,g=57,h=58,i=63,j=91,k=94,l=0,m=0,n=0,o=0,p=[],q=null,r=[],s=[],t=[],u=[];for(var v=0;v<10;v++)r.push(0),s.push(0);for(var v=0;v<10;v++)s.push(0),t.push(0),u.push(0);v=function(a){__p&&__p();var b=window.event?Date.now():a.timeStamp;a=window.event?window.event.keyCode:a.which;a%=128;a>=d&&a<=e||a==c?l++:a>=f&&a<=g?m++:a>=h&&a<=i||a>=j&&a<=k?n++:o++;p[a]=b;if(q){var r=b-q;r>=0&&(a>=d&&a<=e||a==c)&&(r<400?s[Math.floor(r/20)]++:r<1e3?t[Math.floor((r-400)/60)]++:r<3e3&&u[Math.floor((r-1e3)/200)]++)}q=b};var w=function(a){var b=window.event?Date.now():a.timeStamp;a=window.event?window.event.keyCode:a.which;b=b-p[a%128];b>=50&&b<250&&r[Math.floor((b-50)/20)]++},x=function(a){var b=Math.max.apply(Math,a),c=[];a.forEach(function(a){c.push(Math.floor(a*63/(b||1)))});return c};this.getDataVect=function(){var a=s.concat(t,u);return x(a).concat(x(r),[l/2,m/2,n/2,o/2])};this.getData=function(){return b("Base64").encodeNums(this.getDataVect())};b("Event").listen(a,{keyup:w.bind(this),keydown:v.bind(this)})}e.exports=a}),null);
__d("legacy:onload-action",["PageHooks"],(function(a,b,c,d,e,f){a._domreadyHook=b("PageHooks")._domreadyHook,a._onloadHook=b("PageHooks")._onloadHook,a.runHook=b("PageHooks").runHook,a.runHooks=b("PageHooks").runHooks,a.keep_window_set_as_loaded=b("PageHooks").keepWindowSetAsLoaded}),3);
__d("FlipDirection",["DOM","Input","Style"],(function(a,b,c,d,e,f){__p&&__p();a={setDirection:function(a,c,d){__p&&__p();c===void 0&&(c=5);d===void 0&&(d=!1);var e=b("DOM").isNodeOfType(a,"input")&&a.type=="text",f=b("DOM").isNodeOfType(a,"textarea");if(!(e||f)||a.getAttribute("data-prevent-auto-flip"))return;e=b("Input").getValue(a);f=a.style&&a.style.direction;if(!f||d){f=0;d=!0;for(var g=0;g<e.length;g++){var h=e.charCodeAt(g);if(h>=48){d&&(d=!1,f++);if(h>=1470&&h<=1920){b("Style").set(a,"direction","rtl");a.setAttribute("dir","rtl");return}if(f==c){b("Style").set(a,"direction","ltr");a.setAttribute("dir","ltr");return}}else d=!0}}else e.length===0&&(b("Style").set(a,"direction",""),a.removeAttribute("dir"))}};e.exports=a}),null);
__d("FlipDirectionOnKeypress",["Event","FlipDirection"],(function(a,b,c,d,e,f){a=function(a){a=a.getTarget();b("FlipDirection").setDirection(a)};b("Event").listen(document.documentElement,{keyup:a,input:a})}),null);
__d("Nectar",["Env","getContextualParent"],(function(a,b,c,d,e,f){__p&&__p();function g(a){a.nctr||(a.nctr={})}function h(a){__p&&__p();if(b("Env").module||!a)return b("Env").module;var c={fbpage_fan_confirm:!0,photos_snowlift:!0},d;while(a&&a.getAttribute){var e=a.getAttribute("id");if(e!=null&&e.startsWith("pagelet_"))return e;!d&&c[e]&&(d=e);a=b("getContextualParent")(a)}return d}a={addModuleData:function(a,b){b=h(b);b&&(g(a),a.nctr._mod=b)},addImpressionID:function(a){b("Env").impid&&(g(a),a.nctr._impid=b("Env").impid)}};e.exports=a}),null);
__d("AccessibilityWebAssistiveTechTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:AccessibilityWebAssistiveTechLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:AccessibilityWebAssistiveTechLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:AccessibilityWebAssistiveTechLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setIndicatedBrowsers=function(a){this.$1.indicated_browsers=b("GeneratedLoggerUtils").serializeVector(a);return this};c.setIsVirtualCursorAction=function(a){this.$1.is_virtual_cursor_action=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setVC=function(a){this.$1.vc=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};c.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};return a}();var g={indicated_browsers:!0,is_virtual_cursor_action:!0,time:!0,vc:!0,weight:!0};e.exports=a}),null);
__d("FourOhFourJSTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:FourOhFourJSLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:FourOhFourJSLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:FourOhFourJSLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setFbid=function(a){this.$1.fbid=a;return this};c.setOriginalURI=function(a){this.$1.original_uri=a;return this};c.setScriptPath=function(a){this.$1.script_path=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};c.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};return a}();var g={fbid:!0,original_uri:!0,script_path:!0,time:!0,weight:!0};e.exports=a}),null);
__d("KeyboardActivityTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:KeyboardActivityLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:KeyboardActivityLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:KeyboardActivityLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setDuration=function(a){this.$1.duration=a;return this};c.setKey=function(a){this.$1.key=a;return this};c.setVC=function(a){this.$1.vc=a;return this};return a}();c={duration:!0,key:!0,vc:!0};e.exports=a}),null);
__d("LoginFormController",["Button","Cookie","DeferredCookie","Event","FBSiteWhiteOps","FormTypeABTester","WebStorage","ge","goURI","guid"],(function(a,b,c,d,e,f){__p&&__p();f.init=function(a,c,d,e,f){__p&&__p();if(e)var g=new(b("FormTypeABTester"))(a);b("Event").listen(a,"submit",function(){e&&a.ab_test_data&&(a.ab_test_data.value=g.getData());var d=b("guid")();a.guid&&(a.guid.value=d);(f==null?void 0:f.shouldRunBotDetection)&&b("FBSiteWhiteOps").appendToWindow(d,"FACEBOOK_LOGIN","LOGIN_CLICK");window.__cookieReload&&window.clearInterval(window.__cookieReload);b("Button").setEnabled(c,!1);window.setTimeout(b("Button").setEnabled.bind(null,c,!0),15e3);b("DeferredCookie").flushAllCookies()});var h=b("ge")("lgnjs");if(h){var i=Math.floor(Date.now()/1e3);h.value=i}var j=b("WebStorage").getSessionStorage();h=j!=null?parseInt(j.getItem("LoginPollRateLimit"),10):0;var k=d!=null;h>i-60&&(k=!1);if(k){var l;h=function(){b("Cookie").get("c_user")!=null&&(window.clearInterval(l),j!=null&&j.setItem("LoginPollRateLimit",Math.floor(Date.now()/1e3)),b("goURI")(d))};l=window.setInterval(h,1e3);h()}}}),null);
__d("AsyncRequestNectarLogging",["AsyncRequest","Nectar"],(function(a,b,c,d,e,f){Object.assign(b("AsyncRequest").prototype,{setNectarModuleData:function(a){this.method=="POST"&&b("Nectar").addModuleData(this.data,a)}})}),null);
__d("FocusRing",["cx","CSS","Event","KeyEventController","Keys","VirtualCursorStatus","emptyFunction"],(function(a,b,c,d,e,f,g){__p&&__p();var h=["mousedown","mouseup"];a={KEY_CODES:[b("Keys").UP,b("Keys").RIGHT,b("Keys").DOWN,b("Keys").LEFT,b("Keys").TAB,b("Keys").RETURN,b("Keys").SPACE,b("Keys").ESC],init:function(){if(this._initialized)return;this._userInteractingWithKeyboard=!1;this._attachVirtualCursorListener();this._attachKeyDownListener();document.body&&b("CSS").addClass(document.body,"_19_u");this._initialized=!0},usingKeyboardNavigation:function(){return this._userInteractingWithKeyboard},_attachVirtualCursorListener:function(){document.documentElement&&(this._onClickListener=b("VirtualCursorStatus").add(document.documentElement,this._onClick.bind(this)))},_attachMouseListeners:function(){var a=this;this._onMouseListeners=h.map(function(c){return b("Event").listen(document.documentElement,c,a._onMouseEvent.bind(a))})},_attachKeyDownListener:function(){this._onKeyDownListener=b("Event").listen(document.documentElement,"keydown",this._onKeyDown.bind(this))},_initialized:!1,_userInteractingWithKeyboard:!0,_onMouseEvent:function(){this._hideFocusRing()},_onMouseListeners:h.map(function(a){return{remove:b("emptyFunction")}}),_removeMouseListeners:function(){this._onMouseListeners.forEach(function(a){return a.remove()})},_onClick:function(a,b,c){a&&this._showFocusRing()},_onKeyDown:function(a){this.KEY_CODES.indexOf(b("Event").getKeyCode(a))>-1&&b("KeyEventController").filterEventTargets(a,"keydown")&&this._showFocusRing()},_showFocusRing:function(){this._onKeyDownListener.remove(),this._attachMouseListeners(),this._userInteractingWithKeyboard=!0,document.body&&b("CSS").removeClass(document.body,"_19_u")},_hideFocusRing:function(){this._removeMouseListeners(),this._attachKeyDownListener(),this._userInteractingWithKeyboard=!1,document.body&&b("CSS").addClass(document.body,"_19_u")},_onKeyDownListener:{remove:b("emptyFunction")},_onClickListener:{remove:b("emptyFunction")}};e.exports=a}),null);
__d("FourOhFourJSLogger",["FourOhFourJSTypedLogger","ScriptPath"],(function(a,b,c,d,e,f){a={log:function(){window.onload=function(){var a=new(b("FourOhFourJSTypedLogger"))();a.setOriginalURI(window.location.href);a.setScriptPath(b("ScriptPath").getScriptPath());a.logVital()}}};e.exports=a}),null);
__d("LoginbarPopover",["CSS","ge","getActiveElement"],(function(a,b,c,d,e,f){__p&&__p();var g=1e3;a={init:function(a,c,d){var e=this,f=b("ge")("email",d);setTimeout(function(){return e.show(a,d,f)},g);c.addEventListener("click",function(a){a.kill(),e.toggle(d,f)});a.style.visibility="visible"},show:function(a,c,d){b("CSS").show(c);a=b("getActiveElement")().tagName.toLowerCase();a!=="input"&&a!=="textarea"&&d.focus()},toggle:function(a,c){b("CSS").toggle(a),b("CSS").shown(a)&&c.focus()}};e.exports=a}),null);
__d("ScreenDimensionsAutoSet",[],(function(a,b,c,d,e,f){function g(){if(!window.btoa)return"";var a={w:screen.width,h:screen.height,aw:screen.availWidth,ah:screen.availHeight,c:screen.colorDepth};return btoa(JSON.stringify(a))}a={setInputValue:function(a){a.value=g()}};e.exports=a}),null);
__d("WebPixelRatioDetector",["Cookie","DOMEventListener","PixelRatioConst","Run"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("PixelRatioConst").cookieName,h=!1,i=!1,j=!1;function k(){return window.devicePixelRatio||1}function l(){b("Cookie").set(g,String(k()))}function m(){b("Cookie").clear(g)}function n(){if(i)return;i=!0;j&&m();k()!==1?l():m()}a={startDetecting:function(a){a&&(j=!0);if(h)return;h=!0;"onpagehide"in window&&b("DOMEventListener").add(window,"pagehide",n);b("Run").onBeforeUnload(n,!1)}};e.exports=a}),null);
__d("ErrorContextualDialogXUITheme",["cx"],(function(a,b,c,d,e,f,g){a={wrapperClassName:"_572t",arrowDimensions:{offset:12,length:22}};e.exports=a}),null);
__d("AccessibilityWebVirtualCursorClickLogger",["AccessibilityWebAssistiveTechTypedLogger","VirtualCursorStatus"],(function(a,b,c,d,e,f){a={init:function(a){var c=this;a.forEach(function(a){b("VirtualCursorStatus").add(a,c._log)},this)},_log:function(a,c,d){d===void 0&&(d=!1),a&&new(b("AccessibilityWebAssistiveTechTypedLogger"))().setIndicatedBrowsers(c).setIsVirtualCursorAction(d).log()}};e.exports=a}),null);
__d("KeyboardActivityLogger",["Event","KeyboardActivityTypedLogger","Keys","isElementInteractive"],(function(a,b,c,d,e,f){__p&&__p();a=["tab","right","left","up","down","enter"];var g=a.reduce(function(a,b){a[b]={count:0,startTS:0};return a},{}),h=20;c={init:function(){document.addEventListener("keydown",this._listenForKey.bind(this))},_listenForKey:function(a){__p&&__p();var c=a.getTarget();if(b("isElementInteractive")(c))return;switch(b("Event").getKeyCode(a)){case b("Keys").TAB:this._checkKeyActivity("tab");break;case b("Keys").RIGHT:this._checkKeyActivity("right");break;case b("Keys").LEFT:this._checkKeyActivity("left");break;case b("Keys").UP:this._checkKeyActivity("up");break;case b("Keys").DOWN:this._checkKeyActivity("down");break;case b("Keys").RETURN:this._checkKeyActivity("enter");break}},_checkKeyActivity:function(a){var b=g[a];b.count++;b.startTS===0&&(b.startTS=Date.now());b.count===h&&(this._log(a),b.count=0,b.startTS=0)},_log:function(a){var c=g[a];c=Date.now()-c.startTS;new(b("KeyboardActivityTypedLogger"))().setKey(a).setDuration(c).log()}};e.exports=c}),null);
__d("VisualCompletionGating",["requireCond","cr:729414"],(function(a,b,c,d,e,f){"use strict";e.exports=b("cr:729414")}),null);
__d("BrowserPrefillSource",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({BROWSER_DROPDOWN:"browser_dropdown",BROWSER_ONLOAD:"browser_onload",SERVER_PREFILL:"server_prefill",ATTEMPT_USER:"attempt_user",EMAIL_NOTIFICATION:"email_notification",HEADER:"header",IDENTIFIED_USER:"identified_user",LAST_LOGIN:"last_login",MOBILE_SUBNO_KEY:"mobile_subno_key",PROVIDED_OR_SOFT_MATCHED:"provided_or_soft_matched",TYPO_CORRECTED:"typo_corrected"})}),null);
__d("BrowserPrefillType",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CONTACT_POINT:"contact_point",PASSWORD:"password"})}),null);
__d("LoginEvent",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({LOGIN_FAILURE:"login_failure",LOGIN_SUCCESS:"login_success",SESSION_TERMINATION:"session_termination",SESSION_UPDATE:"session_update",SESSION_FETCH:"session_fetch",SESSION_VALIDATION:"session_validation",CHANGED_USER_IDENTIFIER:"changed_user_identifier",CLICKED_NEXT:"clicked_next",CLICKED_NEXT_USER_IDENTIFIER_BLANK:"clicked_next_user_identifier_blank",CLICKED_NEXT_USER_IDENTIFIER_FILLED:"clicked_next_user_identifier_filled",PASSWORD_ENTRY_VIEWED:"password_entry_viewed",CHANGED_PASSWORD:"changed_password",CLICKED_BACK:"clicked_back",CLICKED_SUBMIT:"clicked_submit",CLICKED_SUBMIT_PASSWORD_BLANK:"clicked_submit_password_blank",CLICKED_SUBMIT_PASSWORD_FILLED:"clicked_submit_password_filled",CLICKED_SUBMIT_IDENTIFIER_BLANK:"clicked_submit_identifier_blank",CLICKED_SUBMIT_IDENTIFIER_FILLED:"clicked_submit_identifier_filled",FORM_LOAD_CLIENT:"form_load_client",FORM_LOAD:"form_load",FORM_FOCUS:"form_focus",CLICKED_REG_IDENTIFIER_BLANK:"clicked_reg_identifier_blank",CLICKED_REG_IDENTIFIER_FILLED:"clicked_reg_identifier_filled",CLICKED_REG_PASSWORD_BLANK:"clicked_reg_password_blank",CLICKED_REG_PASSWORD_FILLED:"clicked_reg_password_filled",CLICKED_LANGUAGE_SELECTOR:"clicked_language_selector",CLICKED_ON_LOGIN_SCREEN:"clicked_on_login_screen",BROWSER_AUTOCOMPLETE:"browser_autocomplete",INVALID_CONTACTPOINT:"invalid_contactpoint",VALID_CONTACTPOINT:"valid_contactpoint",SHOWN_OTP_LINK:"shown_otp_link",CLICKED_OTP_LINK:"clicked_otp_link",CLICKED_NOT_YOU:"clicked_not_you",LOGIN_WITH_REMOVED_CP_CORRECT_PW:"login_with_removed_cp_correct_pw",SMART_LOCK_SELECTED:"smart_lock_selected",SMART_LOCK_CANCELED:"smart_lock_canceled",SMART_LOCK_SHOWED:"smart_lock_showed",SMART_LOCK_SUPPORTED:"smart_lock_supported"})}),null);
__d("LoginFormKeys",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({BUTTON_KEY:"loginbutton",CUID:"cuid",EMAIL_FIELD_CONTAINER:"email_container",EMAIL_FIELD_KEY:"email",ERROR_BOX_KEY:"error_box",HEADER_BLOCK:"header_block",LOGIN_LINK:"login_link",NOT_ME_LINK:"not_me_link",PASSWORD_FIELD_KEY:"pass",PREFILL_CONTACT_POINT:"prefill_contact_point",PREFILL_SOURCE:"prefill_source",PREFILL_TYPE:"prefill_type",EMAIL_INPUT_CONTAINER:"email_input_container",FIRST_PREFILL_SOURCE:"first_prefill_source",FIRST_PREFILL_TYPE:"first_prefill_type",HAD_CP_PREFILLED:"had_cp_prefilled",HAD_PASSWORD_PREFILLED:"had_password_prefilled",AUTH_STEP_CP_DISPLAY:"step_two_cp_display",EMAIL_COMPONENTS_WRAPPER:"email_components_wrapper",PASSWORD_COMPONENTS_WRAPPER:"password_component_wrapper",USER_INFO_CONTAINER:"user_info_container",PWD_LABEL_CONTAINER:"pwd_label_container",OTP_RETRIEVE_DESC_CONTAINER:"otp_retrieve_desc_container",OTP_BUTTON_ELEM_CONTAINER:"otp_button_elem_container",OAUTH_LOGIN_BUTTON_CONTAINER:"oauth_login_button_container",OAUTH_LOGIN_DESC_CONTAINER:"oauth_login_desc_container",IS_SMART_LOCK:"is_smart_lock",HEADER_PREFILL_CP:"header_prefill_cp",USE_HEADER_PREFILL_CP:"use_header_prefill_cp",MASKED_CP:"masked_cp",IS_MTOUCH:"is_mtouch"})}),null);
__d("BrowserPrefillLogging",["BanzaiLogger","BrowserPrefillSource","BrowserPrefillType","DamerauLevenshtein","LoginEvent","LoginFormKeys","ge"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a={initContactpointFieldLogging:function(a){this.contactpointFieldID=a.contactpointFieldID;this._updateContactpoint();this.serverPrefillContactpoint=a.serverPrefill;a=b("ge")(this.contactpointFieldID);if(a==null)return;a.addEventListener("input",this._mayLogContactpointPrefillViaDropdown.bind(this));window.addEventListener("load",this._mayLogContactpointPrefillOnload.bind(this));return},registerCallback:function(a){this.regeisteredCallbacks=this.regeisteredCallbacks||[],this.regeisteredCallbacks.push(a)},_invokeCallbacks:function(a,b){if(this.regeisteredCallbacks==null||this.regeisteredCallbacks.size===0)return;this.regeisteredCallbacks.forEach(function(c){c(a,b)})},initPasswordFieldLogging:function(a){this.passwordFieldID=a.passwordFieldID;this._updatePassword();a=b("ge")(this.passwordFieldID);if(a==null)return;a.addEventListener("input",this._mayLogPasswordPrefillViaDropdown.bind(this));window.addEventListener("load",this._mayLogPasswordPrefillOnload.bind(this))},updatePrefill:function(a,c,d){var e=b("ge")(b("LoginFormKeys").PREFILL_SOURCE),f=b("ge")(b("LoginFormKeys").PREFILL_TYPE),g=b("ge")(b("LoginFormKeys").FIRST_PREFILL_SOURCE),h=b("ge")(b("LoginFormKeys").FIRST_PREFILL_TYPE),i=b("ge")(b("LoginFormKeys").HAD_CP_PREFILLED),j=b("ge")(b("LoginFormKeys").HAD_PASSWORD_PREFILLED),k=b("ge")(b("LoginFormKeys").PREFILL_CONTACT_POINT);e!=null&&(e.value=c);f!=null&&(f.value=d);k!=null&&a!=null&&(k.value=a);h!=null&&(h.value==null||h.value=="")&&(h.value=d);g!=null&&(g.value==null||g.value=="")&&(g.value=c);i!=null&&(i.value==null||i.value==="false")&&d===b("BrowserPrefillType").CONTACT_POINT&&(i.value="true");j!=null&&(j.value==null||j.value==="false")&&d===b("BrowserPrefillType").PASSWORD&&(j.value="true")},_mayLogContactpointPrefillOnload:function(){this._updateContactpoint();if(this.previousContactpoint==null||this.previousContactpoint==="")return;var a=this.previousContactpoint===this.serverPrefillContactpoint?b("BrowserPrefillSource").SERVER_PREFILL:b("BrowserPrefillSource").BROWSER_ONLOAD;this._logBrowserPrefill(a,b("BrowserPrefillType").CONTACT_POINT);this._invokeCallbacks(a,b("BrowserPrefillType").CONTACT_POINT)},_mayLogPasswordPrefillOnload:function(){this._updatePassword();if(this.previousPassword==null||this.previousPassword==="")return;this._logBrowserPrefill(b("BrowserPrefillSource").BROWSER_ONLOAD,b("BrowserPrefillType").PASSWORD);this._invokeCallbacks(b("BrowserPrefillSource").BROWSER_ONLOAD,b("BrowserPrefillType").PASSWORD)},_mayLogContactpointPrefillViaDropdown:function(){__p&&__p();var a=b("ge")(this.contactpointFieldID);if(a==null||a.value==null)return;if(this._isBrowserPrefill(this.previousContactpoint,a.value)===!1){this._updateContactpoint();return}this._updateContactpoint();this._logBrowserPrefill(b("BrowserPrefillSource").BROWSER_DROPDOWN,b("BrowserPrefillType").CONTACT_POINT);this._invokeCallbacks(b("BrowserPrefillSource").BROWSER_DROPDOWN,b("BrowserPrefillType").CONTACT_POINT)},_mayLogPasswordPrefillViaDropdown:function(){__p&&__p();var a=b("ge")(this.passwordFieldID);if(a==null||a.value==null)return;if(this._isBrowserPrefill(this.previousPassword,a.value)===!1){this._updatePassword();return}this._updatePassword();this._logBrowserPrefill(b("BrowserPrefillSource").BROWSER_DROPDOWN,b("BrowserPrefillType").PASSWORD);this._invokeCallbacks(b("BrowserPrefillSource").BROWSER_DROPDOWN,b("BrowserPrefillType").PASSWORD)},_isBrowserPrefill:function(a,c){if(c==="")return!1;if(c===a)return!1;if(c.length===1||a.length===c.length+1||c.length===a.length+1)return!1;var d=b("DamerauLevenshtein").DamerauLevenshteinDistance(c,a);return d===a.length-c.length?!1:!0},_updateContactpoint:function(){var a=b("ge")(this.contactpointFieldID);this.previousContactpoint=a!=null&&a.value!=null?a.value:""},_updatePassword:function(){var a=b("ge")(this.passwordFieldID);this.previousPassword=a!=null&&a.value!=null?a.value:""},_logBrowserPrefill:function(a,c){var d=null;c===b("BrowserPrefillType").CONTACT_POINT&&(d=this.previousContactpoint);a!==b("BrowserPrefillSource").SERVER_PREFILL&&this.updatePrefill(d,a,c);b("BanzaiLogger").create({signal:!0}).log("LoginEventsLoggerConfig",{event:b("LoginEvent").BROWSER_AUTOCOMPLETE,prefill_contact_point:d,prefill_source:a,prefill_type:c})}};e.exports=a}),null);
__d("BigPipePageletRootStatusLogger",["BanzaiODS"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=!1;a={init:function(a){__p&&__p();if(g===!0)return;g=!0;b("BanzaiODS").setEntitySample("bigpipe.pagelet_root_element",a);function c(a,c){b("BanzaiODS").bumpEntityKey("bigpipe.pagelet_root_element",c+"."+a)}a=window.__logBigPipePageletRootStatus;window.__logBigPipePageletRootStatus=c;if(a!=null&&typeof a.getLogs==="function"){a=a.getLogs();a.forEach(function(a){var b=a[0];a=a[1];return c(b,a)})}}};e.exports=a}),null);
__d("ServiceWorkerLoginAndLogout",["ClientServiceWorkerMessage"],(function(a,b,c,d,e,f){function g(a){new(b("ClientServiceWorkerMessage"))(a,null).sendViaController()}a={login:function(){g("login")},logout:function(){g("logout")}};e.exports=a}),null);