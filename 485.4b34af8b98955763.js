"use strict";(self.webpackChunkprosoft_components_demo=self.webpackChunkprosoft_components_demo||[]).push([[485],{5485:(L,f,r)=>{r.d(f,{V:()=>C});var l=r(6019),i=r(9133),c=r(8621),o=r(3668);let C=(()=>{class p{}return p.\u0275fac=function(d){return new(d||p)},p.\u0275mod=o.oAB({type:p}),p.\u0275inj=o.cJS({imports:[[l.ez,i.UX,c.Hi]]}),p})()},8621:(L,f,r)=>{r.d(f,{HS:()=>m,qn:()=>S,Hi:()=>G});var l=r(1628),i=r(3668),c=r(6731),o=r(348),C=r(928),p=r(6019),b=r(9555),d=r(273),u=r(3719),x=r(9468),v=r(6263),k=r(3970),R=r(7497),T=r(8290),A=r(5351),_=r(9133),w=r(8167);const P=["*"],E=new i.OlP("MatChipRemove"),D=new i.OlP("MatChipAvatar"),O=new i.OlP("MatChipTrailingIcon");class F{constructor(h){this._elementRef=h}}const H=(0,c.sb)((0,c.pj)((0,c.Kr)(F),"primary"),-1);let m=(()=>{class s extends H{constructor(t,e,a,n,M,I,y,g){super(t),this._ngZone=e,this._changeDetectorRef=M,this._hasFocus=!1,this.chipListSelectable=!0,this._chipListMultiple=!1,this._chipListDisabled=!1,this._selected=!1,this._selectable=!0,this._disabled=!1,this._removable=!0,this._onFocus=new d.x,this._onBlur=new d.x,this.selectionChange=new i.vpe,this.destroyed=new i.vpe,this.removed=new i.vpe,this._addHostClassName(),this._chipRippleTarget=I.createElement("div"),this._chipRippleTarget.classList.add("mat-chip-ripple"),this._elementRef.nativeElement.appendChild(this._chipRippleTarget),this._chipRipple=new c.IR(this,e,this._chipRippleTarget,a),this._chipRipple.setupTriggerEvents(t),this.rippleConfig=n||{},this._animationsDisabled="NoopAnimations"===y,this.tabIndex=null!=g&&parseInt(g)||-1}get rippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||!!this.rippleConfig.disabled}get selected(){return this._selected}set selected(t){const e=(0,o.Ig)(t);e!==this._selected&&(this._selected=e,this._dispatchSelectionChange())}get value(){return void 0!==this._value?this._value:this._elementRef.nativeElement.textContent}set value(t){this._value=t}get selectable(){return this._selectable&&this.chipListSelectable}set selectable(t){this._selectable=(0,o.Ig)(t)}get disabled(){return this._chipListDisabled||this._disabled}set disabled(t){this._disabled=(0,o.Ig)(t)}get removable(){return this._removable}set removable(t){this._removable=(0,o.Ig)(t)}get ariaSelected(){return this.selectable&&(this._chipListMultiple||this.selected)?this.selected.toString():null}_addHostClassName(){const t="mat-basic-chip",e=this._elementRef.nativeElement;e.hasAttribute(t)||e.tagName.toLowerCase()===t?e.classList.add(t):e.classList.add("mat-standard-chip")}ngOnDestroy(){this.destroyed.emit({chip:this}),this._chipRipple._removeTriggerEvents()}select(){this._selected||(this._selected=!0,this._dispatchSelectionChange(),this._changeDetectorRef.markForCheck())}deselect(){this._selected&&(this._selected=!1,this._dispatchSelectionChange(),this._changeDetectorRef.markForCheck())}selectViaInteraction(){this._selected||(this._selected=!0,this._dispatchSelectionChange(!0),this._changeDetectorRef.markForCheck())}toggleSelected(t=!1){return this._selected=!this.selected,this._dispatchSelectionChange(t),this._changeDetectorRef.markForCheck(),this.selected}focus(){this._hasFocus||(this._elementRef.nativeElement.focus(),this._onFocus.next({chip:this})),this._hasFocus=!0}remove(){this.removable&&this.removed.emit({chip:this})}_handleClick(t){this.disabled?t.preventDefault():t.stopPropagation()}_handleKeydown(t){if(!this.disabled)switch(t.keyCode){case l.yY:case l.ZH:this.remove(),t.preventDefault();break;case l.L_:this.selectable&&this.toggleSelected(!0),t.preventDefault()}}_blur(){this._ngZone.onStable.pipe((0,x.q)(1)).subscribe(()=>{this._ngZone.run(()=>{this._hasFocus=!1,this._onBlur.next({chip:this})})})}_dispatchSelectionChange(t=!1){this.selectionChange.emit({source:this,isUserInput:t,selected:this._selected})}}return s.\u0275fac=function(t){return new(t||s)(i.Y36(i.SBq),i.Y36(i.R0b),i.Y36(C.t4),i.Y36(c.Y2,8),i.Y36(i.sBO),i.Y36(p.K0),i.Y36(b.Qb,8),i.$8M("tabindex"))},s.\u0275dir=i.lG2({type:s,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,e,a){if(1&t&&(i.Suo(a,D,5),i.Suo(a,O,5),i.Suo(a,E,5)),2&t){let n;i.iGM(n=i.CRH())&&(e.avatar=n.first),i.iGM(n=i.CRH())&&(e.trailingIcon=n.first),i.iGM(n=i.CRH())&&(e.removeIcon=n.first)}},hostAttrs:["role","option",1,"mat-chip","mat-focus-indicator"],hostVars:14,hostBindings:function(t,e){1&t&&i.NdJ("click",function(n){return e._handleClick(n)})("keydown",function(n){return e._handleKeydown(n)})("focus",function(){return e.focus()})("blur",function(){return e._blur()}),2&t&&(i.uIk("tabindex",e.disabled?null:e.tabIndex)("disabled",e.disabled||null)("aria-disabled",e.disabled.toString())("aria-selected",e.ariaSelected),i.ekj("mat-chip-selected",e.selected)("mat-chip-with-avatar",e.avatar)("mat-chip-with-trailing-icon",e.trailingIcon||e.removeIcon)("mat-chip-disabled",e.disabled)("_mat-animation-noopable",e._animationsDisabled))},inputs:{color:"color",disableRipple:"disableRipple",tabIndex:"tabIndex",selected:"selected",value:"value",selectable:"selectable",disabled:"disabled",removable:"removable"},outputs:{selectionChange:"selectionChange",destroyed:"destroyed",removed:"removed"},exportAs:["matChip"],features:[i.qOj]}),s})();const B=new i.OlP("mat-chips-default-options"),U=(0,c.FD)(class{constructor(s,h,t,e){this._defaultErrorStateMatcher=s,this._parentForm=h,this._parentFormGroup=t,this.ngControl=e}});let Y=0;class j{constructor(h,t){this.source=h,this.value=t}}let S=(()=>{class s extends U{constructor(t,e,a,n,M,I,y){super(I,n,M,y),this._elementRef=t,this._changeDetectorRef=e,this._dir=a,this.controlType="mat-chip-list",this._lastDestroyedChipIndex=null,this._destroyed=new d.x,this._uid="mat-chip-list-"+Y++,this._tabIndex=0,this._userTabIndex=null,this._onTouched=()=>{},this._onChange=()=>{},this._multiple=!1,this._compareWith=(g,Z)=>g===Z,this._disabled=!1,this.ariaOrientation="horizontal",this._selectable=!0,this.change=new i.vpe,this.valueChange=new i.vpe,this.ngControl&&(this.ngControl.valueAccessor=this)}get selected(){var t,e;return this.multiple?(null==(t=this._selectionModel)?void 0:t.selected)||[]:null==(e=this._selectionModel)?void 0:e.selected[0]}get role(){return this.empty?null:"listbox"}get multiple(){return this._multiple}set multiple(t){this._multiple=(0,o.Ig)(t),this._syncChipsState()}get compareWith(){return this._compareWith}set compareWith(t){this._compareWith=t,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(t){this.writeValue(t),this._value=t}get id(){return this._chipInput?this._chipInput.id:this._uid}get required(){var t,e,a,n;return null!=(n=null!=(a=this._required)?a:null==(e=null==(t=this.ngControl)?void 0:t.control)?void 0:e.hasValidator(_.kI.required))&&n}set required(t){this._required=(0,o.Ig)(t),this.stateChanges.next()}get placeholder(){return this._chipInput?this._chipInput.placeholder:this._placeholder}set placeholder(t){this._placeholder=t,this.stateChanges.next()}get focused(){return this._chipInput&&this._chipInput.focused||this._hasFocusedChip()}get empty(){return(!this._chipInput||this._chipInput.empty)&&(!this.chips||0===this.chips.length)}get shouldLabelFloat(){return!this.empty||this.focused}get disabled(){return this.ngControl?!!this.ngControl.disabled:this._disabled}set disabled(t){this._disabled=(0,o.Ig)(t),this._syncChipsState()}get selectable(){return this._selectable}set selectable(t){this._selectable=(0,o.Ig)(t),this.chips&&this.chips.forEach(e=>e.chipListSelectable=this._selectable)}set tabIndex(t){this._userTabIndex=t,this._tabIndex=t}get chipSelectionChanges(){return(0,u.T)(...this.chips.map(t=>t.selectionChange))}get chipFocusChanges(){return(0,u.T)(...this.chips.map(t=>t._onFocus))}get chipBlurChanges(){return(0,u.T)(...this.chips.map(t=>t._onBlur))}get chipRemoveChanges(){return(0,u.T)(...this.chips.map(t=>t.destroyed))}ngAfterContentInit(){this._keyManager=new R.Em(this.chips).withWrap().withVerticalOrientation().withHomeAndEnd().withHorizontalOrientation(this._dir?this._dir.value:"ltr"),this._dir&&this._dir.change.pipe((0,v.R)(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t)),this._keyManager.tabOut.pipe((0,v.R)(this._destroyed)).subscribe(()=>{this._allowFocusEscape()}),this.chips.changes.pipe((0,k.O)(null),(0,v.R)(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>{this._syncChipsState()}),this._resetChips(),this._initializeSelection(),this._updateTabIndex(),this._updateFocusForDestroyedChips(),this.stateChanges.next()})}ngOnInit(){this._selectionModel=new A.Ov(this.multiple,void 0,!1),this.stateChanges.next()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==this._disabled&&(this.disabled=!!this.ngControl.disabled))}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.stateChanges.complete(),this._dropSubscriptions()}registerInput(t){this._chipInput=t,this._elementRef.nativeElement.setAttribute("data-mat-chip-input",t.id)}setDescribedByIds(t){this._ariaDescribedby=t.join(" ")}writeValue(t){this.chips&&this._setSelectionByValue(t,!1)}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t,this.stateChanges.next()}onContainerClick(t){this._originatesFromChip(t)||this.focus()}focus(t){this.disabled||this._chipInput&&this._chipInput.focused||(this.chips.length>0?(this._keyManager.setFirstItemActive(),this.stateChanges.next()):(this._focusInput(t),this.stateChanges.next()))}_focusInput(t){this._chipInput&&this._chipInput.focus(t)}_keydown(t){const e=t.target;e&&e.classList.contains("mat-chip")&&(this._keyManager.onKeydown(t),this.stateChanges.next())}_updateTabIndex(){this._tabIndex=this._userTabIndex||(0===this.chips.length?-1:0)}_updateFocusForDestroyedChips(){if(null!=this._lastDestroyedChipIndex)if(this.chips.length){const t=Math.min(this._lastDestroyedChipIndex,this.chips.length-1);this._keyManager.setActiveItem(t)}else this.focus();this._lastDestroyedChipIndex=null}_isValidIndex(t){return t>=0&&t<this.chips.length}_setSelectionByValue(t,e=!0){if(this._clearSelection(),this.chips.forEach(a=>a.deselect()),Array.isArray(t))t.forEach(a=>this._selectValue(a,e)),this._sortValues();else{const a=this._selectValue(t,e);a&&e&&this._keyManager.setActiveItem(a)}}_selectValue(t,e=!0){const a=this.chips.find(n=>null!=n.value&&this._compareWith(n.value,t));return a&&(e?a.selectViaInteraction():a.select(),this._selectionModel.select(a)),a}_initializeSelection(){Promise.resolve().then(()=>{(this.ngControl||this._value)&&(this._setSelectionByValue(this.ngControl?this.ngControl.value:this._value,!1),this.stateChanges.next())})}_clearSelection(t){this._selectionModel.clear(),this.chips.forEach(e=>{e!==t&&e.deselect()}),this.stateChanges.next()}_sortValues(){this._multiple&&(this._selectionModel.clear(),this.chips.forEach(t=>{t.selected&&this._selectionModel.select(t)}),this.stateChanges.next())}_propagateChanges(t){let e=null;e=Array.isArray(this.selected)?this.selected.map(a=>a.value):this.selected?this.selected.value:t,this._value=e,this.change.emit(new j(this,e)),this.valueChange.emit(e),this._onChange(e),this._changeDetectorRef.markForCheck()}_blur(){this._hasFocusedChip()||this._keyManager.setActiveItem(-1),this.disabled||(this._chipInput?setTimeout(()=>{this.focused||this._markAsTouched()}):this._markAsTouched())}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next()}_allowFocusEscape(){-1!==this._tabIndex&&(this._tabIndex=-1,setTimeout(()=>{this._tabIndex=this._userTabIndex||0,this._changeDetectorRef.markForCheck()}))}_resetChips(){this._dropSubscriptions(),this._listenToChipsFocus(),this._listenToChipsSelection(),this._listenToChipsRemoved()}_dropSubscriptions(){this._chipFocusSubscription&&(this._chipFocusSubscription.unsubscribe(),this._chipFocusSubscription=null),this._chipBlurSubscription&&(this._chipBlurSubscription.unsubscribe(),this._chipBlurSubscription=null),this._chipSelectionSubscription&&(this._chipSelectionSubscription.unsubscribe(),this._chipSelectionSubscription=null),this._chipRemoveSubscription&&(this._chipRemoveSubscription.unsubscribe(),this._chipRemoveSubscription=null)}_listenToChipsSelection(){this._chipSelectionSubscription=this.chipSelectionChanges.subscribe(t=>{t.source.selected?this._selectionModel.select(t.source):this._selectionModel.deselect(t.source),this.multiple||this.chips.forEach(e=>{!this._selectionModel.isSelected(e)&&e.selected&&e.deselect()}),t.isUserInput&&this._propagateChanges()})}_listenToChipsFocus(){this._chipFocusSubscription=this.chipFocusChanges.subscribe(t=>{let e=this.chips.toArray().indexOf(t.chip);this._isValidIndex(e)&&this._keyManager.updateActiveItem(e),this.stateChanges.next()}),this._chipBlurSubscription=this.chipBlurChanges.subscribe(()=>{this._blur(),this.stateChanges.next()})}_listenToChipsRemoved(){this._chipRemoveSubscription=this.chipRemoveChanges.subscribe(t=>{const e=t.chip,a=this.chips.toArray().indexOf(t.chip);this._isValidIndex(a)&&e._hasFocus&&(this._lastDestroyedChipIndex=a)})}_originatesFromChip(t){let e=t.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-chip"))return!0;e=e.parentElement}return!1}_hasFocusedChip(){return this.chips&&this.chips.some(t=>t._hasFocus)}_syncChipsState(){this.chips&&this.chips.forEach(t=>{t._chipListDisabled=this._disabled,t._chipListMultiple=this.multiple})}}return s.\u0275fac=function(t){return new(t||s)(i.Y36(i.SBq),i.Y36(i.sBO),i.Y36(T.Is,8),i.Y36(_.F,8),i.Y36(_.sg,8),i.Y36(c.rD),i.Y36(_.a5,10))},s.\u0275cmp=i.Xpm({type:s,selectors:[["mat-chip-list"]],contentQueries:function(t,e,a){if(1&t&&i.Suo(a,m,5),2&t){let n;i.iGM(n=i.CRH())&&(e.chips=n)}},hostAttrs:[1,"mat-chip-list"],hostVars:15,hostBindings:function(t,e){1&t&&i.NdJ("focus",function(){return e.focus()})("blur",function(){return e._blur()})("keydown",function(n){return e._keydown(n)}),2&t&&(i.Ikx("id",e._uid),i.uIk("tabindex",e.disabled?null:e._tabIndex)("aria-describedby",e._ariaDescribedby||null)("aria-required",e.role?e.required:null)("aria-disabled",e.disabled.toString())("aria-invalid",e.errorState)("aria-multiselectable",e.multiple)("role",e.role)("aria-orientation",e.ariaOrientation),i.ekj("mat-chip-list-disabled",e.disabled)("mat-chip-list-invalid",e.errorState)("mat-chip-list-required",e.required))},inputs:{errorStateMatcher:"errorStateMatcher",multiple:"multiple",compareWith:"compareWith",value:"value",required:"required",placeholder:"placeholder",disabled:"disabled",ariaOrientation:["aria-orientation","ariaOrientation"],selectable:"selectable",tabIndex:"tabIndex"},outputs:{change:"change",valueChange:"valueChange"},exportAs:["matChipList"],features:[i._Bn([{provide:w.Eo,useExisting:s}]),i.qOj],ngContentSelectors:P,decls:2,vars:0,consts:[[1,"mat-chip-list-wrapper"]],template:function(t,e){1&t&&(i.F$t(),i.TgZ(0,"div",0),i.Hsn(1),i.qZA())},styles:['.mat-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;transform:translateZ(0);border:none;-webkit-appearance:none;-moz-appearance:none}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:inline-flex;padding:7px 12px;border-radius:16px;align-items:center;cursor:default;min-height:32px;height:1px}._mat-animation-noopable.mat-standard-chip{transition:none;animation:none}.mat-standard-chip .mat-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-standard-chip .mat-chip-remove.mat-icon,.mat-standard-chip .mat-chip-remove .mat-icon{width:18px;height:18px;font-size:18px}.mat-standard-chip::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;content:"";pointer-events:none;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-standard-chip:hover::after{opacity:.12}.mat-standard-chip:focus{outline:none}.mat-standard-chip:focus::after{opacity:.16}.cdk-high-contrast-active .mat-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-standard-chip:focus{outline:dotted 2px}.cdk-high-contrast-active .mat-standard-chip.mat-chip-selected{outline-width:3px}.mat-standard-chip.mat-chip-disabled::after{opacity:0}.mat-standard-chip.mat-chip-disabled .mat-chip-remove,.mat-standard-chip.mat-chip-disabled .mat-chip-trailing-icon{cursor:default}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:8px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:8px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:8px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:8px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:24px;height:24px;margin-right:8px;margin-left:4px}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:4px}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:8px;margin-left:0}.mat-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit;overflow:hidden}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper input.mat-input-element,.mat-chip-list-wrapper .mat-standard-chip{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover}input.mat-chip-input{width:150px;margin:4px;flex:1 0 150px}\n'],encapsulation:2,changeDetection:0}),s})(),G=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=i.oAB({type:s}),s.\u0275inj=i.cJS({providers:[c.rD,{provide:B,useValue:{separatorKeyCodes:[l.K5]}}],imports:[[c.BQ]]}),s})()}}]);