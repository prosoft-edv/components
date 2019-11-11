<!-- # PsFormErrors
`<ps-form-errors>` is a control, that extracts all validation errors from a given 'FormGroup' and shows them as chips.

## API
### Import
```javascript
import { PsFormErrorsComponent } from '@prosoft/components/form-errors'
```

### Properties
| Name                   | Description
| -----------------------| -------------
| `form: FormGroup`      | The `FormGroup` which you want to show the errors from.

## Usage

1. You have to override `BasePsFormService` and implement the following two functions:
* `getLabel: (formControl: any) => Observable<string>` which should return the FormControls label.
* `mapDataToError: (errorData: IPsFormErrorData[]) => Observable<IPsFormError[]>` which should return `IPsFormError` with the needed information `errorText` and `data`.

2. Import the PsFormBaseModule forRoot with the created service. Like this:
`PsFormBaseModule.forRoot(DemoPsFormsService)`


Import the modules into your module. 

```javascript
@NgModule({
  declarations: [MyComponent],
  imports: [PsFormErrorsModule, PsFormBaseModule.forRoot(MyPsFormsService)]
})
export class MyModule {}
```

Now you can use it in your components like this:

```html
<ps-form-errors [form]="form"></ps-form-errors>
``` -->




<link href="style.css" rel="stylesheet"></link> 

# PsFormErrors <a name="PsFormErrors"></a>
`<ps-form-errors>` is a control, that extracts all validation errors from a given 'FormGroup' and shows them as chips.

---

  ## API <a name="PsFormErrorsApi"></a>   
  ### Import <a name="PsFormErrorsImport"></a>
  ```ts | js
    import { PsFormErrorsComponent } from '@prosoft/components/form-errors'
  ```

---

  ## PsFormErrorsComponent <a name="PsFormErrorsComponent"></a>
  ### Properties <a name="PsFormErrorsComponentProperties"></a>
  | Name              | Description
  | ----------------- | -------------
  | `form: FormGroup` | The `FormGroup` which you want to show the errors from.

---

  ## Prerequisites/Requirements <a name="PsFormErrorsRequirements"></a>
  
  1. You have to override `BasePsFormService` and implement the following two functions:
  * > `getLabel(formControl: any): Observable<string>` which should return the FormControls label.
  * > `mapDataToError(errorData: IPsFormErrorData[]): Observable<IPsFormError[]>` which should return `IPsFormError` with the needed information `errorText` and `data`.

  2. Import the PsFormBaseModule forRoot with the created service in your AppModule. Like this:
  `PsFormBaseModule.forRoot(DemoPsFormsService)`

---

  ## Implementation <a name="PsFormErrorsImplementation"></a>
  Import the module into your module. 

  ```ts | js
    @NgModule({
      declarations: [MyComponent],
      imports: [PsFormErrorsModule]
    })
    export class MyModule {}
  ```

  Now you can use it in your components like this:

  ```html
    <ps-form-errors [form]="form"></ps-form-errors>
  ```
