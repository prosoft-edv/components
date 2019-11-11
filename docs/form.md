# PsForm
`<ps-form>` is a component for managing your input forms. It automatically blocks the UI via `<ps-block-ui>` while loading Data and has the `<ps-save-bar>` with `<ps-form-errors>` under its content. 

## API
### Import
```javascript
import { PsFormComponent } from '@prosoft/components/form'
```

### Properties
| Name                                                                         | Description
| ---------------------------------------------------------------------------- | -------------
| `form: FormGroup`                                                            | Angular's `FormGroup`
| `formMode: 'create' | 'update'`                                              | Tells the PsForm if you are currently creating or editing data.
| `form: autocomplete`                                                         | --
| `hideSaveAndClose: boolean`                                                  | `true` if a "Save & close"-button should be shown.
| `hideSave: boolean`                                                          | `true` if a "Save"-button should be shown.
| `blocked: boolean`                                                           | `true` if the Savebar shall be blocked.
| `canSave: boolean`                                                           | `true` if the data is valid and can be saved.
| `intlOverride: Partial<IPsFormIntlTexts>`                                    | `IPsFormIntlTexts` if you want to override dispalyed labels.
| `loadFnc: () => Observable<any>`                                             | A function for loading data. this will be called, when the PsForm is initialized.
| `saveFnc: (formRawValue: any, params: IPsFormSaveParams) => Observable<any>` | A function for saving data. this will be called, when the "Save"- or "Save & Close"-Button is clicked.
| `loadSuccess: EventEmitter<PsFormLoadSuccessEvent>`                          | Emmited, after `loadFnc` was successful.
| `loadError: EventEmitter<PsFormLoadErrorEvent>`                              | Emmited, if an error occured during `loadFnc`.
| `saveSuccess: EventEmitter<PsFormSaveSuccessEvent>`                          | Emmited, after `saveFnc` was successful.
| `saveError: EventEmitter<PsFormSaveErrorEvent>`                              | Emmited, if an error occured during `saveFnc`.
| `cancel: EventEmitter<PsFormCancelEvent>`                                    | Emmited, if an cancelation was requested via "Cancel"-button.

## Events
### PsFormEvent
Base class for every PsFormEvent.

### Properties
| Name                            | Description
| ------------------------------- | -----------
| `defaultPrevented: boolean`     | `true`, if the default load success handling is prevented.

### Functions
| Name                          | Description
| ----------------------------- | -----------
| `preventDefault: () => void`  | Prevents the default load success handling from beeing executed.

### PsFormLoadSuccessEvent
extends `PsFormEvent`

### Properties
| Name             | Description
| ---------------- | -----------
| `value: any`     | The loaded value from `loadFnc`.

### PsFormLoadErrorEvent
extends `PsFormEvent`

### Properties
| Name                    | Description
| ----------------------- | -----------
| `(readonly) error: any`   | The error object from `loadFnc`.

### PsFormSaveSuccessEvent
extends `PsFormEvent`

### Properties
| Name                             | Description
| -------------------------------- | -----------
| `(readonly) value: any`            | The data object that was saved.
| `(readonly) saveResponse: any`     | The saveResponse from your save functionality.
| `(readonly) close: boolean`        | `true`, if the "Save & close"-Button was clicked.

### PsFormSaveErrorEvent
extends `PsFormEvent`

### Properties
| Name                             | Description
| -------------------------------- | -----------
| `(readonly) value: any`          | The data object that was saved.
| `(readonly) error: any`          | the error object from `saveFnc`.

### PsFormCancelEvent
extends `PsFormEvent`

## Usage

<!--TODO put this into a seperate file-->
1. You have to override `BasePsFormService` and implement the following two functions:
* `getLabel: (formControl: any) => Observable<string>` which should return the FormControls label.
* `mapDataToError: (errorData: IPsFormErrorData[]) => Observable<IPsFormError[]>` which should return `IPsFormError` with the needed information `errorText` and `data`.

2. Import the PsFormBaseModule forRoot with the created service. Like this:
`PsFormBaseModule.forRoot(DemoPsFormsService)`

Import the module into your module. 

```javascript
@NgModule({
  declarations: [MyComponent],
  imports: [PsFormModule, PsFormBaseModule.forRoot(MyPsFormsService)]
})
export class MyModule {}
```

Now you can use it in your components like this (See demo):

```html
<ps-form
    [form]="setForm ? form : null"
    [formMode]="formMode"
    [loadFnc]="loadFnc"
    [saveFnc]="saveFnc"
    [hideSave]="hideSave"
    [hideSaveAndClose]="hideSaveAndClose"
    [canSave]="canSave"
    [blocked]="blocked"
    (loadSuccess)="onEvent($event, 'loadSuccess')"
    (loadError)="onEvent($event, 'loadError')"
    (saveSuccess)="onEvent($event, 'saveSuccess')"
    (saveError)="onEvent($event, 'saveError')"
    (cancel)="onEvent($event, 'cancel')">
    <mat-card>
      <form [formGroup]="form">
        <mat-form-field>
          <mat-label>Input 1</mat-label>
          <input type="text" matInput formControlName="input1" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Input 2</mat-label>
          <input type="text" matInput formControlName="input2" />
        </mat-form-field>
      </form>
    </mat-card>
  </ps-form>
```
