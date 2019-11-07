# PsForm
`<ps-form>` is a component for managing your input forms. 

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

## Interfaces
### PsFormLoadSuccessEvent
| Name | Description
| ---- | -----------
|      |

### PsFormLoadErrorEvent
| Name | Description
| ---- | -----------
|      |

### PsFormSaveSuccessEvent
| Name | Description
| ---- | -----------
|      |

### PsFormSaveErrorEvent
| Name | Description
| ---- | -----------
|      |

### PsFormCancelEvent
| Name | Description
| ---- | -----------
|      |

## Usage
Import the module into your module. 

```javascript
@NgModule({
  declarations: [MyComponent],
  imports: [PsFormModule]
})
export class MyModule {}
```

Now you can use it in your components like this:

```html
<ps-form>

</ps-form>
```
