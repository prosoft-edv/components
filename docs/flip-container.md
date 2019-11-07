# PsFlipContainer
`<ps-flip-container>` is a component for switching between two controls that are on the same spot.

## API
### Import
```javascript
import { PsFlipContainerComponent } from '@prosoft/components/flip-container'
```

### Properties
| Name                              | Description
| --------------------------------- | -------------
| `removeHiddenNodes: boolean`      | Removes the DOM nodes from the hidden side of the container.

### Directives
| Name                              | Description
| --------------------------------- | -------------
| `psFlipContainerFront`            | Declares the front side of the containers content.
| `psFlipContainerBack`             | Declares the back side of the containers content.

## Usage
Import the module into your module. 

```javascript
@NgModule({
  declarations: [MyComponent],
  imports: [PsFlipContainerModule]
})
export class MyModule {}
```

Now you can use it in your components like this:

```html
  <ps-flip-container #flip>
    <div *psFlipContainerFront>
      Front side content
    </div>
    <div *psFlipContainerBack>
      Back side content
    </div>
  </ps-flip-container>
```
