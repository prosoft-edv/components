<link href="style.css" rel="stylesheet"></link> 

# PsSelect <a name="PsSelect"></a>
`<ps-select>` enhances `<mat-select>` with some comfort and additional features. For basic behaviour check [MatSelect](https://material.angular.io/components/select/overview). 

---

  ## API <a name="PsSelectApi"></a>   
  ### Import <a name="PsSelectImport"></a>
  ```ts | js
    import { PsSelectComponent } from '@prosoft/components/select'
  ```

---

  ## Directives <a name="PsSelectDirectives"></a>
  | Name                      | Description
  | ------------------------- | -------------
  | `psSelectTriggerTemplate` | Use this, if you want to change the apearance of the selected item.
  | `psSelectOptionTemplate`  | Use this, if you want to change the apearance of the items of the selection popup.

---

  ## PsSelectComponent <a name="PsSelectComponent"></a>
  ### Properties <a name="PsSelectComponentProperties"></a>
  | Name                  | Description
  | --------------------- | -------------
  | `dataSource: any`     | The selects's source of data.
  | `clearable: boolean`  | If `true`, PsSelect will show a 'Clear' button at the end of the selected value. If clicked, the selected item will be removed.

  ### Events <a name="PsSelectComponentEvents"></a>
  | Name                                                | Description
  | --------------------------------------------------- | -------------
  | `openedChange: EventEmitter<boolean>`               | Emitted, if the opened state of the selection popup is changed.
  | `selectionChange: EventEmitter<MatSelectChange>`    | Emitted, if the selected item of the select changed. For MatSelectChange properties check [MatSelectChange](https://material.angular.io/components/select/api#MatSelectChange).

---

  ## Implementation <a name="PsSelectImplementation"></a>
  Import the module into your module. 

  ```ts | js
    @NgModule({
      declarations: [MyComponent],
      imports: [PsSelectModule]
    })
    export class MyModule {}
  ```

  Now you can use it in your components like this:

  ```html
    <ps-select [(ngModel)]="ngModelValue" [dataSource]="items">
      <ng-container *psSelectTriggerTemplate="let item">
        color: <span [style.color]="item.value" class="asdf">{{ item.viewValue }}</span>
      </ng-container>
      <ng-container *psSelectOptionTemplate="let item">
        <div>color:</div>
        <span [style.color]="item.value.color" [style.font-size]="item.value.size" class="asdf">{{ item.label }}</span>
      </ng-container>
    </ps-select>
  ```
