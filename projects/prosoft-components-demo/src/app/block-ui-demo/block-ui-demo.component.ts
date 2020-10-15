import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  QueryList,
  ContentChildren,
  OnInit,
  AfterContentInit,
  OnChanges,
  Input,
} from '@angular/core';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-block-ui-demo',
  template: `
    <mat-checkbox [(ngModel)]="blocked">blocked</mat-checkbox>
    <mat-form-field style="display:block">
      <mat-label>Text for the block ui</mat-label>
      <input type="text" matInput [(ngModel)]="spinnerText" />
    </mat-form-field>
    <div style="height: 1em;"></div>
    <div style="height: 50px; overflow: auto;">
      <ps-block-ui [blocked]="blocked">
        <div style="height: 50px;">
          this box with overflow auto will be blocked without flickering
        </div>
      </ps-block-ui>
    </div>
    <div style="height: 1em;"></div>
    <div style="height: 50px; overflow: auto;">
      <ps-block-ui [blocked]="blocked" [spinnerText]="spinnerText">
        <div style="height: 50px;">
          this box with overflow auto will be blocked without flickering
        </div>
      </ps-block-ui>
    </div>
    <div style="height: 1em;"></div>
    <ps-block-ui [blocked]="blocked" [spinnerText]="spinnerText">
      <mat-card>
        this will be blocked
      </mat-card>
    </ps-block-ui>
    <div style="height: 1em;"></div>
    <ps-block-ui [blocked]="blocked" [spinnerText]="spinnerText">
      <mat-card style="height: 30vh">
        this will also be blocked
      </mat-card>
    </ps-block-ui>
    <div style="height: 1em;"></div>
    <ps-block-ui [blocked]="blocked" [spinnerText]="spinnerText">
      <mat-card style="height: 300vh">
        this will also be blocked to show position sticky
      </mat-card>
    </ps-block-ui>
    <div style="height: 100vh"></div>

    <app-ps-select *ngIf="blocked" [test]="true">
      <div></div>
    </app-ps-select>
  `,
  styles: [
    `
      app-block-ui-demo .mat-card {
        background-color: #ccc;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BlockUiDemoComponent implements OnInit, AfterContentInit {
  public blocked = true;
  public spinnerText = 'some custom text that will be displayed while the view is blocked';
  constructor() {
    console.log('constructor x');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit x');
  }
  ngOnInit(): void {
    console.log('ngOnInit x');
  }
}

@Component({
  selector: 'app-ps-select',
  template: `
    <app-mat-select [test]="test">
      <app-test-data [test]="test"></app-test-data>
    </app-mat-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TestPsSelectComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() get test(): boolean {
    return this._test;
  }
  set test(value: boolean) {
    this._test = value;
    console.log('ps-select input');
  }
  _test: boolean;

  constructor() {
    console.log('ps-select constructor');
  }

  ngOnChanges(): void {
    console.log('ps-select ngOnChanges');
  }
  ngAfterContentInit(): void {
    console.log('ps-select ngAfterContentInit');
  }
  ngOnInit(): void {
    console.log('ps-select ngOnInit');
  }
}

@Component({
  selector: 'app-mat-select',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Test2Component implements OnInit, AfterContentInit, OnChanges {
  @Input() get test(): boolean {
    return this._test;
  }
  set test(value: boolean) {
    this._test = value;
    console.log('mat-select input');
  }
  _test: boolean;

  @ContentChildren(MatOption, { descendants: true }) set options(value: QueryList<MatOption>) {
    console.log('mat-select value', value);
  }

  constructor() {
    console.log('mat-select constructor');
  }

  ngOnChanges(): void {
    console.log('mat-select ngOnChanges');
  }
  ngAfterContentInit(): void {
    console.log('mat-select ngAfterContentInit');
  }
  ngOnInit(): void {
    console.log('mat-select ngOnInit');
  }
}

@Component({
  selector: 'app-test-data',
  template: `
    <ng-content></ng-content>
    <mat-option>test</mat-option>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TestComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() get test(): boolean {
    return this._test;
  }
  set test(value: boolean) {
    this._test = value;
    console.log('test-data input');
  }
  _test: boolean;

  @ContentChildren(MatOption) set options(value: QueryList<MatOption>) {
    console.log('test-data value', value);
  }

  constructor(matSelect: Test2Component) {
    console.log('test-data constructor', matSelect);
  }

  ngOnChanges(): void {
    console.log('test-data ngOnChanges');
  }
  ngAfterContentInit(): void {
    console.log('test-data ngAfterContentInit');
  }
  ngOnInit(): void {
    console.log('test-data ngOnInit');
  }
}
