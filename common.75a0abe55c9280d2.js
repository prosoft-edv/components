"use strict";(self.webpackChunkprosoft_components_demo=self.webpackChunkprosoft_components_demo||[]).push([[592],{903:(g,m,e)=>{e.d(m,{x:()=>f});var t=e(3668),n=e(6019),_=e(7964);const i=["content"];function a(c,o){if(1&c&&(t.TgZ(0,"div"),t._uU(1),t.qZA()),2&c){const s=t.oxw(2);t.xp6(1),t.Oqu(s.spinnerText)}}function l(c,o){if(1&c&&(t.ynx(0),t.TgZ(1,"div",3),t.TgZ(2,"div",4),t.TgZ(3,"div",5),t._UZ(4,"mat-spinner",6),t.qZA(),t.YNc(5,a,2,1,"div",2),t.qZA(),t.qZA(),t.BQk()),2&c){const s=t.oxw();t.xp6(4),t.Q6J("diameter",s.spinnerDiameter),t.xp6(1),t.Q6J("ngIf",s.spinnerText)}}const d=["*"];let f=(()=>{class c{constructor(){this.clickthrough=!1,this.spinnerDiameter=100}ngOnChanges(){this.blocked&&this.updateSpinner()}ngAfterViewInit(){this.updateSpinner()}updateSpinner(){const s=this.contentNode.nativeElement,r=Math.min(s.offsetWidth,s.offsetHeight);this.spinnerDiameter=Math.max(Math.min(r-(this.spinnerText?20:0),100),10)}}return c.\u0275fac=function(s){return new(s||c)},c.\u0275cmp=t.Xpm({type:c,selectors:[["ps-block-ui"]],viewQuery:function(s,r){if(1&s&&t.Gf(i,7),2&s){let p;t.iGM(p=t.CRH())&&(r.contentNode=p.first)}},hostVars:2,hostBindings:function(s,r){2&s&&t.ekj("ps-block-ui__clickthrough",r.clickthrough)},inputs:{blocked:"blocked",spinnerText:"spinnerText",clickthrough:"clickthrough"},features:[t.TTD],ngContentSelectors:d,decls:4,vars:1,consts:[[1,"ps-block-ui__content"],["content",""],[4,"ngIf"],[1,"ps-block-ui__overlay"],[1,"ps-block-ui__overlay-content"],[1,"ps-block-ui__spinner-container"],[1,"ps-block-ui__spinner",3,"diameter"]],template:function(s,r){1&s&&(t.F$t(),t.TgZ(0,"div",0,1),t.Hsn(2),t.qZA(),t.YNc(3,l,6,2,"ng-container",2)),2&s&&(t.xp6(3),t.Q6J("ngIf",r.blocked))},directives:[n.O5,_.$g],styles:["ps-block-ui{display:grid;position:relative}.ps-block-ui__clickthrough{pointer-events:none}.ps-block-ui__clickthrough>.ps-block-ui__content{pointer-events:auto}.ps-block-ui__content{grid-column:1;grid-row:1}.ps-block-ui__overlay{grid-column:1;grid-row:1;z-index:2;background-color:#f4f4f499;display:flex;justify-content:center;align-items:center}.ps-block-ui__spinner-container{overflow:hidden}.ps-block-ui__spinner{display:inline-block;margin:auto;color:var(--ps-primary);opacity:1}.ps-block-ui__overlay-content{text-align:center;position:-webkit-sticky;position:sticky;top:10%;bottom:10%}\n"],encapsulation:2,changeDetection:0}),c})()},1488:(g,m,e)=>{e.d(m,{O:()=>i});var t=e(6019),n=e(7964),_=e(3668);let i=(()=>{class a{}return a.\u0275fac=function(d){return new(d||a)},a.\u0275mod=_.oAB({type:a}),a.\u0275inj=_.cJS({imports:[[t.ez,n.Cq]]}),a})()},5021:(g,m,e)=>{e.d(m,{H:()=>c});var t=e(9814),n=e(3668),_=e(4082),i=e(6019);const a=["frontside"],l=["backside"];function d(o,s){if(1&o&&n.GkF(0,7),2&o){const r=n.oxw();n.Q6J("ngTemplateOutlet",r._frontTemplate)}}function f(o,s){if(1&o&&n.GkF(0,7),2&o){const r=n.oxw();n.Q6J("ngTemplateOutlet",r._backTemplate)}}let c=(()=>{class o{constructor(r){this.cd=r,this.removeHiddenNodes=!0,this.animation="flip",this._frontTemplate=null,this._backTemplate=null,this._active="front",this._attachFront=!0,this._attachBack=!1}get active(){return this._active}get _activeState(){return this.animation+"_"+this.active}ngAfterViewInit(){this._backside.nativeElement.hidden=!0}showFront(){this.show("front")}showBack(){this.show("back")}show(r){this._active!==r&&(this._active=r,this.cd.markForCheck())}toggleFlip(){this.show("front"===this._active?"back":"front")}_flipStart(){"back"===this._active?(this._backside.nativeElement.hidden=!1,this._attachBack=!0):(this._frontside.nativeElement.hidden=!1,this._attachFront=!0),this.cd.markForCheck()}_flipDone(){"back"===this._active?(this._frontside.nativeElement.hidden=!0,this._attachFront=!1):(this._backside.nativeElement.hidden=!0,this._attachBack=!1),this.cd.markForCheck()}}return o.\u0275fac=function(r){return new(r||o)(n.Y36(n.sBO))},o.\u0275cmp=n.Xpm({type:o,selectors:[["ps-flip-container"]],contentQueries:function(r,p,u){if(1&r&&(n.Suo(u,_.R,5,n.Rgc),n.Suo(u,_.t,5,n.Rgc)),2&r){let h;n.iGM(h=n.CRH())&&(p._frontTemplate=h.first),n.iGM(h=n.CRH())&&(p._backTemplate=h.first)}},viewQuery:function(r,p){if(1&r&&(n.Gf(a,7),n.Gf(l,7)),2&r){let u;n.iGM(u=n.CRH())&&(p._frontside=u.first),n.iGM(u=n.CRH())&&(p._backside=u.first)}},inputs:{removeHiddenNodes:"removeHiddenNodes",animation:"animation"},decls:8,vars:5,consts:[[1,"ps-flip-container__container"],[1,"ps-flip-container__flip-box"],[1,"ps-flip-container__side","ps-flip-container__side__front"],["frontside",""],[3,"ngTemplateOutlet",4,"ngIf"],[1,"ps-flip-container__side","ps-flip-container__side__back"],["backside",""],[3,"ngTemplateOutlet"]],template:function(r,p){1&r&&(n.TgZ(0,"div",0),n.TgZ(1,"div",1),n.NdJ("@flipState.start",function(){return p._flipStart()})("@flipState.done",function(){return p._flipDone()}),n.TgZ(2,"div",2,3),n.YNc(4,d,1,1,"ng-container",4),n.qZA(),n.TgZ(5,"div",5,6),n.YNc(7,f,1,1,"ng-container",4),n.qZA(),n.qZA(),n.qZA()),2&r&&(n.Tol("ps-flip-container__animation-"+p.animation),n.xp6(1),n.Q6J("@flipState",p._activeState),n.xp6(3),n.Q6J("ngIf",p._attachFront||!p.removeHiddenNodes),n.xp6(3),n.Q6J("ngIf",p._attachBack||!p.removeHiddenNodes))},directives:[i.O5,i.tP],styles:['.ps-flip-container__flip-box[_ngcontent-%COMP%]{display:grid;grid-template-areas:"content"}.ps-flip-container__side[_ngcontent-%COMP%]{grid-area:content}.ps-flip-container__animation-flip.ps-flip-container__container[_ngcontent-%COMP%]{perspective:100%}.ps-flip-container__animation-flip[_ngcontent-%COMP%]   .ps-flip-container__flip-box[_ngcontent-%COMP%]{position:relative;transform-style:preserve-3d}.ps-flip-container__animation-flip[_ngcontent-%COMP%]   .ps-flip-container__side[_ngcontent-%COMP%]{-webkit-backface-visibility:hidden;backface-visibility:hidden}.ps-flip-container__animation-flip[_ngcontent-%COMP%]   .ps-flip-container__side__back[_ngcontent-%COMP%]{transform:rotateY(180deg)}.ps-flip-container__animation-flip[_ngcontent-%COMP%]   .ps-flip-container__side__front[_ngcontent-%COMP%]{transform:rotateY(0)}.ps-flip-container__animation-fade[_ngcontent-%COMP%]   .ps-flip-container__side__front[_ngcontent-%COMP%]{z-index:1}'],data:{animation:[(0,t.X$)("flipState",[(0,t.SB)("flip_back",(0,t.oB)({transform:"rotateY(180deg)"})),(0,t.SB)("flip_front",(0,t.oB)({transform:"rotateY(0)"})),(0,t.eR)("flip_back => flip_front",(0,t.jt)("300ms ease-out")),(0,t.eR)("flip_front => flip_back",(0,t.jt)("300ms ease-in")),(0,t.eR)("fade_front => fade_back",(0,t.vP)([(0,t.IO)(".ps-flip-container__side__back",(0,t.oB)({opacity:0})),(0,t.IO)(".ps-flip-container__side__front",(0,t.jt)("150ms ease-in",(0,t.oB)({opacity:0}))),(0,t.IO)(".ps-flip-container__side__back",(0,t.jt)("150ms ease-out",(0,t.oB)({opacity:1})))])),(0,t.eR)("fade_back => fade_front",(0,t.vP)([(0,t.IO)(".ps-flip-container__side__front",(0,t.oB)({opacity:0})),(0,t.IO)(".ps-flip-container__side__back",(0,t.jt)("150ms ease-in",(0,t.oB)({opacity:0}))),(0,t.IO)(".ps-flip-container__side__front",(0,t.jt)("150ms ease-out",(0,t.oB)({opacity:1})))]))])]},changeDetection:0}),o})()},4082:(g,m,e)=>{e.d(m,{R:()=>n,t:()=>_});var t=e(3668);let n=(()=>{class i{constructor(l){this.el=l}}return i.\u0275fac=function(l){return new(l||i)(t.Y36(t.SBq))},i.\u0275dir=t.lG2({type:i,selectors:[["","psFlipContainerFront",""]]}),i})(),_=(()=>{class i{constructor(l){this.el=l}}return i.\u0275fac=function(l){return new(l||i)(t.Y36(t.SBq))},i.\u0275dir=t.lG2({type:i,selectors:[["","psFlipContainerBack",""]]}),i})()},9307:(g,m,e)=>{e.d(m,{q:()=>_});var t=e(6019),n=e(3668);let _=(()=>{class i{}return i.\u0275fac=function(l){return new(l||i)},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({imports:[[t.ez]]}),i})()},8772:(g,m,e)=>{e.d(m,{M:()=>d});var t=e(3668),n=e(3367),_=e(6019),i=e(8621);function a(f,c){if(1&f&&(t.TgZ(0,"mat-chip",3),t._uU(1),t.qZA()),2&f){const o=c.$implicit;t.xp6(1),t.Oqu(o.errorText)}}function l(f,c){if(1&f&&(t.TgZ(0,"mat-chip-list",1),t.YNc(1,a,2,1,"mat-chip",2),t.qZA()),2&f){const o=c.ngIf;t.xp6(1),t.Q6J("ngForOf",o)}}let d=(()=>{class f{constructor(o){this.formErrorsService=o,this.includeControls=null}ngOnChanges(){this.errors$=this.formErrorsService.getFormErrors(this.form,this.includeControls)}}return f.\u0275fac=function(o){return new(o||f)(t.Y36(n.A))},f.\u0275cmp=t.Xpm({type:f,selectors:[["ps-form-errors"]],inputs:{form:"form",includeControls:"includeControls"},features:[t.TTD],decls:2,vars:3,consts:[["class","ps-form-errors__container",4,"ngIf"],[1,"ps-form-errors__container"],["class","ps-form-errors__item",4,"ngFor","ngForOf"],[1,"ps-form-errors__item"]],template:function(o,s){1&o&&(t.YNc(0,l,2,1,"mat-chip-list",0),t.ALo(1,"async")),2&o&&t.Q6J("ngIf",t.lcZ(1,1,s.errors$))},directives:[_.O5,i.qn,_.sg,i.HS],pipes:[_.Ov],styles:[".ps-form-errors__container{font-size:12px}.mat-chip.ps-form-errors__item{background-color:var(--ps-error);color:var(--ps-error-contrast)}\n"],encapsulation:2,changeDetection:0}),f})()},3684:(g,m,e)=>{e.d(m,{_:()=>l});var t=e(6019),n=e(86),_=e(888),i=e(5485),a=e(3668);let l=(()=>{class d{}return d.\u0275fac=function(c){return new(c||d)},d.\u0275mod=a.oAB({type:d}),d.\u0275inj=a.cJS({imports:[[t.ez,_.QW,n.ot,i.V]]}),d})()},4822:(g,m,e)=>{e.d(m,{l:()=>n});var t=e(3668);let n=(()=>{class _{isErrorState(a,l){return!(!a||!a.invalid)}}return _.\u0275fac=function(a){return new(a||_)},_.\u0275prov=t.Yz7({token:_,factory:_.\u0275fac}),_})()}}]);