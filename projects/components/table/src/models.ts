import { Observable } from 'rxjs';

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
  triggerData: TTrigger;
}

export const enum PsTableActionScope {
  row = 1,
  list = 2,
  all = row | list,
}

export interface IPsTableAction<T> {
  label: string;
  icon: string;
  iconColor?: string;
  cancelOnDestroy?: boolean; // default true
  children?: IPsTableAction<T>[];
  scope: PsTableActionScope;
  isDisabledFnc?: (data: T[]) => boolean;
  isHiddenFnc?: (data: T[]) => boolean;
  actionFnc: (data: T[]) => Observable<any>;
}

// export interface IPsTableListAction<T> extends IPsTableAction {
//   isDisabledFnc?: (data: T[]) => boolean;
//   isVisibleFnc?: (data: T[]) => boolean;
//   actionFnc: (data: T[]) => Observable<any>;
// }

// export interface IPsTableRowAction<T> extends IPsTableAction {
//   icon: string;
//   isDisabledFnc?: (data: T) => boolean;
//   isVisibleFnc?: (data: T) => boolean;
//   actionFnc: (data: T) => Observable<any>;
// }
