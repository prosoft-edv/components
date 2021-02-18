import { ChangeDetectionStrategy, Component, Inject, InjectionToken } from '@angular/core';

export const COMPONENT_CAPTION = new InjectionToken<string>(undefined);
export const ADDITIONAL_TABS = new InjectionToken<{ tabLabel: string; routerLink: string[] }[]>(undefined);

@Component({
  selector: 'app-component-page-wrapper',
  templateUrl: './component-page-wrapper.component.html',
  styles: [
    `
      .app-component-page-wrapper__tab-content-wrapper {
        margin-top: 3em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPageWrapperComponent {
  public activeLink: string;

  constructor(
    @Inject(COMPONENT_CAPTION) public caption: string,
    @Inject(ADDITIONAL_TABS) public additionalTabs: { tabLabel: string; routerLink: string[] }[]
  ) {}
}
