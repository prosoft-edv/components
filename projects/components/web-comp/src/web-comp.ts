import { html, render, TemplateResult } from 'lit-html';

export class WebComp extends HTMLElement {
  public set tpl(tplFn: (item: any) => TemplateResult) {
    const values = [{ name: 'asdf' }, { name: 'foo' }, { name: 'bar' }];

    render(
      html`
        <ul>
          ${tplFn ? values.map((item) => html`<li>${tplFn(item)}</li>`) : '<li>no tpl function</li>'}
        </ul>
      `,
      this._list
    );
  }

  private _shadowRoot: ShadowRoot;
  private _list: HTMLDivElement;

  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadowRoot.innerHTML =
      '<h2>Web Component</h2><span>Slot Content:</span> <slot name="content">My default text</slot><div>Template List:</div><div id="list"></div>';
    this._list = this._shadowRoot.getElementById('list') as HTMLDivElement;
  }

  connectedCallback() {}
}
