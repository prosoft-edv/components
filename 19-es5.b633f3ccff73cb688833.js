!function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function n(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var r,n=i(e);if(t){var a=i(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return o(this,r)}}function o(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{Xa2L:function(r,o,i){"use strict";i.d(o,"a",function(){return w}),i.d(o,"b",function(){return y});var s=i("fXoL"),c=i("ofXK"),d=i("FKr1"),f=i("8LU1"),l=i("nLfN"),m=i("R1ws");function p(e,t){if(1&e&&(s.ec(),s.Pb(0,"circle",3)),2&e){var r=s.fc();s.vc("animation-name","mat-progress-spinner-stroke-rotate-"+r._spinnerAnimationLabel)("stroke-dashoffset",r._getStrokeDashOffset(),"px")("stroke-dasharray",r._getStrokeCircumference(),"px")("stroke-width",r._getCircleStrokeWidth(),"%"),s.Db("r",r._getCircleRadius())}}function h(e,t){if(1&e&&(s.ec(),s.Pb(0,"circle",3)),2&e){var r=s.fc();s.vc("stroke-dashoffset",r._getStrokeDashOffset(),"px")("stroke-dasharray",r._getStrokeCircumference(),"px")("stroke-width",r._getCircleStrokeWidth(),"%"),s.Db("r",r._getCircleRadius())}}function b(e,t){if(1&e&&(s.ec(),s.Pb(0,"circle",3)),2&e){var r=s.fc();s.vc("animation-name","mat-progress-spinner-stroke-rotate-"+r._spinnerAnimationLabel)("stroke-dashoffset",r._getStrokeDashOffset(),"px")("stroke-dasharray",r._getStrokeCircumference(),"px")("stroke-width",r._getCircleStrokeWidth(),"%"),s.Db("r",r._getCircleRadius())}}function u(e,t){if(1&e&&(s.ec(),s.Pb(0,"circle",3)),2&e){var r=s.fc();s.vc("stroke-dashoffset",r._getStrokeDashOffset(),"px")("stroke-dasharray",r._getStrokeCircumference(),"px")("stroke-width",r._getCircleStrokeWidth(),"%"),s.Db("r",r._getCircleRadius())}}var g=".mat-progress-spinner{display:block;position:relative;overflow:hidden}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:currentColor}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] svg{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] svg{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] svg{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] svg{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n",k=Object(d.s)(function e(t){a(this,e),this._elementRef=t},"primary"),_=new s.s("mat-progress-spinner-default-options",{providedIn:"root",factory:function(){return{diameter:100}}}),v=function(){var r=function(r){t(d,r);var o,i,s,c=n(d);function d(e,t,r,n,o){var i;a(this,d),(i=c.call(this,e))._elementRef=e,i._document=r,i._diameter=100,i._value=0,i._fallbackAnimation=!1,i.mode="determinate";var s=d._diameters;return i._spinnerAnimationLabel=i._getSpinnerAnimationLabel(),s.has(r.head)||s.set(r.head,new Set([100])),i._fallbackAnimation=t.EDGE||t.TRIDENT,i._noopAnimations="NoopAnimations"===n&&!!o&&!o._forceAnimations,o&&(o.diameter&&(i.diameter=o.diameter),o.strokeWidth&&(i.strokeWidth=o.strokeWidth)),i}return o=d,(i=[{key:"diameter",get:function(){return this._diameter},set:function(e){this._diameter=Object(f.f)(e),this._spinnerAnimationLabel=this._getSpinnerAnimationLabel(),!this._fallbackAnimation&&this._styleRoot&&this._attachStyleNode()}},{key:"strokeWidth",get:function(){return this._strokeWidth||this.diameter/10},set:function(e){this._strokeWidth=Object(f.f)(e)}},{key:"value",get:function(){return"determinate"===this.mode?this._value:0},set:function(e){this._value=Math.max(0,Math.min(100,Object(f.f)(e)))}},{key:"ngOnInit",value:function(){var e=this._elementRef.nativeElement;this._styleRoot=Object(l.c)(e)||this._document.head,this._attachStyleNode(),e.classList.add("mat-progress-spinner-indeterminate".concat(this._fallbackAnimation?"-fallback":"","-animation"))}},{key:"_getCircleRadius",value:function(){return(this.diameter-10)/2}},{key:"_getViewBox",value:function(){var e=2*this._getCircleRadius()+this.strokeWidth;return"0 0 ".concat(e," ").concat(e)}},{key:"_getStrokeCircumference",value:function(){return 2*Math.PI*this._getCircleRadius()}},{key:"_getStrokeDashOffset",value:function(){return"determinate"===this.mode?this._getStrokeCircumference()*(100-this._value)/100:this._fallbackAnimation&&"indeterminate"===this.mode?.2*this._getStrokeCircumference():null}},{key:"_getCircleStrokeWidth",value:function(){return this.strokeWidth/this.diameter*100}},{key:"_attachStyleNode",value:function(){var e=this._styleRoot,t=this._diameter,r=d._diameters,n=r.get(e);if(!n||!n.has(t)){var o=this._document.createElement("style");o.setAttribute("mat-spinner-animation",this._spinnerAnimationLabel),o.textContent=this._getAnimationText(),e.appendChild(o),n||(n=new Set,r.set(e,n)),n.add(t)}}},{key:"_getAnimationText",value:function(){var e=this._getStrokeCircumference();return"\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n".replace(/START_VALUE/g,""+.95*e).replace(/END_VALUE/g,""+.2*e).replace(/DIAMETER/g,"".concat(this._spinnerAnimationLabel))}},{key:"_getSpinnerAnimationLabel",value:function(){return this.diameter.toString().replace(".","_")}}])&&e(o.prototype,i),s&&e(o,s),d}(k);return r.\u0275fac=function(e){return new(e||r)(s.Ob(s.l),s.Ob(l.a),s.Ob(c.d,8),s.Ob(m.a,8),s.Ob(_))},r.\u0275cmp=s.Ib({type:r,selectors:[["mat-progress-spinner"]],hostAttrs:["role","progressbar",1,"mat-progress-spinner"],hostVars:10,hostBindings:function(e,t){2&e&&(s.Db("aria-valuemin","determinate"===t.mode?0:null)("aria-valuemax","determinate"===t.mode?100:null)("aria-valuenow","determinate"===t.mode?t.value:null)("mode",t.mode),s.vc("width",t.diameter,"px")("height",t.diameter,"px"),s.Gb("_mat-animation-noopable",t._noopAnimations))},inputs:{color:"color",mode:"mode",diameter:"diameter",strokeWidth:"strokeWidth",value:"value"},exportAs:["matProgressSpinner"],features:[s.zb],decls:3,vars:8,consts:[["preserveAspectRatio","xMidYMid meet","focusable","false",3,"ngSwitch"],["cx","50%","cy","50%",3,"animation-name","stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%",3,"stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%"]],template:function(e,t){1&e&&(s.ec(),s.Ub(0,"svg",0),s.yc(1,p,1,9,"circle",1),s.yc(2,h,1,7,"circle",2),s.Tb()),2&e&&(s.vc("width",t.diameter,"px")("height",t.diameter,"px"),s.lc("ngSwitch","indeterminate"===t.mode),s.Db("viewBox",t._getViewBox()),s.Cb(1),s.lc("ngSwitchCase",!0),s.Cb(1),s.lc("ngSwitchCase",!1))},directives:[c.o,c.p],styles:[g],encapsulation:2,changeDetection:0}),r._diameters=new WeakMap,r}(),y=function(){var e=function(e){t(o,e);var r=n(o);function o(e,t,n,i,s){var c;return a(this,o),(c=r.call(this,e,t,n,i,s)).mode="indeterminate",c}return o}(v);return e.\u0275fac=function(t){return new(t||e)(s.Ob(s.l),s.Ob(l.a),s.Ob(c.d,8),s.Ob(m.a,8),s.Ob(_))},e.\u0275cmp=s.Ib({type:e,selectors:[["mat-spinner"]],hostAttrs:["role","progressbar","mode","indeterminate",1,"mat-spinner","mat-progress-spinner"],hostVars:6,hostBindings:function(e,t){2&e&&(s.vc("width",t.diameter,"px")("height",t.diameter,"px"),s.Gb("_mat-animation-noopable",t._noopAnimations))},inputs:{color:"color"},features:[s.zb],decls:3,vars:8,consts:[["preserveAspectRatio","xMidYMid meet","focusable","false",3,"ngSwitch"],["cx","50%","cy","50%",3,"animation-name","stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%",3,"stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%"]],template:function(e,t){1&e&&(s.ec(),s.Ub(0,"svg",0),s.yc(1,b,1,9,"circle",1),s.yc(2,u,1,7,"circle",2),s.Tb()),2&e&&(s.vc("width",t.diameter,"px")("height",t.diameter,"px"),s.lc("ngSwitch","indeterminate"===t.mode),s.Db("viewBox",t._getViewBox()),s.Cb(1),s.lc("ngSwitchCase",!0),s.Cb(1),s.lc("ngSwitchCase",!1))},directives:[c.o,c.p],styles:[g],encapsulation:2,changeDetection:0}),e}(),w=function(){var e=function e(){a(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.Mb({type:e}),e.\u0275inj=s.Lb({imports:[[d.g,c.c],d.g]}),e}()},w7TG:function(e,t,r){"use strict";r.r(t),r.d(t,"BlockUiDemoModule",function(){return k});var n,o,i=r("ofXK"),s=r("3Pt+"),c=r("bTqV"),d=r("Wp6s"),f=r("bSwM"),l=r("kmnG"),m=r("qFsG"),p=r("tyNb"),h=r("LnVl"),b=r("fXoL"),u=r("hG+b"),g=((o=function e(){a(this,e),this.blocked=!0,this.spinnerText="some custom text that will be displayed while the view is blocked"}).\u0275fac=function(e){return new(e||o)},o.\u0275cmp=b.Ib({type:o,selectors:[["app-block-ui-demo"]],decls:41,vars:14,consts:[[3,"ngModel","ngModelChange"],[2,"display","block"],["type","text","matInput","",3,"ngModel","ngModelChange"],[2,"height","1em"],[3,"blocked","clickthrough"],["type","button","mat-raised-button","","color","primary"],[3,"blocked"],[2,"height","50px","overflow","auto"],[2,"height","50px"],[3,"blocked","spinnerText"],[2,"height","30vh"],[2,"height","300vh"],[2,"height","100vh"]],template:function(e,t){1&e&&(b.Ub(0,"mat-checkbox",0),b.bc("ngModelChange",function(e){return t.blocked=e}),b.Ac(1,"blocked"),b.Tb(),b.Ub(2,"mat-form-field",1),b.Ub(3,"mat-label"),b.Ac(4,"Text for the block ui"),b.Tb(),b.Ub(5,"input",2),b.bc("ngModelChange",function(e){return t.spinnerText=e}),b.Tb(),b.Tb(),b.Pb(6,"div",3),b.Ub(7,"ps-block-ui",4),b.Ub(8,"div"),b.Ac(9,"this block-ui is clickthrough"),b.Tb(),b.Ub(10,"button",5),b.Ac(11,"clickable"),b.Tb(),b.Tb(),b.Pb(12,"div",3),b.Ub(13,"ps-block-ui",6),b.Ub(14,"div"),b.Ac(15,"this block-ui is NOT clickthrough"),b.Tb(),b.Ub(16,"button",5),b.Ac(17,"NOT clickable while blocked"),b.Tb(),b.Tb(),b.Pb(18,"div",3),b.Ub(19,"div",7),b.Ub(20,"ps-block-ui",6),b.Ub(21,"div",8),b.Ac(22," this box with overflow auto will be blocked without flickering "),b.Tb(),b.Tb(),b.Tb(),b.Pb(23,"div",3),b.Ub(24,"div",7),b.Ub(25,"ps-block-ui",9),b.Ub(26,"div",8),b.Ac(27," this box with overflow auto will be blocked without flickering "),b.Tb(),b.Tb(),b.Tb(),b.Pb(28,"div",3),b.Ub(29,"ps-block-ui",9),b.Ub(30,"mat-card"),b.Ac(31," this will be blocked "),b.Tb(),b.Tb(),b.Pb(32,"div",3),b.Ub(33,"ps-block-ui",9),b.Ub(34,"mat-card",10),b.Ac(35," this will also be blocked "),b.Tb(),b.Tb(),b.Pb(36,"div",3),b.Ub(37,"ps-block-ui",9),b.Ub(38,"mat-card",11),b.Ac(39," this will also be blocked to show position sticky "),b.Tb(),b.Tb(),b.Pb(40,"div",12)),2&e&&(b.lc("ngModel",t.blocked),b.Cb(5),b.lc("ngModel",t.spinnerText),b.Cb(2),b.lc("blocked",t.blocked)("clickthrough",!0),b.Cb(6),b.lc("blocked",t.blocked),b.Cb(7),b.lc("blocked",t.blocked),b.Cb(5),b.lc("blocked",t.blocked)("spinnerText",t.spinnerText),b.Cb(4),b.lc("blocked",t.blocked)("spinnerText",t.spinnerText),b.Cb(4),b.lc("blocked",t.blocked)("spinnerText",t.spinnerText),b.Cb(4),b.lc("blocked",t.blocked)("spinnerText",t.spinnerText))},directives:[f.a,s.n,s.q,l.d,l.h,m.a,s.c,u.a,c.a,d.a],styles:["\n      app-block-ui-demo .mat-card {\n        background-color: #ccc;\n      }\n    "],encapsulation:2,changeDetection:0}),o),k=((n=function e(){a(this,e)}).\u0275fac=function(e){return new(e||n)},n.\u0275mod=b.Mb({type:n}),n.\u0275inj=b.Lb({providers:[],imports:[[i.c,h.a,p.d.forChild([{path:"",component:g}]),s.j,d.e,m.b,l.f,f.b,c.b]]}),n)}}])}();