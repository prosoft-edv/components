(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{ULDu:function(t,e,n){"use strict";n.r(e);var l=n("kZht"),i=n("XoY3"),a=n("ROBh");class s extends i.a{getLabel(t){return t.psLabel?Object(a.a)(t.psLabel):null}mapDataToError(t){return Object(a.a)(t.map(t=>({errorText:`${t.controlPath} - ${t.errorKey} - ${JSON.stringify(t.errorValue)}`,data:t})))}}class r{}var o=n("C9Ky"),u=n("3kIJ"),h=n("2Ogy"),c=n("AZyY"),d=n("ulMw");class b{constructor(){this.form=new u.j({input1:new u.g("",[u.v.required,u.v.minLength(3),u.v.maxLength(5)]),input2:new u.g("",[u.v.required])},t=>t.value.input1!==t.value.input2?{equal:"must be equal"}:null)}}var _=l.pb({encapsulation:2,styles:[],data:{}});function p(t){return l.Nb(2,[(t()(),l.rb(0,0,null,null,1,"h1",[],null,null,null,null,null)),(t()(),l.Lb(-1,null,["Form Errors Demo"])),(t()(),l.rb(2,0,null,null,15,"div",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(t,e,n){var i=!0;return"submit"===e&&(i=!1!==l.Db(t,3).onSubmit(n)&&i),"reset"===e&&(i=!1!==l.Db(t,3).onReset()&&i),i},null,null)),l.qb(3,540672,null,0,u.k,[[8,null],[8,null]],{form:[0,"form"]},null),l.Ib(2048,null,u.c,null,[u.k]),l.qb(5,16384,null,0,u.q,[[4,u.c]],null,null),(t()(),l.rb(6,0,null,null,5,"input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(t,e,n){var i=!0;return"input"===e&&(i=!1!==l.Db(t,7)._handleInput(n.target.value)&&i),"blur"===e&&(i=!1!==l.Db(t,7).onTouched()&&i),"compositionstart"===e&&(i=!1!==l.Db(t,7)._compositionStart()&&i),"compositionend"===e&&(i=!1!==l.Db(t,7)._compositionEnd(n.target.value)&&i),i},null,null)),l.qb(7,16384,null,0,u.d,[l.C,l.k,[2,u.a]],null,null),l.Ib(1024,null,u.n,function(t){return[t]},[u.d]),l.qb(9,671744,null,0,u.i,[[3,u.c],[8,null],[8,null],[6,u.n],[2,u.y]],{name:[0,"name"]},null),l.Ib(2048,null,u.o,null,[u.i]),l.qb(11,16384,null,0,u.p,[[4,u.o]],null,null),(t()(),l.rb(12,0,null,null,5,"input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(t,e,n){var i=!0;return"input"===e&&(i=!1!==l.Db(t,13)._handleInput(n.target.value)&&i),"blur"===e&&(i=!1!==l.Db(t,13).onTouched()&&i),"compositionstart"===e&&(i=!1!==l.Db(t,13)._compositionStart()&&i),"compositionend"===e&&(i=!1!==l.Db(t,13)._compositionEnd(n.target.value)&&i),i},null,null)),l.qb(13,16384,null,0,u.d,[l.C,l.k,[2,u.a]],null,null),l.Ib(1024,null,u.n,function(t){return[t]},[u.d]),l.qb(15,671744,null,0,u.i,[[3,u.c],[8,null],[8,null],[6,u.n],[2,u.y]],{name:[0,"name"]},null),l.Ib(2048,null,u.o,null,[u.i]),l.qb(17,16384,null,0,u.p,[[4,u.o]],null,null),(t()(),l.Lb(-1,null,[" Errors:\n"])),(t()(),l.rb(19,0,null,null,1,"ps-form-errors",[],null,null,null,h.b,h.a)),l.qb(20,573440,null,0,c.a,[d.b],{form:[0,"form"]},null)],function(t,e){var n=e.component;t(e,3,0,n.form),t(e,9,0,"input1"),t(e,15,0,"input2"),t(e,20,0,n.form)},function(t,e){t(e,2,0,l.Db(e,5).ngClassUntouched,l.Db(e,5).ngClassTouched,l.Db(e,5).ngClassPristine,l.Db(e,5).ngClassDirty,l.Db(e,5).ngClassValid,l.Db(e,5).ngClassInvalid,l.Db(e,5).ngClassPending),t(e,6,0,l.Db(e,11).ngClassUntouched,l.Db(e,11).ngClassTouched,l.Db(e,11).ngClassPristine,l.Db(e,11).ngClassDirty,l.Db(e,11).ngClassValid,l.Db(e,11).ngClassInvalid,l.Db(e,11).ngClassPending),t(e,12,0,l.Db(e,17).ngClassUntouched,l.Db(e,17).ngClassTouched,l.Db(e,17).ngClassPristine,l.Db(e,17).ngClassDirty,l.Db(e,17).ngClassValid,l.Db(e,17).ngClassInvalid,l.Db(e,17).ngClassPending)})}function g(t){return l.Nb(0,[(t()(),l.rb(0,0,null,null,1,"app-form-errors-demo",[],null,null,null,p,_)),l.qb(1,49152,null,0,b,[],null,null)],null,null)}var f=l.nb("app-form-errors-demo",b,g,{},{},[]),m=n("An66"),C=n("ApNh"),y=n("89kn"),D=n("eEhu"),v=n("MQ2t"),L=n("1VvW"),w=n("K5Xz");n.d(e,"FormErrorsDemoModuleNgFactory",function(){return O});var O=l.ob(r,[],function(t){return l.Ab([l.Bb(512,l.j,l.Z,[[8,[o.a,f]],[3,l.j],l.v]),l.Bb(4608,u.f,u.f,[]),l.Bb(4608,u.x,u.x,[]),l.Bb(4608,m.o,m.n,[l.s,[2,m.E]]),l.Bb(4608,C.d,C.d,[]),l.Bb(4608,d.b,s,[]),l.Bb(1073742336,u.w,u.w,[]),l.Bb(1073742336,u.u,u.u,[]),l.Bb(1073742336,y.a,y.a,[]),l.Bb(1073742336,m.c,m.c,[]),l.Bb(1073742336,D.d,D.d,[]),l.Bb(1073742336,v.a,v.a,[]),l.Bb(1073742336,L.m,L.m,[[2,L.r],[2,L.k]]),l.Bb(1073742336,r,r,[]),l.Bb(256,D.a,{separatorKeyCodes:[w.f]},[]),l.Bb(1024,L.i,function(){return[[{path:"",component:b}]]},[])])})},qBwE:function(t,e,n){"use strict";n.d(e,"e",function(){return k}),n.d(e,"b",function(){return b}),n.d(e,"a",function(){return w}),n.d(e,"c",function(){return O}),n.d(e,"d",function(){return _}),n.d(e,"f",function(){return f}),n.d(e,"h",function(){return C}),n.d(e,"i",function(){return y}),n.d(e,"g",function(){return m});var l=n("kZht"),i=(n("+6xv"),n("WT5v")),a=n("ApNh"),s=n("ZTXN"),r=n("g6G6"),o=n("KTx3"),u=n("jIqt"),h=n("kuMc"),c=n("J+dc");let d=0,b=(()=>(class{constructor(){this.id=`mat-error-${d++}`}}))();class _{}function p(t){return Error(`A hint was already declared for 'align="${t}"'.`)}let g=0,f=(()=>(class{constructor(){this.align="start",this.id=`mat-hint-${g++}`}}))(),m=(()=>(class{}))(),C=(()=>(class{}))(),y=(()=>(class{}))(),D=0;class v{constructor(t){this._elementRef=t}}const L=Object(a.C)(v,"primary"),w=new l.o("MAT_FORM_FIELD_DEFAULT_OPTIONS");let O=(()=>(class extends L{constructor(t,e,n,l,i,a,r,o){super(t),this._elementRef=t,this._changeDetectorRef=e,this._dir=l,this._defaults=i,this._platform=a,this._ngZone=r,this._outlineGapCalculationNeededImmediately=!1,this._outlineGapCalculationNeededOnStable=!1,this._destroyed=new s.a,this._showAlwaysAnimate=!1,this._subscriptAnimationState="",this._hintLabel="",this._hintLabelId=`mat-hint-${D++}`,this._labelId=`mat-form-field-label-${D++}`,this._labelOptions=n||{},this.floatLabel=this._labelOptions.float||"auto",this._animationsEnabled="NoopAnimations"!==o,this.appearance=i&&i.appearance?i.appearance:"legacy"}get appearance(){return this._appearance}set appearance(t){const e=this._appearance;this._appearance=t||this._defaults&&this._defaults.appearance||"legacy","outline"===this._appearance&&e!==t&&(this._outlineGapCalculationNeededOnStable=!0)}get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(t){this._hideRequiredMarker=Object(i.c)(t)}get _shouldAlwaysFloat(){return"always"===this.floatLabel&&!this._showAlwaysAnimate}get _canLabelFloat(){return"never"!==this.floatLabel}get hintLabel(){return this._hintLabel}set hintLabel(t){this._hintLabel=t,this._processHints()}get floatLabel(){return"legacy"!==this.appearance&&"never"===this._floatLabel?"auto":this._floatLabel}set floatLabel(t){t!==this._floatLabel&&(this._floatLabel=t||this._labelOptions.float||"auto",this._changeDetectorRef.markForCheck())}get _control(){return this._explicitFormFieldControl||this._controlNonStatic||this._controlStatic}set _control(t){this._explicitFormFieldControl=t}get _labelChild(){return this._labelChildNonStatic||this._labelChildStatic}getConnectedOverlayOrigin(){return this._connectionContainerRef||this._elementRef}ngAfterContentInit(){this._validateControlChild();const t=this._control;t.controlType&&this._elementRef.nativeElement.classList.add(`mat-form-field-type-${t.controlType}`),t.stateChanges.pipe(Object(u.a)(null)).subscribe(()=>{this._validatePlaceholders(),this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),t.ngControl&&t.ngControl.valueChanges&&t.ngControl.valueChanges.pipe(Object(h.a)(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()),this._ngZone.runOutsideAngular(()=>{this._ngZone.onStable.asObservable().pipe(Object(h.a)(this._destroyed)).subscribe(()=>{this._outlineGapCalculationNeededOnStable&&this.updateOutlineGap()})}),Object(r.a)(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._outlineGapCalculationNeededOnStable=!0,this._changeDetectorRef.markForCheck()}),this._hintChildren.changes.pipe(Object(u.a)(null)).subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.pipe(Object(u.a)(null)).subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._dir&&this._dir.change.pipe(Object(h.a)(this._destroyed)).subscribe(()=>this.updateOutlineGap())}ngAfterContentChecked(){this._validateControlChild(),this._outlineGapCalculationNeededImmediately&&this.updateOutlineGap()}ngAfterViewInit(){this._subscriptAnimationState="enter",this._changeDetectorRef.detectChanges()}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}_shouldForward(t){const e=this._control?this._control.ngControl:null;return e&&e[t]}_hasPlaceholder(){return!!(this._control&&this._control.placeholder||this._placeholderChild)}_hasLabel(){return!!this._labelChild}_shouldLabelFloat(){return this._canLabelFloat&&(this._control.shouldLabelFloat||this._shouldAlwaysFloat)}_hideControlPlaceholder(){return"legacy"===this.appearance&&!this._hasLabel()||this._hasLabel()&&!this._shouldLabelFloat()}_hasFloatingLabel(){return this._hasLabel()||"legacy"===this.appearance&&this._hasPlaceholder()}_getDisplayedMessages(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_animateAndLockLabel(){this._hasFloatingLabel()&&this._canLabelFloat&&(this._animationsEnabled&&(this._showAlwaysAnimate=!0,Object(o.a)(this._label.nativeElement,"transitionend").pipe(Object(c.a)(1)).subscribe(()=>{this._showAlwaysAnimate=!1})),this.floatLabel="always",this._changeDetectorRef.markForCheck())}_validatePlaceholders(){if(this._control.placeholder&&this._placeholderChild)throw Error("Placeholder attribute and child element were both specified.")}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){if(this._hintChildren){let t,e;this._hintChildren.forEach(n=>{if("start"===n.align){if(t||this.hintLabel)throw p("start");t=n}else if("end"===n.align){if(e)throw p("end");e=n}})}}_syncDescribedByIds(){if(this._control){let t=[];if("hint"===this._getDisplayedMessages()){const e=this._hintChildren?this._hintChildren.find(t=>"start"===t.align):null,n=this._hintChildren?this._hintChildren.find(t=>"end"===t.align):null;e?t.push(e.id):this._hintLabel&&t.push(this._hintLabelId),n&&t.push(n.id)}else this._errorChildren&&(t=this._errorChildren.map(t=>t.id));this._control.setDescribedByIds(t)}}_validateControlChild(){if(!this._control)throw Error("mat-form-field must contain a MatFormFieldControl.")}updateOutlineGap(){const t=this._label?this._label.nativeElement:null;if("outline"!==this.appearance||!t||!t.children.length||!t.textContent.trim())return;if(!this._platform.isBrowser)return;if(!document.documentElement.contains(this._elementRef.nativeElement))return void(this._outlineGapCalculationNeededImmediately=!0);let e=0,n=0;const l=this._connectionContainerRef.nativeElement,i=l.querySelectorAll(".mat-form-field-outline-start"),a=l.querySelectorAll(".mat-form-field-outline-gap");if(this._label&&this._label.nativeElement.children.length){const i=l.getBoundingClientRect();if(0===i.width&&0===i.height)return this._outlineGapCalculationNeededOnStable=!0,void(this._outlineGapCalculationNeededImmediately=!1);const a=this._getStartEnd(i),s=this._getStartEnd(t.children[0].getBoundingClientRect());let r=0;for(const e of t.children)r+=e.offsetWidth;e=s-a-5,n=r>0?.75*r+10:0}for(let s=0;s<i.length;s++)i.item(s).style.width=`${e}px`;for(let s=0;s<a.length;s++)a.item(s).style.width=`${n}px`;this._outlineGapCalculationNeededOnStable=this._outlineGapCalculationNeededImmediately=!1}_getStartEnd(t){return this._dir&&"rtl"===this._dir.value?t.right:t.left}}))(),k=(()=>(class{}))()}}]);