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
  | Name                                                | Description
  | --------------------------------------------------- | -------------
  | `myDirective`                                       | I tell you, what `myDirective` does.

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
  | `myEvent: EventEmitter<myType>`                     | I tell you, what `myEvent` does.

  ### Functions <a name="PsSelectComponentFunctions"></a>
  | Name                                                | Description
  | --------------------------------------------------- | -------------
  | `myFunction(myInputs: myType): myReturnType`        | I tell you, what `myFunction` does.

  ### Types <a name="PsSelectComponentTypes"></a>
  | Name                                                | Description
  | --------------------------------------------------- | -------------
  | `myType`                                            | I tell you, what `myType` does.

  ### Misc <a name="PsSelectComponentMisc"></a>
  <!--Misc stuff here-->
---

  ## Prerequisites/Requirements <a name="PsSelectRequirements"></a>
  <!--Requirements here-->

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
    <ps-select>

    </ps-select>
  ```
