(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{PrpH:function(n,t,e){"use strict";e.d(t,"b",function(){return d}),e.d(t,"a",function(){return p});var r=e("3Pt+"),o=e("k842"),c=e("LRne"),i=e("VRyK"),a=e("lJxs"),s=e("eIep"),u=e("JX91"),l=e("Kj3r"),b=e("wQnL"),f=e("fXoL");let d=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275prov=f.Kb({token:n,factory:n.\u0275fac}),n})();class p extends d{constructor(){super(...arguments),this.options={debounceTime:100,includeControlsDefault:!1},this.tryDetectRequired=!0,this.getControlType=b.a}getControlErrors(n){return this.getErrors(n,!0,"control")}getFormErrors(n,t){return null==t&&(t=this.options.includeControlsDefault),this.getErrors(n,t,"form")}filterErrors(n,t,e){return Object(c.a)(n)}getErrors(n,t,e){return this.createUpdateTrigger(n).pipe(Object(a.a)(()=>this.getErrorInfo(n,t)),Object(s.a)(n=>this.filterErrors(n,t,e)),Object(s.a)(n=>this.mapDataToError(n)))}createUpdateTrigger(n){return Object(i.a)(n.valueChanges,n.statusChanges).pipe(Object(u.a)(null),Object(l.a)(this.options.debounceTime))}getErrorInfo(n,t=!1){return this.getControlErrorInfoInternal(n,"",t)}getControlErrorInfoInternal(n,t,e){const c=[];if(n instanceof r.h||n instanceof r.d)for(const o in n.controls){if(!n.controls.hasOwnProperty(o))continue;const i=n.controls[o];i instanceof r.e&&!e||c.push(...this.getControlErrorInfoInternal(i,t?t+"."+o:o,e))}return n.errors&&c.push(...Object(o.a)(n.errors).map(e=>this.createFormErrorData(e,n,t))),c}createFormErrorData(n,t,e){return{controlPath:e,errorKey:n.key,errorValue:n.value,isControl:t instanceof r.e}}}},k842:function(n,t,e){"use strict";function r(n){const t=[];for(const e in n)n.hasOwnProperty(e)&&t.push({key:e,value:n[e]});return t}function o(n,t,e){return n.split(t).join(e)}e.d(t,"a",function(){return r}),e.d(t,"b",function(){return o})},n6RY:function(n,t,e){"use strict";e.d(t,"a",function(){return c});var r=e("PrpH"),o=e("fXoL");let c=(()=>{class n{static forRoot(t){return{ngModule:n,providers:[{provide:r.b,useClass:t}]}}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.Mb({type:n}),n.\u0275inj=o.Lb({}),n})()},rE49:function(n,t,e){"use strict";e.r(t),e.d(t,"FlipContainerDemoModule",function(){return k});var r=e("3Pt+"),o=e("bSwM"),c=e("qFsG"),i=e("tyNb"),a=e("Pzd8"),s=e("tCYI"),u=e("dXiM"),l=e("BrW1"),b=e("fXoL"),f=e("DNCW"),d=e("jL59"),p=e("PdQy"),m=e("kmnG");function h(n,t){if(1&n){const n=b.Vb();b.Ub(0,"div",9),b.Ac(1," Front "),b.Ub(2,"button",10),b.bc("click",function(){b.sc(n);const t=b.fc();return t.counter=t.counter+1}),b.Ac(3,"increase count"),b.Tb(),b.Tb()}}function g(n,t){1&n&&(b.Ub(0,"div",9),b.Ac(1," Back "),b.Ub(2,"ps-form-field"),b.Ub(3,"mat-label"),b.Ac(4,"Some label text"),b.Tb(),b.Pb(5,"input",11),b.Tb(),b.Tb())}function v(n,t){if(1&n){const n=b.Vb();b.Ub(0,"div",9),b.Ac(1," Front "),b.Ub(2,"button",10),b.bc("click",function(){b.sc(n);const t=b.fc();return t.counter=t.counter+1}),b.Ac(3,"increase count"),b.Tb(),b.Tb()}}function C(n,t){1&n&&(b.Ub(0,"div",9),b.Ac(1," Back "),b.Ub(2,"ps-form-field"),b.Ub(3,"mat-label"),b.Ac(4,"Some label text"),b.Tb(),b.Pb(5,"input",11),b.Tb(),b.Tb())}let T=(()=>{class n{constructor(){this.counter=0,this.removeHiddenNodes=!0}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=b.Ib({type:n,selectors:[["app-flip-container-demo"]],decls:30,vars:5,consts:[[2,"display","flex","gap","1em"],[3,"ngModel","ngModelChange"],[1,"app-flip-container-demo__flip-container",3,"removeHiddenNodes"],["flip",""],["class","app-flip-container-demo__page-content",4,"psFlipContainerFront"],["class","app-flip-container-demo__page-content",4,"psFlipContainerBack"],[3,"click"],[1,"app-flip-container-demo__flip-container",3,"animation","removeHiddenNodes"],["fade",""],[1,"app-flip-container-demo__page-content"],[2,"cursor","pointer",3,"click"],["matInput","","type","text"]],template:function(n,t){if(1&n){const n=b.Vb();b.Ub(0,"h1"),b.Ac(1,"Flip Container Demo"),b.Tb(),b.Ub(2,"div",0),b.Ac(3),b.Ub(4,"mat-checkbox",1),b.bc("ngModelChange",function(n){return t.removeHiddenNodes=n}),b.Ac(5,"Remove invisible content from DOM"),b.Tb(),b.Tb(),b.Ub(6,"h2"),b.Ac(7,"Flip animation"),b.Tb(),b.Ub(8,"ps-flip-container",2,3),b.yc(10,h,4,0,"div",4),b.yc(11,g,6,0,"div",5),b.Tb(),b.Ub(12,"button",6),b.bc("click",function(){return b.sc(n),b.qc(9).toggleFlip()}),b.Ac(13,"toggle"),b.Tb(),b.Ub(14,"button",6),b.bc("click",function(){return b.sc(n),b.qc(9).showFront()}),b.Ac(15,"front"),b.Tb(),b.Ub(16,"button",6),b.bc("click",function(){return b.sc(n),b.qc(9).showBack()}),b.Ac(17,"back"),b.Tb(),b.Ub(18,"h2"),b.Ac(19,"Fade animation"),b.Tb(),b.Ub(20,"ps-flip-container",7,8),b.yc(22,v,4,0,"div",4),b.yc(23,C,6,0,"div",5),b.Tb(),b.Ub(24,"button",6),b.bc("click",function(){return b.sc(n),b.qc(21).toggleFlip()}),b.Ac(25,"toggle"),b.Tb(),b.Ub(26,"button",6),b.bc("click",function(){return b.sc(n),b.qc(21).showFront()}),b.Ac(27,"front"),b.Tb(),b.Ub(28,"button",6),b.bc("click",function(){return b.sc(n),b.qc(21).showBack()}),b.Ac(29,"back"),b.Tb()}2&n&&(b.Cb(3),b.Cc(" Counter: ",t.counter," "),b.Cb(1),b.lc("ngModel",t.removeHiddenNodes),b.Cb(4),b.lc("removeHiddenNodes",t.removeHiddenNodes),b.Cb(12),b.lc("animation","fade")("removeHiddenNodes",t.removeHiddenNodes))},directives:[o.a,r.n,r.q,f.a,d.b,d.a,p.a,m.h,c.a],styles:[".app-flip-container-demo__flip-container[_ngcontent-%COMP%] {\n        display: block;\n        max-width: 500px;\n      }\n      .app-flip-container-demo__page-content[_ngcontent-%COMP%] {\n        padding: 1em;\n        border: 3px solid black;\n      }"],changeDetection:0}),n})();e("n6RY");let k=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=b.Mb({type:n}),n.\u0275inj=b.Lb({providers:[],imports:[[r.j,o.b,c.b,a.b,s.b.forRoot(l.a),u.a,i.d.forChild([{path:"",component:T}])]]}),n})()},tCYI:function(n,t,e){"use strict";e.d(t,"b",function(){return r.a}),e.d(t,"a",function(){return o.a}),e.d(t,"c",function(){return o.b}),e.d(t,"d",function(){return c.b});var r=e("n6RY"),o=e("PrpH"),c=e("wQnL")},wQnL:function(n,t,e){"use strict";e.d(t,"b",function(){return o}),e.d(t,"a",function(){return c});var r=e("3Pt+");function o(n){if(n.validator){const t=n.validator({});if(t&&t.required)return!0}if(n instanceof r.h||n instanceof r.d){const t=n.controls;for(const n in t)if(t[n]&&o(t[n]))return!0}return!1}function c(n){const t=n.id||n.name;if(t){const n=t.split("-");return n[n.length-1].match(/[0-9]/)&&n.pop(),n.join("-")}return void 0!==n.step&&void 0!==n.thumbLabel?"mat-slider":null}}}]);