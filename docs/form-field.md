# PsFormField
`<ps-form-field>` extends the [MatFormFieldComponent](https://material.angular.io/components/form-field/overview) from Angular Material with features like:
* Label handling (labels can be extracted from FormControl informations for example)
* Handling controls with no `formControlName` given


## API
### Import
```javascript
import { PsFormFieldComponent } from '@prosoft/components/form-field'
```

### Properties
| Name                                    | Description
| --------------------------------------- | -------------
| `createLabel: boolean`                  | If `true` a label will be created automatically based on the information of the given FormControl.
| `floatLabel: FloatLabelType`            | Behaviour of the label. See [FloatLabelType](https://material.angular.io/components/form-field/api) for more information.
| `hint: string`                          | Handels the `<mat-hint>` automatically based on this hintText. See [MatHintComponent](https://material.angular.io/components/form-field/overview#hint-labels) for more                                              information.
| `appearance: MatFormFieldAppearance`    | Changes the appearance of the `<mat-form-field>`. See [MatFormFieldComponent](https://material.angular.io/components/form-field/overview#form-field-appearance-variants)                                            for more information.

## Usage

1. You have to override its `BasePsFormService` and override the following two functions:
* `getLabel: (formControl: any) => Observable<string>` which should return the FormControls label.
* `mapDataToError: (errorData: IPsFormErrorData[]) => Observable<IPsFormError[]>` which should return `IPsFormError` with the needed information `errorText` and `data`.

2. Import the PsFormBaseModule forRoot with the created service. Like this:
`PsFormBaseModule.forRoot(DemoPsFormsService)`


Import the modules into your module. 

```javascript
@NgModule({
  declarations: [MyComponent],
  imports: [PsFormFieldModule, PsFormBaseModule.forRoot(MyPsFormsService)]
})
export class MyModule {}
```

Now you can use it in your components like this:

```html
<form [formGroup]="form">
  <ps-form-field style="margin: .5em;" [appearance]="'fill'" [hint]="'hint text'">
    <mat-label>Fill</mat-label>
    <input matInput type="text" />
  </ps-form-field>
</form>
```
