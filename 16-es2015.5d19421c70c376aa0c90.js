(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"89kn":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("ulMw"),i=n("EM62");let o=(()=>{class e{static forRoot(t){return{ngModule:e,providers:[{provide:r.b,useClass:t}]}}}return e.\u0275mod=i.Kb({type:e}),e.\u0275inj=i.Jb({factory:function(t){return new(t||e)}}),e})()},EhEW:function(e,t,n){"use strict";n.r(t),n.d(t,"NumberInputDemoModule",(function(){return k}));var r=n("2kYt"),i=n("nIj0"),o=n("PBFl"),a=n("Meci"),s=n("+Tre"),l=n("mFH5"),u=n("Cd2c"),d=n("sEIs"),c=n("XoY3"),h=n("eY0o"),b=n("5XID"),p=n("EM62"),m=n("29Wa"),g=n("ZTXN"),f=n("bFHC");const _=["inputfield"];let v=0;const S=Object(l.w)(class{constructor(e,t,n,r){this._defaultErrorStateMatcher=e,this._parentForm=t,this._parentFormGroup=n,this.ngControl=r}});let M=(()=>{class e extends S{constructor(e,t,n,r,i,o){super(r,t,n,e),this.ngControl=e,this.cd=i,this.localeId=o,this._stepSize=1,this.focused=!1,this.stateChanges=new g.a,this.controlType="ps-number-input",this.autofilled=!1,this._disabled=!1,this._required=!1,this._value=null,this.valueChange=new p.o,this._readonly=!1,this._uid="ps-number-input-"+v++,this._onModelChange=e=>{},this._onModelTouched=()=>{},this.ngControl&&(this.ngControl.valueAccessor=this)}get stepSize(){return this._stepSize}set stepSize(e){if(this._stepSize=e,null!=this._stepSize){const e=this.stepSize.toString().split(/[,]|[.]/);this._calculatedDecimals=e[1]?e[1].length:void 0}}get disabled(){return this.ngControl&&null!==this.ngControl.disabled?this.ngControl.disabled:this._disabled}set disabled(e){this._disabled=Object(b.c)(e),this.stateChanges.next(),this.cd.markForCheck()}get id(){return this._id}set id(e){this._id=e||this._uid}get required(){return this._required}set required(e){this._required=Object(b.c)(e),this.cd.markForCheck()}get value(){return this._value}set value(e){e!==this.value&&(this._value=e,this._formatValue(),this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=Object(b.c)(e),this.cd.markForCheck()}get empty(){return null==this._value&&!this.autofilled}get shouldLabelFloat(){return this.focused||!this.empty}ngOnInit(){this.id=this.id,this._decimalSeparator=Object(r.w)(this.localeId,r.s.Decimal),this._thousandSeparator=Object(r.w)(this.localeId,r.s.Group)}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this._clearTimer(),this.stateChanges.complete()}ngDoCheck(){this.ngControl&&this.updateErrorState()}setDescribedByIds(e){this._ariaDescribedby=e.join(" ")}onContainerClick(){this.focused||this.focus()}focus(e){this._inputfieldViewChild.nativeElement.focus(e)}writeValue(e){this.value=e}registerOnChange(e){this._onModelChange=e}registerOnTouched(e){this._onModelTouched=e}setDisabledState(e){this.disabled=e}_repeat(e,t,n){const r=t||500;this._clearTimer(),this._timer=setTimeout(()=>{this._repeat(e,40,n)},r),this._spin(e,n)}_clearTimer(){this._timer&&clearInterval(this._timer)}_spin(e,t){const n=this._fixNumber(this.value+this.stepSize*t);this.value=n,this._onModelChange(n),this.valueChange.emit(n)}_parseValue(e){let t;return""===(e=e.trim())?null:(e=e.replace(this._thousandSeparator,"").replace(this._decimalSeparator,"."),t=this._fixNumber(parseFloat(e)),t)}_formatValue(){const e=this.value;if(null==e)this._formattedValue=null;else{const t=this._getDecimals();this._formattedValue=e.toLocaleString(this.localeId,{maximumFractionDigits:t})}this._inputfieldViewChild&&this._inputfieldViewChild.nativeElement&&(this._inputfieldViewChild.nativeElement.value=this._formattedValue)}_getDecimals(){return void 0===this.decimals?this._calculatedDecimals:this.decimals}_toFixed(e,t){const n=Math.pow(10,t||0);return String(Math.round(e*n)/n)}_fixNumber(e){const t=this._getDecimals();return e=t?parseFloat(this._toFixed(e,t)):e>=0?Math.floor(e):Math.ceil(e),isNaN(e)?null:(null!==this.max&&e>this.max&&(e=this.max),null!==this.min&&e<this.min&&(e=this.min),e)}_onUpButtonMousedown(e){this.disabled||(this._inputfieldViewChild.nativeElement.focus(),this._repeat(e,null,1),e.preventDefault())}_onUpButtonMouseup(e){this.disabled||this._clearTimer()}_onUpButtonMouseleave(e){this.disabled||this._clearTimer()}_onDownButtonMousedown(e){this.disabled||(this._inputfieldViewChild.nativeElement.focus(),this._repeat(e,null,-1),e.preventDefault())}_onDownButtonMouseup(e){this.disabled||this._clearTimer()}_onDownButtonMouseleave(e){this.disabled||this._clearTimer()}_onInputKeydown(e){38===e.which?(this._spin(e,1),e.preventDefault()):40===e.which&&(this._spin(e,-1),e.preventDefault())}_onInput(e){this._value=this._parseValue(e.target.value),this.stateChanges.next(),this._onModelChange(this.value),this.valueChange.emit(this.value)}_onFocusChanged(e){e===this.focused||this.readonly&&e||(this.focused=e,this.stateChanges.next()),e||(this._formatValue(),this._onModelTouched())}}return e.\u0275fac=function(t){return new(t||e)(p.Mb(i.m,10),p.Mb(i.p,8),p.Mb(i.i,8),p.Mb(l.c),p.Mb(p.h),p.Mb(p.v))},e.\u0275cmp=p.Gb({type:e,selectors:[["ps-number-input"]],viewQuery:function(e,t){var n;1&e&&p.uc(_,!0),2&e&&p.nc(n=p.ac())&&(t._inputfieldViewChild=n.first)},hostVars:8,hostBindings:function(e,t){2&e&&p.Bb("id",t.id)("placeholder",t.placeholder)("disabled",t.disabled)("required",t.required)("readonly",t.readonly||null)("aria-describedby",t._ariaDescribedby||null)("aria-invalid",t.errorState)("aria-required",t.required.toString())},inputs:{min:"min",max:"max",tabindex:"tabindex",decimals:"decimals",stepSize:"stepSize",disabled:"disabled",id:"id",placeholder:"placeholder",required:"required",errorStateMatcher:"errorStateMatcher",value:"value",readonly:"readonly"},outputs:{valueChange:"valueChange"},features:[p.zb([{provide:m.e,useExisting:e}]),p.xb,p.yb],decls:9,vars:13,consts:[[1,"ps-number-input__wrapper"],["type","text",1,"ps-number-input__input","mat-input-element",3,"value","disabled","readonly","keydown","input","focus","blur"],["inputfield",""],["type","button","tabindex","-1",1,"ps-number-input__button-up",3,"disabled","mouseleave","mousedown","mouseup"],["type","button","tabindex","-1",1,"ps-number-input__button-down",3,"disabled","mouseleave","mousedown","mouseup"]],template:function(e,t){1&e&&(p.Sb(0,"div",0),p.Sb(1,"input",1,2),p.Zb("keydown",(function(e){return t._onInputKeydown(e)}))("input",(function(e){return t._onInput(e)}))("focus",(function(){return t._onFocusChanged(!0)}))("blur",(function(){return t._onFocusChanged(!1)})),p.Rb(),p.Sb(3,"button",3),p.Zb("mouseleave",(function(e){return t._onUpButtonMouseleave(e)}))("mousedown",(function(e){return t._onUpButtonMousedown(e)}))("mouseup",(function(e){return t._onUpButtonMouseup(e)})),p.Sb(4,"mat-icon"),p.Ac(5,"keyboard_arrow_up"),p.Rb(),p.Rb(),p.Sb(6,"button",4),p.Zb("mouseleave",(function(e){return t._onDownButtonMouseleave(e)}))("mousedown",(function(e){return t._onDownButtonMousedown(e)}))("mouseup",(function(e){return t._onDownButtonMouseup(e)})),p.Sb(7,"mat-icon"),p.Ac(8,"keyboard_arrow_down"),p.Rb(),p.Rb(),p.Rb()),2&e&&(p.Ab(1),p.jc("value",t._formattedValue||null)("disabled",t.disabled)("readonly",t.readonly),p.Bb("aria-valumin",t.min)("aria-valuemax",t.max)("aria-valuenow",t.value)("tabindex",t.tabindex)("placeholder",t.placeholder)("required",t.required),p.Ab(2),p.jc("disabled",t.disabled||t.readonly),p.Bb("readonly",t.readonly),p.Ab(3),p.jc("disabled",t.disabled||t.readonly),p.Bb("readonly",t.readonly))},directives:[f.a],styles:[".ps-number-input__wrapper{overflow:visible;position:relative}.ps-number-input__input{box-sizing:border-box;width:100%;padding-right:1.5em}.ps-number-input__button-down,.ps-number-input__button-up{cursor:pointer;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;width:1.5em;background:none;border:none;color:rgba(0,0,0,.54)}.ps-number-input__button-down mat-icon,.ps-number-input__button-up mat-icon{position:absolute;top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;width:1em}.ps-number-input__button-down:not([disabled]):hover,.ps-number-input__button-up:not([disabled]):hover{color:var(--ps-primary)}.ps-number-input__button-down[disabled],.ps-number-input__button-up[disabled]{cursor:default}.ps-number-input__button-up{top:0}.ps-number-input__button-down{bottom:0}"],encapsulation:2,changeDetection:0}),e})();const C=[r.c,f.b];let y=(()=>{class e{}return e.\u0275mod=p.Kb({type:e}),e.\u0275inj=p.Jb({factory:function(t){return new(t||e)},imports:[C]}),e})();var w=n("/nyh"),x=n("sxkr"),R=n("q3Sb");function A(e,t){if(1&e){const e=p.Tb();p.Qb(0),p.Sb(1,"div",8),p.Sb(2,"ps-form-field",9),p.Sb(3,"mat-label"),p.Ac(4,"value"),p.Rb(),p.Sb(5,"ps-number-input",10),p.Zb("valueChange",(function(t){return p.qc(e),p.dc().value=t})),p.Rb(),p.Rb(),p.Ac(6," Code: "),p.Sb(7,"pre",11),p.Ac(8),p.Rb(),p.Rb(),p.Sb(9,"div",8),p.Sb(10,"ps-form-field",9),p.Sb(11,"mat-label"),p.Ac(12,"ngModel"),p.Rb(),p.Sb(13,"ps-number-input",12),p.Zb("ngModelChange",(function(t){return p.qc(e),p.dc().model=t})),p.Rb(),p.Rb(),p.Ac(14," Code: "),p.Sb(15,"pre",11),p.Ac(16),p.Rb(),p.Rb(),p.Sb(17,"div",13),p.Sb(18,"ps-form-field",9),p.Sb(19,"mat-label"),p.Ac(20,"form"),p.Rb(),p.Nb(21,"ps-number-input",14),p.Rb(),p.Ac(22," Code: "),p.Sb(23,"pre",11),p.Ac(24),p.Rb(),p.Rb(),p.Pb()}if(2&e){const e=p.dc();p.Ab(2),p.jc("hint","Value: "+e.value),p.Ab(3),p.jc("min",e.min)("max",e.max)("stepSize",e.stepSize)("decimals",e.decimals)("placeholder",e.placeholder)("required",e.required)("disabled",e.disabled)("readonly",e.readonly)("errorStateMatcher",e.errorStateMatcher)("value",e.value),p.Ab(3),p.Bc(e.getCodeSnippet("value")),p.Ab(2),p.jc("hint","Value: "+e.model),p.Ab(3),p.jc("min",e.min)("max",e.max)("stepSize",e.stepSize)("decimals",e.decimals)("placeholder",e.placeholder)("required",e.required)("disabled",e.disabled)("readonly",e.readonly)("errorStateMatcher",e.errorStateMatcher)("ngModel",e.model),p.Ab(3),p.Bc(e.getCodeSnippet("ngmodel")),p.Ab(1),p.jc("formGroup",e.form),p.Ab(1),p.jc("hint","Value: "+e.form.get("control").value),p.Ab(3),p.jc("min",e.min)("max",e.max)("stepSize",e.stepSize)("decimals",e.decimals)("placeholder",e.placeholder)("required",e.required)("disabled",e.disabled)("readonly",e.readonly)("errorStateMatcher",e.errorStateMatcher),p.Ab(3),p.Bc(e.getCodeSnippet("form"))}}let j=(()=>{class e{constructor(e){this.cd=e,this.value=5,this.model=5,this.control=new i.e(5),this.form=new i.h({control:this.control}),this.show=!0,this.min=0,this.max=20,this.stepSize=1,this.decimals=1,this.placeholder="",this.required=!1,this.disabled=!1,this.readonly=!1,this.errorStateMatcher=null,this.validatorRequired=!1,this.useErrorStateMatcher=!1}onValidatorChange(){const e=[];this.validatorRequired&&e.push(i.u.required),this.control.setValidators(e)}onUseErrorStateMatcherChange(){this.errorStateMatcher=this.useErrorStateMatcher?{isErrorState:()=>!0}:null}setValues(e){this.value=e,this.model=e,this.control.patchValue(e)}onDisabledChanged(){this.disabled?this.form.disable():this.form.enable()}recreate(){this.show=!1,setTimeout(()=>{this.show=!0,this.cd.markForCheck()})}getCodeSnippet(e){let t;return t="value"===e?'[(value)]="value"':"ngmodel"===e?'[(ngModel)]="value"':'formControlName="control"',`  <ps-number-input\n    [min]="${this.min}" [max]="${this.max}" [stepSize]="${this.stepSize}" [decimals]="${this.decimals}"\n    [placeholder]="${this.placeholder}" [required]="${this.required}"\n    [disabled]="${this.disabled}" [readonly]="${this.readonly}" [errorStateMatcher]="${this.errorStateMatcher?"errorStateMatcher":"null"}"\n    ${t}\n  ></ps-number-input>`}}return e.\u0275fac=function(t){return new(t||e)(p.Mb(p.h))},e.\u0275cmp=p.Gb({type:e,selectors:[["app-number-input-demo"]],decls:40,vars:11,consts:[[1,"app-number-input-demo__settings"],[1,"app-number-input-demo__checkboxes"],[3,"ngModel","ngModelChange","change"],[3,"ngModel","ngModelChange"],["matInput","","type","number",3,"ngModel","ngModelChange"],["matInput","","type","text",3,"ngModel","ngModelChange"],["type","button","mat-stroked-button","",3,"click"],[4,"ngIf"],[1,"app-number-input-demo__input-block"],[3,"hint"],[3,"min","max","stepSize","decimals","placeholder","required","disabled","readonly","errorStateMatcher","value","valueChange"],[1,"app-number-input-demo__code"],[3,"min","max","stepSize","decimals","placeholder","required","disabled","readonly","errorStateMatcher","ngModel","ngModelChange"],[1,"app-number-input-demo__input-block",3,"formGroup"],["formControlName","control",3,"min","max","stepSize","decimals","placeholder","required","disabled","readonly","errorStateMatcher"]],template:function(e,t){1&e&&(p.Sb(0,"mat-card"),p.Sb(1,"h1"),p.Ac(2,"ps-slider"),p.Rb(),p.Sb(3,"div",0),p.Sb(4,"div",1),p.Sb(5,"mat-checkbox",2),p.Zb("ngModelChange",(function(e){return t.disabled=e}))("change",(function(){return t.onDisabledChanged()})),p.Ac(6,"disabled"),p.Rb(),p.Sb(7,"mat-checkbox",3),p.Zb("ngModelChange",(function(e){return t.readonly=e})),p.Ac(8,"readonly"),p.Rb(),p.Sb(9,"mat-checkbox",3),p.Zb("ngModelChange",(function(e){return t.required=e})),p.Ac(10,"required"),p.Rb(),p.Sb(11,"mat-checkbox",2),p.Zb("ngModelChange",(function(e){return t.validatorRequired=e}))("change",(function(){return t.onValidatorChange()})),p.Ac(12,"required validator"),p.Rb(),p.Sb(13,"mat-checkbox",2),p.Zb("ngModelChange",(function(e){return t.useErrorStateMatcher=e}))("change",(function(){return t.onUseErrorStateMatcherChange()})),p.Ac(14,"errorStateMatcher (always invalid)"),p.Rb(),p.Rb(),p.Sb(15,"ps-form-field"),p.Sb(16,"mat-label"),p.Ac(17,"min value"),p.Rb(),p.Sb(18,"input",4),p.Zb("ngModelChange",(function(e){return t.min=e})),p.Rb(),p.Rb(),p.Sb(19,"ps-form-field"),p.Sb(20,"mat-label"),p.Ac(21,"max value"),p.Rb(),p.Sb(22,"input",4),p.Zb("ngModelChange",(function(e){return t.max=e})),p.Rb(),p.Rb(),p.Sb(23,"ps-form-field"),p.Sb(24,"mat-label"),p.Ac(25,"step size"),p.Rb(),p.Sb(26,"input",4),p.Zb("ngModelChange",(function(e){return t.stepSize=e})),p.Rb(),p.Rb(),p.Sb(27,"ps-form-field"),p.Sb(28,"mat-label"),p.Ac(29,"decimals"),p.Rb(),p.Sb(30,"input",4),p.Zb("ngModelChange",(function(e){return t.decimals=e})),p.Rb(),p.Rb(),p.Sb(31,"ps-form-field"),p.Sb(32,"mat-label"),p.Ac(33,"placeholder"),p.Rb(),p.Sb(34,"input",5),p.Zb("ngModelChange",(function(e){return t.placeholder=e})),p.Rb(),p.Rb(),p.Sb(35,"button",6),p.Zb("click",(function(){return t.setValues(null)})),p.Ac(36,"set values null"),p.Rb(),p.Sb(37,"button",6),p.Zb("click",(function(){return t.recreate()})),p.Ac(38,"recreate slider"),p.Rb(),p.Rb(),p.yc(39,A,25,36,"ng-container",7),p.Rb()),2&e&&(p.Ab(5),p.jc("ngModel",t.disabled),p.Ab(2),p.jc("ngModel",t.readonly),p.Ab(2),p.jc("ngModel",t.required),p.Ab(2),p.jc("ngModel",t.validatorRequired),p.Ab(2),p.jc("ngModel",t.useErrorStateMatcher),p.Ab(5),p.jc("ngModel",t.min),p.Ab(4),p.jc("ngModel",t.max),p.Ab(4),p.jc("ngModel",t.stepSize),p.Ab(4),p.jc("ngModel",t.decimals),p.Ab(4),p.jc("ngModel",t.placeholder),p.Ab(5),p.jc("ngIf",t.show))},directives:[a.a,s.a,i.n,i.q,R.a,m.h,u.a,i.r,i.c,o.a,r.m,M,i.t,i.o,i.i,i.g],styles:[".app-number-input-demo__settings[_ngcontent-%COMP%] {\n        margin-bottom: 2em;\n      }\n      .app-number-input-demo__checkboxes[_ngcontent-%COMP%] {\n        display: flex;\n      }\n      .app-number-input-demo__checkboxes[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%] {\n        margin-right: 1em;\n      }\n      .app-number-input-demo__input-block[_ngcontent-%COMP%] {\n        border: 1px solid #ccc;\n        margin: 0.5em 0;\n        padding: 1em;\n      }\n      .app-number-input-demo__code[_ngcontent-%COMP%] {\n        margin-bottom: 0;\n      }"],changeDetection:0}),e})();n("89kn");let k=(()=>{class e{}return e.\u0275mod=p.Kb({type:e}),e.\u0275inj=p.Jb({factory:function(t){return new(t||e)},providers:[{provide:l.c,useClass:x.a}],imports:[[d.d.forChild([{path:"",component:j}]),r.c,i.j,i.s,y,c.b.forRoot(w.a),h.a,a.e,o.b,s.b,u.b]]}),e})()},XoY3:function(e,t,n){"use strict";n.d(t,"b",(function(){return r.a})),n.d(t,"a",(function(){return i.a})),n.d(t,"c",(function(){return i.b})),n.d(t,"d",(function(){return o.b}));var r=n("89kn"),i=n("ulMw"),o=n("lZLj")},lZLj:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o}));var r=n("nIj0");function i(e){if(e.validator){const t=e.validator({});if(t&&t.required)return!0}if(e instanceof r.h||e instanceof r.d){const t=e.controls;for(const e in t)if(t[e]&&i(t[e]))return!0}return!1}function o(e){const t=e.id||e.name;if(t){const e=t.split("-");return e[e.length-1].match(/[0-9]/)&&e.pop(),e.join("-")}return void 0!==e.step&&void 0!==e.thumbLabel?"mat-slider":null}},ulMw:function(e,t,n){"use strict";n.d(t,"b",(function(){return h})),n.d(t,"a",(function(){return b}));var r=n("nIj0"),i=n("ROBh"),o=n("g6G6"),a=n("YtkY"),s=n("TLy2"),l=n("jIqt"),u=n("mWib"),d=n("lZLj"),c=n("EM62");let h=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=c.Ib({token:e,factory:e.\u0275fac}),e})();class b extends h{constructor(){super(...arguments),this.options={debounceTime:100,includeControlsDefault:!1},this.tryDetectRequired=!0,this.getControlType=d.a}getControlErrors(e){return this.getErrors(e,!0,"control")}getFormErrors(e,t){return null==t&&(t=this.options.includeControlsDefault),this.getErrors(e,t,"form")}filterErrors(e,t,n){return Object(i.a)(e)}getErrors(e,t,n){return this.createUpdateTrigger(e).pipe(Object(a.a)(()=>this.getErrorInfo(e,t)),Object(s.a)(e=>this.filterErrors(e,t,n)),Object(s.a)(e=>this.mapDataToError(e)))}createUpdateTrigger(e){return Object(o.a)(e.valueChanges,e.statusChanges).pipe(Object(l.a)(null),Object(u.a)(this.options.debounceTime))}getErrorInfo(e,t=!1){return this.getControlErrorInfoInternal(e,"",t)}getControlErrorInfoInternal(e,t,n){const i=[];if(e instanceof r.h||e instanceof r.d)for(const o in e.controls){if(!e.controls.hasOwnProperty(o))continue;const a=e.controls[o];a instanceof r.e&&!n||i.push(...this.getControlErrorInfoInternal(a,t?t+"."+o:o,n))}return e.errors&&i.push(...function(e){const t=[];for(const n in e)e.hasOwnProperty(n)&&t.push({key:n,value:e[n]});return t}(e.errors).map(n=>this.createFormErrorData(n,e,t))),i}createFormErrorData(e,t,n){return{controlPath:n,errorKey:e.key,errorValue:e.value,isControl:t instanceof r.e}}}}}]);