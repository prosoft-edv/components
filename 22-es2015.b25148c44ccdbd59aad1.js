(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"0S3s":function(t,e,r){"use strict";r.d(e,"b",(function(){return c})),r.d(e,"d",(function(){return h})),r.d(e,"a",(function(){return d})),r.d(e,"c",(function(){return f}));var s=r("WT5v"),n=r("kZht"),a=r("ApNh");class o{constructor(t){this._elementRef=t}}const i=Object(a.C)(o,"primary"),d=new n.o("mat-progress-spinner-default-options",{providedIn:"root",factory:function(){return{diameter:100}}});let c=(()=>{class t extends i{constructor(e,r,s,n,a){super(e),this._elementRef=e,this._document=s,this._diameter=100,this._value=0,this._fallbackAnimation=!1,this.mode="determinate";const o=t._diameters;o.has(s.head)||o.set(s.head,new Set([100])),this._fallbackAnimation=r.EDGE||r.TRIDENT,this._noopAnimations="NoopAnimations"===n&&!!a&&!a._forceAnimations,a&&(a.diameter&&(this.diameter=a.diameter),a.strokeWidth&&(this.strokeWidth=a.strokeWidth))}get diameter(){return this._diameter}set diameter(t){this._diameter=Object(s.f)(t),!this._fallbackAnimation&&this._styleRoot&&this._attachStyleNode()}get strokeWidth(){return this._strokeWidth||this.diameter/10}set strokeWidth(t){this._strokeWidth=Object(s.f)(t)}get value(){return"determinate"===this.mode?this._value:0}set value(t){this._value=Math.max(0,Math.min(100,Object(s.f)(t)))}ngOnInit(){const t=this._elementRef.nativeElement;this._styleRoot=function(t,e){if("undefined"!=typeof window){const r=e.head;if(r&&(r.createShadowRoot||r.attachShadow)){const e=t.getRootNode?t.getRootNode():null;if(e instanceof window.ShadowRoot)return e}}return null}(t,this._document)||this._document.head,this._attachStyleNode(),t.classList.add(`mat-progress-spinner-indeterminate${this._fallbackAnimation?"-fallback":""}-animation`)}get _circleRadius(){return(this.diameter-10)/2}get _viewBox(){const t=2*this._circleRadius+this.strokeWidth;return`0 0 ${t} ${t}`}get _strokeCircumference(){return 2*Math.PI*this._circleRadius}get _strokeDashOffset(){return"determinate"===this.mode?this._strokeCircumference*(100-this._value)/100:this._fallbackAnimation&&"indeterminate"===this.mode?.2*this._strokeCircumference:null}get _circleStrokeWidth(){return this.strokeWidth/this.diameter*100}_attachStyleNode(){const e=this._styleRoot,r=this._diameter,s=t._diameters;let n=s.get(e);if(!n||!n.has(r)){const t=this._document.createElement("style");t.setAttribute("mat-spinner-animation",r+""),t.textContent=this._getAnimationText(),e.appendChild(t),n||(n=new Set,s.set(e,n)),n.add(r)}}_getAnimationText(){return"\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n".replace(/START_VALUE/g,`${.95*this._strokeCircumference}`).replace(/END_VALUE/g,`${.2*this._strokeCircumference}`).replace(/DIAMETER/g,`${this.diameter}`)}}return t._diameters=new WeakMap,t})();class h extends c{constructor(t,e,r,s,n){super(t,e,r,s,n),this.mode="indeterminate"}}class f{}},HIvD:function(t,e,r){"use strict";r.r(e);var s=r("kZht");class n{}var a=r("pLqg"),o=r("C9Ky");class i{}var d=s.pb({encapsulation:2,styles:[],data:{}});function c(t){return s.Nb(0,[(t()(),s.Lb(-1,null,["home\n"]))],null,null)}function h(t){return s.Nb(0,[(t()(),s.rb(0,0,null,null,1,"app-start-page",[],null,null,null,c,d)),s.qb(1,49152,null,0,i,[],null,null)],null,null)}var f=s.nb("app-start-page",i,h,{},{},[]),u=r("An66"),l=r("3kIJ"),m=r("D4FV"),b=r("pOQZ"),_=r("OcC5"),g=r("5ohT"),k=r("zab8"),B=r("ENSU"),A=r("ApNh"),p=r("DiCn"),E=r("4rR8"),R=r("tBgR"),T=r("qBwE"),N=r("owzC"),S=r("8JnZ"),w=r("1PzT"),v=r("a+5/"),L=r("9Z2Q"),V=r("S/D4"),U=r("0S3s"),D=r("PWeN"),y=r("7V4E"),W=r("vv7Z"),C=r("1VvW");r.d(e,"StartPageModuleNgFactory",(function(){return x}));var x=s.ob(n,[],(function(t){return s.Ab([s.Bb(512,s.j,s.Z,[[8,[a.a,o.a,f]],[3,s.j],s.v]),s.Bb(4608,u.o,u.n,[s.s,[2,u.G]]),s.Bb(4608,l.y,l.y,[]),s.Bb(4608,l.f,l.f,[]),s.Bb(4608,m.c,m.c,[m.i,m.e,s.j,m.h,m.f,s.p,s.x,u.d,b.b,[2,u.i]]),s.Bb(5120,m.j,m.k,[m.c]),s.Bb(4608,_.c,_.c,[]),s.Bb(5120,g.a,g.b,[m.c]),s.Bb(5120,k.b,k.c,[m.c]),s.Bb(4608,B.e,A.e,[[2,A.i],[2,A.n]]),s.Bb(4608,A.d,A.d,[]),s.Bb(1073742336,u.c,u.c,[]),s.Bb(1073742336,l.x,l.x,[]),s.Bb(1073742336,l.l,l.l,[]),s.Bb(1073742336,l.u,l.u,[]),s.Bb(1073742336,b.a,b.a,[]),s.Bb(1073742336,p.c,p.c,[]),s.Bb(1073742336,E.b,E.b,[]),s.Bb(1073742336,R.c,R.c,[]),s.Bb(1073742336,m.g,m.g,[]),s.Bb(1073742336,A.n,A.n,[[2,A.f],[2,B.f]]),s.Bb(1073742336,A.w,A.w,[]),s.Bb(1073742336,A.u,A.u,[]),s.Bb(1073742336,A.s,A.s,[]),s.Bb(1073742336,_.d,_.d,[]),s.Bb(1073742336,T.e,T.e,[]),s.Bb(1073742336,g.d,g.d,[]),s.Bb(1073742336,N.a,N.a,[]),s.Bb(1073742336,k.e,k.e,[]),s.Bb(1073742336,S.c,S.c,[]),s.Bb(1073742336,w.d,w.d,[]),s.Bb(1073742336,w.c,w.c,[]),s.Bb(1073742336,v.c,v.c,[]),s.Bb(1073742336,L.c,L.c,[]),s.Bb(1073742336,V.b,V.b,[]),s.Bb(1073742336,U.c,U.c,[]),s.Bb(1073742336,D.b,D.b,[]),s.Bb(1073742336,y.b,y.b,[]),s.Bb(1073742336,W.a,W.a,[]),s.Bb(1073742336,C.m,C.m,[[2,C.r],[2,C.k]]),s.Bb(1073742336,n,n,[]),s.Bb(1024,C.i,(function(){return[[{path:"",component:i}]]}),[])])}))}}]);