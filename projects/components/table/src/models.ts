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
  children?: IPsTableAction<T>[];
  scope: PsTableActionScope;
  isDisabledFn?: (items: T[]) => boolean;
  isHiddenFn?: (items: T[]) => boolean;
  actionFn?: (items: T[]) => void;
}
