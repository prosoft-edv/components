import { isObservable, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { PsTableActionStoreBase } from './helper/action-store';

export interface IPsTableSortDefinition {
  prop: string;
  displayName: string;
}

export interface IPsTableUpdateDataInfo {
  currentPage: number | null;
  pageSize: number | null;
  searchText: string | null;
  sortDirection: 'asc' | 'desc' | null;
  sortColumn: string | null;
}

export interface IExtendedPsTableUpdateDataInfo<TTrigger> extends IPsTableUpdateDataInfo {
  currentPage: number;
  pageSize: number;
  triggerData: TTrigger;
}

export enum PsTableActionScope {
  row = 1,
  list = 2,
  // tslint:disable-next-line:no-bitwise
  all = row | list,
}

export interface IPsTableAction<T> {
  label: string;
  icon: string;
  isSvgIcon?: boolean;
  iconColor?: string;
  children?: IPsTableAction<T>[] | Observable<IPsTableAction<T>[]>;
  scope: PsTableActionScope;
  isDisabledFn?: (items: T[]) => boolean;
  isHiddenFn?: (items: T[]) => boolean;
  actionFn?: (items: T[]) => void;
  routerLink?: (item: T) => [];
  routerLinkQueryParams?: (item: T) => { [key: string]: any };
}

export class PsTableAction<T> {
  public readonly label: string;
  public readonly icon: string;
  public readonly isSvgIcon: boolean;
  public readonly iconColor?: string;
  public readonly scope: PsTableActionScope;
  public readonly isDisabledFn?: (items: T[]) => boolean;
  public readonly isHiddenFn?: (items: T[]) => boolean;
  public readonly actionFn?: (items: T[]) => void;
  public readonly isObservable: boolean;
  public readonly hasChildren: boolean;
  public readonly routerLink?: (item: T) => string[];
  public readonly routerLinkQueryParams?: (item: T) => { [key: string]: any };
  public children$: Observable<PsTableAction<T>[]>;

  public get isLoading(): boolean {
    return this._isLoading;
  }
  private _isLoading = false;

  constructor(declaration: IPsTableAction<T>, store: PsTableActionStoreBase<T>) {
    this.label = declaration.label;
    this.icon = declaration.icon;
    this.isSvgIcon = declaration.isSvgIcon === true;
    this.iconColor = declaration.iconColor;
    this.scope = declaration.scope;
    this.isDisabledFn = declaration.isDisabledFn;
    this.isHiddenFn = declaration.isHiddenFn;
    this.actionFn = declaration.actionFn;
    this.routerLink = declaration.routerLink;
    this.routerLinkQueryParams = declaration.routerLinkQueryParams;

    this.isObservable = isObservable(declaration.children);
    this.hasChildren = Array.isArray(declaration.children) || this.isObservable;

    if (this.hasChildren) {
      this.children$ = isObservable(declaration.children)
        ? of(void 0).pipe(
            tap(() => (this._isLoading = true)),
            switchMap(() => declaration.children as Observable<IPsTableAction<T>[]>),
            tap(() => (this._isLoading = false)),
            shareReplay({ bufferSize: 1, refCount: false }),
            map((x) => x.map((y) => store.get(y) as PsTableAction<T>) || [])
          )
        : of(declaration.children.map((x) => store.get(x) as PsTableAction<T>));
    } else {
      this.children$ = of([]);
    }
  }
}
