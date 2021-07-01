import { IPsTableAction, PsTableAction } from '../../src/models';

export abstract class PsTableActionStoreBase<T> {
  abstract get(declaration: IPsTableAction<T>): PsTableAction<T>;
}

export class PsTableActionStore<T> extends PsTableActionStoreBase<T> {
  private readonly _store = new WeakMap<IPsTableAction<T>, PsTableAction<T>>();

  /**
   * Gets the existing PsTableAction object by the declaration (IPsTableAction<T>) from the store or creates a new one.
   *
   * Because actions can have observables as children, we cannot create for each declaration the coresponding PsTableAction<T> at the beginning.
   * This forces us to create the PsTableAction<T> dynamicly. But we do not want to execute the same observables multiple times, so we cache them.
   * Otherwise the observable would be executed for each row.
   *
   * @param declaration Action declaration information
   * @returns Existing or new PsTableAction
   */
  public get(declaration: IPsTableAction<T>): PsTableAction<T> {
    if (!this._store.has(declaration)) {
      const action = new PsTableAction<T>(declaration, this);
      this._store.set(declaration, action);
    }

    return this._store.get(declaration);
  }
}
