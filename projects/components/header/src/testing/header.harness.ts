import { BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate, TestElement } from '@angular/cdk/testing';

export interface PsHeaderHarnessFilters extends BaseHarnessFilters {
  /** Only find instances whose title matches the given value. */
  caption?: string | RegExp;
  /** Only find instances whose subtitle matches the given value. */
  description?: string | RegExp;
}

/** Selectors for different sections of the mat-card that can container user content. */
export const enum PsHeaderSection {
  CAPTION = '.ps-header__caption',
  DESCRIPTION = '.ps-header__description',
  ACTIONS = '.ps-header__actions',
}

/** Harness for interacting with a standard mat-card in tests. */
export class PsHeaderHarness extends ContentContainerComponentHarness<PsHeaderSection> {
  /** The selector for the host element of a `PsHeader` instance. */
  static hostSelector = 'ps-header';

  /**
   * Gets a `HarnessPredicate` that can be used to search for a `PsHeaderHarness` that meets
   * certain criteria.
   * @param options Options for filtering which card instances are considered a match.
   * @return a `HarnessPredicate` configured with the given options.
   */
  static with(options: PsHeaderHarnessFilters = {}): HarnessPredicate<PsHeaderHarness> {
    return new HarnessPredicate(PsHeaderHarness, options)
      .addOption('caption', options.caption, (harness, title) => HarnessPredicate.stringMatches(harness.getCaptionText(), title))
      .addOption('description', options.description, (harness, subtitle) =>
        HarnessPredicate.stringMatches(harness.getDescriptionText(), subtitle)
      );
  }

  private _caption = this.locatorForOptional(PsHeaderSection.CAPTION);
  private _captionChildren = this.locatorForAll(PsHeaderSection.CAPTION + ' > *');
  private _description = this.locatorForOptional(PsHeaderSection.DESCRIPTION);
  private _descriptionChildren = this.locatorForAll(PsHeaderSection.DESCRIPTION + ' > *');
  private _actionsChildren = this.locatorForAll(PsHeaderSection.ACTIONS + ' > *');

  /** Gets the cards's caption text. */
  async getCaptionText(): Promise<string> {
    return (await this._caption())?.text() ?? '';
  }

  /** Gets the cards's caption text. */
  async getCaptionTemplateNodes(): Promise<TestElement[]> {
    return (await this._captionChildren()) ?? [];
  }

  /** Gets the cards's description text. */
  async getDescriptionText(): Promise<string> {
    return (await this._description())?.text() ?? '';
  }

  /** Gets the cards's description text. */
  async getDescriptionTemplateNodes(): Promise<TestElement[]> {
    return (await this._descriptionChildren()) ?? [];
  }

  /** Gets the cards's description text. */
  async getActionTemplateNodes(): Promise<TestElement[]> {
    return (await this._actionsChildren()) ?? [];
  }
}
