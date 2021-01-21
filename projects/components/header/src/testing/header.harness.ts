import { BaseHarnessFilters, ContentContainerComponentHarness } from '@angular/cdk/testing';

export interface PsHeaderHarnessFilters extends BaseHarnessFilters {
  captionText?: string | RegExp;
  descriptionText?: string | RegExp;
}

export class PsHeaderHarness extends ContentContainerComponentHarness {
  static hostSelector = 'ps-header';
}
