(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{MQ2t:function(e,t,s){"use strict";s.d(t,"a",function(){return i});class i{}},eEhu:function(e,t,s){"use strict";s.d(t,"d",function(){return S}),s.d(t,"c",function(){return I}),s.d(t,"b",function(){return g}),s.d(t,"a",function(){return m});var i=s("WT5v"),h=s("K5Xz"),n=s("kZht"),c=s("ApNh"),a=s("ZTXN"),l=s("g6G6"),r=s("J+dc"),o=s("kuMc"),u=s("jIqt"),p=s("owzC"),_=s("JXpk");class d{constructor(e){this._elementRef=e}}const b=Object(c.C)(Object(c.D)(Object(c.E)(d)),"primary");let g=(()=>(class extends b{constructor(e,t,s,i,h){super(e),this._elementRef=e,this._ngZone=t,this._hasFocus=!1,this.chipListSelectable=!0,this._chipListMultiple=!1,this._selected=!1,this._selectable=!0,this._removable=!0,this._onFocus=new a.a,this._onBlur=new a.a,this.selectionChange=new n.m,this.destroyed=new n.m,this.removed=new n.m,this._addHostClassName(),this._chipRipple=new c.z(this,t,e,s),this._chipRipple.setupTriggerEvents(e.nativeElement),this.rippleConfig=i||{},this._animationsDisabled="NoopAnimations"===h}get rippleDisabled(){return this.disabled||this.disableRipple||!!this.rippleConfig.disabled}get selected(){return this._selected}set selected(e){const t=Object(i.c)(e);t!==this._selected&&(this._selected=t,this._dispatchSelectionChange())}get value(){return null!=this._value?this._value:this._elementRef.nativeElement.textContent}set value(e){this._value=e}get selectable(){return this._selectable&&this.chipListSelectable}set selectable(e){this._selectable=Object(i.c)(e)}get removable(){return this._removable}set removable(e){this._removable=Object(i.c)(e)}get ariaSelected(){return this.selectable&&(this._chipListMultiple||this.selected)?this.selected.toString():null}_addHostClassName(){const e=this._elementRef.nativeElement;e.hasAttribute("mat-basic-chip")||"mat-basic-chip"===e.tagName.toLowerCase()?e.classList.add("mat-basic-chip"):e.classList.add("mat-standard-chip")}ngOnDestroy(){this.destroyed.emit({chip:this}),this._chipRipple._removeTriggerEvents()}select(){this._selected||(this._selected=!0,this._dispatchSelectionChange())}deselect(){this._selected&&(this._selected=!1,this._dispatchSelectionChange())}selectViaInteraction(){this._selected||(this._selected=!0,this._dispatchSelectionChange(!0))}toggleSelected(e=!1){return this._selected=!this.selected,this._dispatchSelectionChange(e),this.selected}focus(){this._hasFocus||(this._elementRef.nativeElement.focus(),this._onFocus.next({chip:this})),this._hasFocus=!0}remove(){this.removable&&this.removed.emit({chip:this})}_handleClick(e){this.disabled?e.preventDefault():e.stopPropagation()}_handleKeydown(e){if(!this.disabled)switch(e.keyCode){case h.c:case h.b:this.remove(),e.preventDefault();break;case h.n:this.selectable&&this.toggleSelected(!0),e.preventDefault()}}_blur(){this._ngZone.onStable.asObservable().pipe(Object(r.a)(1)).subscribe(()=>{this._ngZone.run(()=>{this._hasFocus=!1,this._onBlur.next({chip:this})})})}_dispatchSelectionChange(e=!1){this.selectionChange.emit({source:this,isUserInput:e,selected:this._selected})}}))();const m=new n.o("mat-chips-default-options");class C{constructor(e,t,s,i){this._defaultErrorStateMatcher=e,this._parentForm=t,this._parentFormGroup=s,this.ngControl=i}}const v=Object(c.F)(C);let y=0;class f{constructor(e,t){this.source=e,this.value=t}}let I=(()=>(class extends v{constructor(e,t,s,i,h,c,l){super(c,i,h,l),this._elementRef=e,this._changeDetectorRef=t,this._dir=s,this.ngControl=l,this.controlType="mat-chip-list",this._lastDestroyedChipIndex=null,this._destroyed=new a.a,this._uid=`mat-chip-list-${y++}`,this._tabIndex=0,this._userTabIndex=null,this._onTouched=()=>{},this._onChange=()=>{},this._multiple=!1,this._compareWith=(e,t)=>e===t,this._required=!1,this._disabled=!1,this.ariaOrientation="horizontal",this._selectable=!0,this.change=new n.m,this.valueChange=new n.m,this.ngControl&&(this.ngControl.valueAccessor=this)}get selected(){return this.multiple?this._selectionModel.selected:this._selectionModel.selected[0]}get role(){return this.empty?null:"listbox"}get multiple(){return this._multiple}set multiple(e){this._multiple=Object(i.c)(e),this._syncChipsState()}get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this.writeValue(e),this._value=e}get id(){return this._chipInput?this._chipInput.id:this._uid}get required(){return this._required}set required(e){this._required=Object(i.c)(e),this.stateChanges.next()}get placeholder(){return this._chipInput?this._chipInput.placeholder:this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}get focused(){return this._chipInput&&this._chipInput.focused||this._hasFocusedChip()}get empty(){return(!this._chipInput||this._chipInput.empty)&&0===this.chips.length}get shouldLabelFloat(){return!this.empty||this.focused}get disabled(){return this.ngControl?!!this.ngControl.disabled:this._disabled}set disabled(e){this._disabled=Object(i.c)(e),this._syncChipsState()}get selectable(){return this._selectable}set selectable(e){this._selectable=Object(i.c)(e),this.chips&&this.chips.forEach(e=>e.chipListSelectable=this._selectable)}set tabIndex(e){this._userTabIndex=e,this._tabIndex=e}get chipSelectionChanges(){return Object(l.a)(...this.chips.map(e=>e.selectionChange))}get chipFocusChanges(){return Object(l.a)(...this.chips.map(e=>e._onFocus))}get chipBlurChanges(){return Object(l.a)(...this.chips.map(e=>e._onBlur))}get chipRemoveChanges(){return Object(l.a)(...this.chips.map(e=>e.destroyed))}ngAfterContentInit(){this._keyManager=new p.d(this.chips).withWrap().withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr"),this._dir&&this._dir.change.pipe(Object(o.a)(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e)),this._keyManager.tabOut.pipe(Object(o.a)(this._destroyed)).subscribe(()=>{this._allowFocusEscape()}),this.chips.changes.pipe(Object(u.a)(null),Object(o.a)(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>{this._syncChipsState()}),this._resetChips(),this._initializeSelection(),this._updateTabIndex(),this._updateFocusForDestroyedChips(),this.stateChanges.next()})}ngOnInit(){this._selectionModel=new _.c(this.multiple,void 0,!1),this.stateChanges.next()}ngDoCheck(){this.ngControl&&this.updateErrorState()}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.stateChanges.complete(),this._dropSubscriptions()}registerInput(e){this._chipInput=e}setDescribedByIds(e){this._ariaDescribedby=e.join(" ")}writeValue(e){this.chips&&this._setSelectionByValue(e,!1)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this.stateChanges.next()}onContainerClick(e){this._originatesFromChip(e)||this.focus()}focus(){this.disabled||this._chipInput&&this._chipInput.focused||(this.chips.length>0?(this._keyManager.setFirstItemActive(),this.stateChanges.next()):(this._focusInput(),this.stateChanges.next()))}_focusInput(){this._chipInput&&this._chipInput.focus()}_keydown(e){const t=e.target;e.keyCode===h.b&&this._isInputEmpty(t)?(this._keyManager.setLastItemActive(),e.preventDefault()):t&&t.classList.contains("mat-chip")&&(e.keyCode===h.h?(this._keyManager.setFirstItemActive(),e.preventDefault()):e.keyCode===h.e?(this._keyManager.setLastItemActive(),e.preventDefault()):this._keyManager.onKeydown(e),this.stateChanges.next())}_updateTabIndex(){this._tabIndex=this._userTabIndex||(0===this.chips.length?-1:0)}_updateFocusForDestroyedChips(){if(null!=this._lastDestroyedChipIndex)if(this.chips.length){const e=Math.min(this._lastDestroyedChipIndex,this.chips.length-1);this._keyManager.setActiveItem(e)}else this.focus();this._lastDestroyedChipIndex=null}_isValidIndex(e){return e>=0&&e<this.chips.length}_isInputEmpty(e){return!(!e||"input"!==e.nodeName.toLowerCase()||e.value)}_setSelectionByValue(e,t=!0){if(this._clearSelection(),this.chips.forEach(e=>e.deselect()),Array.isArray(e))e.forEach(e=>this._selectValue(e,t)),this._sortValues();else{const s=this._selectValue(e,t);s&&t&&this._keyManager.setActiveItem(s)}}_selectValue(e,t=!0){const s=this.chips.find(t=>null!=t.value&&this._compareWith(t.value,e));return s&&(t?s.selectViaInteraction():s.select(),this._selectionModel.select(s)),s}_initializeSelection(){Promise.resolve().then(()=>{(this.ngControl||this._value)&&(this._setSelectionByValue(this.ngControl?this.ngControl.value:this._value,!1),this.stateChanges.next())})}_clearSelection(e){this._selectionModel.clear(),this.chips.forEach(t=>{t!==e&&t.deselect()}),this.stateChanges.next()}_sortValues(){this._multiple&&(this._selectionModel.clear(),this.chips.forEach(e=>{e.selected&&this._selectionModel.select(e)}),this.stateChanges.next())}_propagateChanges(e){let t=null;t=Array.isArray(this.selected)?this.selected.map(e=>e.value):this.selected?this.selected.value:e,this._value=t,this.change.emit(new f(this,t)),this.valueChange.emit(t),this._onChange(t),this._changeDetectorRef.markForCheck()}_blur(){this._hasFocusedChip()||this._keyManager.setActiveItem(-1),this.disabled||(this._chipInput?setTimeout(()=>{this.focused||this._markAsTouched()}):this._markAsTouched())}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next()}_allowFocusEscape(){-1!==this._tabIndex&&(this._tabIndex=-1,setTimeout(()=>{this._tabIndex=this._userTabIndex||0,this._changeDetectorRef.markForCheck()}))}_resetChips(){this._dropSubscriptions(),this._listenToChipsFocus(),this._listenToChipsSelection(),this._listenToChipsRemoved()}_dropSubscriptions(){this._chipFocusSubscription&&(this._chipFocusSubscription.unsubscribe(),this._chipFocusSubscription=null),this._chipBlurSubscription&&(this._chipBlurSubscription.unsubscribe(),this._chipBlurSubscription=null),this._chipSelectionSubscription&&(this._chipSelectionSubscription.unsubscribe(),this._chipSelectionSubscription=null),this._chipRemoveSubscription&&(this._chipRemoveSubscription.unsubscribe(),this._chipRemoveSubscription=null)}_listenToChipsSelection(){this._chipSelectionSubscription=this.chipSelectionChanges.subscribe(e=>{e.source.selected?this._selectionModel.select(e.source):this._selectionModel.deselect(e.source),this.multiple||this.chips.forEach(e=>{!this._selectionModel.isSelected(e)&&e.selected&&e.deselect()}),e.isUserInput&&this._propagateChanges()})}_listenToChipsFocus(){this._chipFocusSubscription=this.chipFocusChanges.subscribe(e=>{let t=this.chips.toArray().indexOf(e.chip);this._isValidIndex(t)&&this._keyManager.updateActiveItemIndex(t),this.stateChanges.next()}),this._chipBlurSubscription=this.chipBlurChanges.subscribe(()=>{this._blur(),this.stateChanges.next()})}_listenToChipsRemoved(){this._chipRemoveSubscription=this.chipRemoveChanges.subscribe(e=>{const t=e.chip,s=this.chips.toArray().indexOf(e.chip);this._isValidIndex(s)&&t._hasFocus&&(this._lastDestroyedChipIndex=s)})}_originatesFromChip(e){let t=e.target;for(;t&&t!==this._elementRef.nativeElement;){if(t.classList.contains("mat-chip"))return!0;t=t.parentElement}return!1}_hasFocusedChip(){return this.chips.some(e=>e._hasFocus)}_syncChipsState(){this.chips&&this.chips.forEach(e=>{e.disabled=this._disabled,e._chipListMultiple=this.multiple})}}))(),S=(()=>(class{}))()}}]);