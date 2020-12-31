import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { html } from 'lit-html';

@Component({
  selector: 'app-web-comp-demo',
  template: `
    <h1>Web Comp</h1>
    <ps-web-comp>
      <ul>
        <li>Let's have some different text!</li>
        <li>In a list!</li>
      </ul>
    </ps-web-comp>
    <ps-web-comp [tpl]="tpl">
      <div>test</div>
    </ps-web-comp>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WebCompDemoComponent {
  public tpl = (item: any) => html`<span>Hello ${item.name}</span>`;
}
