# PsBlockUi
`<ps-block-ui>` is a component for blocking controls. Most common use is for blocking forms while loading data.

While ` blocked === true` all of `<ps-block-ui>`'s content is overlayed by a transparent frame with a loading spinner and an optional `spinnerText`. During blocked-state it's not possible to click any control underneath the block-ui.

## API
### Import
```javascript
import { PsBlockUiComponent  } from '@prosoft/components/block-ui'
```

### Properties
| Name                    | Description
| ----------------------- | -------------
| `blocked: boolean`      | Toggles the blocking overlay
| `spinnerText: string`   | (optional) Text, that will be shown under the blocking spinner      

## Usage
Import the module into your module. 

```javascript
@NgModule({
  declarations: [MyComponent],
  imports: [PsBlockUiModule]
})
export class MyModule {}
```

Now you can use it in your components like this:

```html
<ps-block-ui [blocked]="blocked" [spinnerText]="spinnerText">
  <mat-card>
    this will be blocked
  </mat-card>
</ps-block-ui>
```
