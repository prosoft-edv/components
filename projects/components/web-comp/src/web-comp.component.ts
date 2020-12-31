import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WebComp } from './web-comp';

let defined = false;

@Component({
  selector: 'ps-web-comp',
  template: `
    <web-comp #cmp>
      <div slot="content">
        <ng-content></ng-content>
      </div>
    </web-comp>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PsWebCompComponent implements OnInit {
  @Input() public tpl: any;
  @ViewChild('cmp', { read: ElementRef, static: true }) public cmp: ElementRef;

  constructor() {
    if (!defined) {
      window.customElements.define('web-comp', WebComp);
      defined = true;
    }
  }

  public ngOnInit() {
    this.cmp.nativeElement.tpl = this.tpl;
  }
}
