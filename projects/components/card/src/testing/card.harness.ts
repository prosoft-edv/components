import { BaseHarnessFilters, ContentContainerComponentHarness } from '@angular/cdk/testing';

export interface PsViewHarnessFilters extends BaseHarnessFilters {
  errorText?: string | RegExp;
}

export class PsHeaderHarness extends ContentContainerComponentHarness {
  static hostSelector = 'ps-header';
}
