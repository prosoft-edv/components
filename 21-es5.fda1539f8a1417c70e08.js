!function(){function t(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}function a(t,a){for(var n=0;n<a.length;n++){var i=a[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"J+BS":function(n,i,r){"use strict";r.r(i),r.d(i,"SavebarDemoModule",(function(){return y}));var o=r("2kYt"),e=r("nIj0"),c=r("Meci"),d=r("29Wa"),m=r("Cd2c"),s=r("sEIs"),u=r("XoY3"),l=r("/BkX"),p=r("/nyh"),f=r("EM62"),b=r("Ctw6"),h=r("/G61");function g(t,a){if(1&t){var n=f.Tb();f.Qb(0),f.Sb(1,"button",6),f.Zb("click",(function(){return f.qc(n),f.dc().onButtonClick("custom")})),f.Ac(2," Custom Button "),f.Rb(),f.Pb()}}var x,v=((x=function(){function n(){t(this,n),this.form=new e.h({input1:new e.e("a"),input2:new e.e("b")},[function(t){return t.value.input1===t.value.input2?null:{equal:"input1 and input2 must be equal"}}])}var i,r,o;return i=n,(r=[{key:"onButtonClick",value:function(t){alert(t+" button clicked")}}])&&a(i.prototype,r),o&&a(i,o),n}()).\u0275fac=function(t){return new(t||x)},x.\u0275cmp=f.Gb({type:x,selectors:[["app-savebar-demo"]],decls:13,vars:2,consts:[[3,"form","save","saveAndClose","cancel"],[3,"formGroup"],["type","text","matInput","","formControlName","input1"],[2,"height","100vh"],["type","text","matInput","","formControlName","input2"],[4,"psSavebarRightContent"],["mat-stroked-button","","type","button",3,"click"]],template:function(t,a){1&t&&(f.Sb(0,"ps-savebar",0),f.Zb("save",(function(){return a.onButtonClick("save")}))("saveAndClose",(function(){return a.onButtonClick("saveAndClose")}))("cancel",(function(){return a.onButtonClick("cancel")})),f.Sb(1,"mat-card"),f.Sb(2,"form",1),f.Sb(3,"mat-form-field"),f.Sb(4,"mat-label"),f.Ac(5,"Input 1"),f.Rb(),f.Nb(6,"input",2),f.Rb(),f.Nb(7,"div",3),f.Sb(8,"mat-form-field"),f.Sb(9,"mat-label"),f.Ac(10,"Input 2"),f.Rb(),f.Nb(11,"input",4),f.Rb(),f.Rb(),f.Rb(),f.yc(12,g,3,0,"ng-container",5),f.Rb()),2&t&&(f.jc("form",a.form),f.Ab(2),f.jc("formGroup",a.form))},directives:[b.a,c.a,e.v,e.o,e.i,d.d,d.h,m.a,e.c,e.n,e.g,h.a],encapsulation:2,changeDetection:0}),x);r("89kn");var w,y=((w=function a(){t(this,a)}).\u0275mod=f.Kb({type:w}),w.\u0275inj=f.Jb({factory:function(t){return new(t||w)},providers:[],imports:[[e.j,e.s,o.c,u.b.forRoot(p.a),l.a,s.d.forChild([{path:"",component:v}]),m.b,d.f,c.e]]}),w)},Meci:function(a,n,i){"use strict";i.d(n,"a",(function(){return l})),i.d(n,"b",(function(){return s})),i.d(n,"c",(function(){return m})),i.d(n,"d",(function(){return u})),i.d(n,"e",(function(){return p}));var r=i("5lCh"),o=i("mFH5"),e=i("EM62"),c=["*",[["mat-card-footer"]]],d=["*","mat-card-footer"],m=function(){var a=function a(){t(this,a)};return a.\u0275fac=function(t){return new(t||a)},a.\u0275dir=e.Hb({type:a,selectors:[["mat-card-content"],["","mat-card-content",""],["","matCardContent",""]],hostAttrs:[1,"mat-card-content"]}),a}(),s=function(){var a=function a(){t(this,a),this.align="start"};return a.\u0275fac=function(t){return new(t||a)},a.\u0275dir=e.Hb({type:a,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-card-actions"],hostVars:2,hostBindings:function(t,a){2&t&&e.Eb("mat-card-actions-align-end","end"===a.align)},inputs:{align:"align"},exportAs:["matCardActions"]}),a}(),u=function(){var a=function a(){t(this,a)};return a.\u0275fac=function(t){return new(t||a)},a.\u0275dir=e.Hb({type:a,selectors:[["mat-card-footer"]],hostAttrs:[1,"mat-card-footer"]}),a}(),l=function(){var a=function a(n){t(this,a),this._animationMode=n};return a.\u0275fac=function(t){return new(t||a)(e.Mb(r.a,8))},a.\u0275cmp=e.Gb({type:a,selectors:[["mat-card"]],hostAttrs:[1,"mat-card","mat-focus-indicator"],hostVars:2,hostBindings:function(t,a){2&t&&e.Eb("_mat-animation-noopable","NoopAnimations"===a._animationMode)},exportAs:["matCard"],ngContentSelectors:d,decls:2,vars:0,template:function(t,a){1&t&&(e.ic(c),e.hc(0),e.hc(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child,.mat-card-actions .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],encapsulation:2,changeDetection:0}),a}(),p=function(){var a=function a(){t(this,a)};return a.\u0275mod=e.Kb({type:a}),a.\u0275inj=e.Jb({factory:function(t){return new(t||a)},imports:[[o.h],o.h]}),a}()}}])}();