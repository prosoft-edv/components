<link href="style.css" rel="stylesheet"></link>

# PsSavebar <a name="PsSavebar"></a>

`<ps-savebar>` is a component for handling save, save & close and cancel your input forms. It will create a Savebar under its content with sticky functionality depending on `FormGroups` state.

You can also use it for wizard-like behavior with its forward and backward buttons.

---

## API <a name="PsSavebarApi"></a>

### Import <a name="PsSavebarImport"></a>

```ts | js
import { PsSavebarModule } from '@prosoft/components/savebar';
```

---

## Directives <a name="PsSavebarDirectives"></a>

| Name                    | Description                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `psSavebarRightContent` | If set, you can add additional components to the right side of PsSavebar's default buttons. |

---

## PsSavebarComponent <a name="PsSavebarComponent"></a>

### Properties <a name="PsSavebarComponentProperties"></a>

| Name                                            | Description                                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `form: FormGroup`                               | Angular's `FormGroup`                                                                                  |
| `mode: 'sticky' \| 'fixed' \| 'auto' \| 'hide'` | Sets the mode of the Savebar.                                                                          |
| `canSave: boolean`                              | If set, the savebar checks this value additionally to `FormGroups` state.                              |
| `canStepFwd: boolean`                           | (In wizard) Checks, if you can step to the next part of the wizard.                                    |
| `canStepBack: boolean`                          | (In wizard) Checks, if you can step to the previous part of the wizard.                                |
| `intlOverride: Partial<IPsSavebarIntlTexts>`    | If you want to override dispalyed labels.                                                              |
| `saveKey: string`                               | The keyboard key, which is used in combination with 'ctrl' as save shortcut. (default 's' => ctrl + s) |

### Events <a name="PsSavebarComponentEvents"></a>

| Name                               | Description                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| `save: EventEmitter<void>`         | If you handle this, a 'Save' button is shown.                                                       |
| `saveAndClose: EventEmitter<void>` | If you handle this, a 'Save & close' button is shown.                                               |
| `step: EventEmitter<number>`       | If you handle this, 'Next' and 'Previous' buttons are shown. The `number` is the next steps number. |
| `cancel: EventEmitter<void>`       | If you handle this, a 'Cancel' button is shown.                                                     |

### Types <a name="PsSavebarComponentTypes"></a>

### Mode

| Name             | Description                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `sticky`         | The Savebar sticks to the bottom of the screen. When scrolling, it overlaps its content until it reaches its contents end.             |
| `fixed`          | The Savebar is fixed on the bottom of its content.                                                                                     |
| `(default) auto` | (`form` has to be set) The mode is switched automatically between `sticky` and `fixed` depending on the `FormGroups` "pristine" state. |
| `hide`           | The Savebar is not shown.                                                                                                              |

---

## Prerequisites/Requirements <a name="PsSavebarRequirements"></a>

1. You have to override `BasePsFormService` and implement the following two functions:

- > `getLabel(formControl: any): Observable<string>` which should return the FormControls label.
- > `mapDataToError(errorData: IPsFormErrorData[]): Observable<IPsFormError[]>` which should return `IPsFormError` with the needed information `errorText` and `data`.

2. Import the PsFormBaseModule forRoot with the created service in your AppModule. Like this:
   `PsFormBaseModule.forRoot(DemoPsFormsService)`

---

## Implementation <a name="PsSavebarImplementation"></a>

Import the module into your module.

```ts | js
@NgModule({
  declarations: [MyComponent],
  imports: [PsSavebarModule],
})
export class MyModule {}
```

Now you can use it in your components like this:

```html
<ps-savebar
  [form]="form"
  [canStepFwd]="true"
  [canStepBack]="true"
  (save)="onButtonClick('save')"
  (saveAndClose)="onButtonClick('saveAndClose')"
  (cancel)="onButtonClick('cancel')"
  (step)="onButtonClick($event < 0 ? 'prev' : 'next')"
>
  <mat-card>
    <form [formGroup]="form">
      <mat-form-field>
        <mat-label>Input 1</mat-label>
        <input type="text" matInput formControlName="input1" />
      </mat-form-field>
      <div style="height: 100vh;"></div>
      <mat-form-field>
        <mat-label>Input 2</mat-label>
        <input type="text" matInput formControlName="input2" />
      </mat-form-field>
    </form>
  </mat-card>
  <ng-container *psSavebarRightContent>
    <button mat-stroked-button type="button" (click)="onButtonClick('custom')">
      Custom Button
    </button>
  </ng-container>
</ps-savebar>
```
