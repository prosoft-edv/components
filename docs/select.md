# PsSelect
`<ps-select>` enhances `<mat-select>` with some comfort and additional features. For basic behaviour check [MatSelect](https://material.angular.io/components/select/overview)

## API
### Import
```javascript
import { PsSelectComponent } from '@prosoft/components/select'
```

### Properties
| Name                                             | Description
| ------------------------------------------------ | -------------
| `dataSource: any`                                | The selects's source of data.
| `clearable: boolean`                             | If `true`, PsSelect will show a 'Clear' button at the end of the selected value. If clicked, the selected item will be removed.

### DataSource
The source of data can be provided in three ways (in order of complexity):
* Simple data array (each object represents one select option)
* Stream that emits a data array each time the array changes
* `DataSource` object that implements the connect/disconnect interface.


## Usage
Import the module into your module. 

```javascript
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
