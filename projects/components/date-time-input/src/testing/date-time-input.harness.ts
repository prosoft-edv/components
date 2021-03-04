// tslint:disable: member-ordering
import { BaseHarnessFilters, HarnessPredicate } from '@angular/cdk/testing';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';

/** A set of criteria that can be used to filter a list of `MatSelectHarness` instances. */
// tslint:disable-next-line: no-empty-interface
export interface PsDateTimeInputHarnessFilters extends BaseHarnessFilters {}

/** Harness for interacting with a standard mat-select in tests. */
export class PsDateTimeInputHarness extends MatFormFieldControlHarness {
  static hostSelector = 'ps-date-time-input';

  _dateInput = this.locatorFor('.ps-date-time-picker__date-input');
  _timeInput = this.locatorFor('.ps-date-time-picker__time-input');

  /**
   * Gets a `HarnessPredicate` that can be used to search for a `PsDateTimeInputHarness` that meets
   * certain criteria.
   * @param options Options for filtering which select instances are considered a match.
   * @return a `HarnessPredicate` configured with the given options.
   */
  static with(options: PsDateTimeInputHarnessFilters = {}): HarnessPredicate<PsDateTimeInputHarness> {
    return new HarnessPredicate(PsDateTimeInputHarness, options);
  }

  /** Gets a boolean promise indicating if the select is disabled. */
  async isDisabled(): Promise<boolean> {
    return (await this._dateInput()).getProperty('disabled') && (await this._timeInput()).getProperty('disabled');
  }
}
