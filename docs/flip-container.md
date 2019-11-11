<link href="style.css" rel="stylesheet"></link> 

# PsFlipContainer <a name="PsFlipContainer"></a>
`<ps-flip-container>` is a component for switching between two controls that are on the same spot.

---

  ## API <a name="PsFlipContainerApi"></a>   
  ### Import <a name="PsFlipContainerImport"></a>
  ```ts | js
    import { PsFlipContainerComponent } from '@prosoft/components/my-component'
  ```

---

  ## Directives <a name="PsFlipContainerDirectives"></a>
  | Name                              | Description
  | --------------------------------- | -------------
  | `psFlipContainerFront`            | Declares the front side of the containers content.
  | `psFlipContainerBack`             | Declares the back side of the containers content.

---

  ## PsFlipContainerComponent <a name="PsFlipContainerComponent"></a>
  ### Properties <a name="PsFlipContainerComponentProperties"></a>
  | Name                              | Description
  | --------------------------------- | -------------
  | `removeHiddenNodes: boolean`      | Removes the DOM nodes from the hidden side of the container.

  ### Functions <a name="PsFlipContainerComponentFunctions"></a>
  | Name                              | Description
  | ----------------------------------| -------------
  | `toggleFlip(): void`              | Toggles the flip animation and the shows the opposite side of the PsFlipContainer.

---

  ## Implementation <a name="PsFlipContainerImplementation"></a>
  Import the module into your module. 

  ```ts | js
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
