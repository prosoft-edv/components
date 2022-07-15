import { ChangeDetectionStrategy, Component } from '@angular/core';
import { components } from '../../component-route.definition';

@Component({
  selector: 'app-home-page',
  template: `
    <div style="text-align: center; font-size: 18px; line-height: 1.5; font-weight: 600;">
      prosoft/components enhances and adds UI components based on the
      <a href="https://material.io/components">Material Design specification</a>
    </div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4em; margin-top: 4em;">
      <a [routerLink]="component.routerLink" *ngFor="let component of components">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ component.name }}</mat-card-title>
          </mat-card-header>
          <div [innerHtml]="component.description"></div>
        </mat-card>
      </a>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  components = components;
}
