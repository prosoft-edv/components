import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PsBlockUiComponent } from './block-ui.component';
import { PsBlockUiModule } from './block-ui.module';

@Component({
  selector: 'ps-test-component',
  template: `
    <ps-block-ui [blocked]="blocked" [spinnerText]="spinnerText">
      <div id="content">test text</div>
    </ps-block-ui>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TestComponent {
  public blocked = false;
  public spinnerText: string = null;

  @ViewChild(PsBlockUiComponent, { static: true }) blockui: PsBlockUiComponent;

  constructor(public cd: ChangeDetectorRef) {}
}

describe('PsBlockUiComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, CommonModule, PsBlockUiModule],
        declarations: [TestComponent],
      }).compileComponents();
    })
  );

  it(
    'should work',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(TestComponent);
      const component = fixture.componentInstance;
      expect(component).toBeDefined();
      fixture.detectChanges();

      const contentDebugEl = fixture.debugElement.query(By.css('#content'));
      expect(contentDebugEl).not.toBe(null);
      expect(contentDebugEl.nativeElement.textContent).toBe('test text');
      expect(fixture.debugElement.query(By.directive(MatSpinner))).toBe(null);

      component.blocked = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(MatSpinner))).not.toBe(null);
      const containerEl = fixture.debugElement.query(By.css('.ps-block-ui__overlay-content'));
      expect(containerEl.nativeElement.children.length).toBe(1);

      component.spinnerText = 'spinner text';
      fixture.detectChanges();
      expect(containerEl.nativeElement.children.length).toBe(2);
      expect(containerEl.nativeElement.children[1].textContent).toBe('spinner text');
    })
  );
});
