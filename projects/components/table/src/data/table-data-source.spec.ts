import { fakeAsync, tick } from '@angular/core/testing';
import { NEVER, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PsTableDataSource, IPsTableUpdateDataInfo } from '../data/table-data-source';

describe('PsTableDataSource', () => {
  it('should have sensible default values', fakeAsync(() => {
    const loadedData = [{ prop: 'x' }];
    const dataSource = new PsTableDataSource<any>(() => of(loadedData).pipe(delay(500)));

    expect(dataSource.loading).toBe(true);
    expect(dataSource.data).toEqual([]);
    expect(dataSource.locale).toBeFalsy();
    expect(dataSource.mode).toEqual('client');
    expect(dataSource.pageIndex).toEqual(0);
    expect(dataSource.pageSize).toEqual(15);
    expect(dataSource.sortColumn).toEqual(null);
    expect(dataSource.sortDirection).toEqual('asc');
    expect(dataSource.visibleRows).toEqual([]);
    expect(dataSource.dataLength).toEqual(0);
    expect(dataSource.selectionModel.isMultipleSelection()).toEqual(true);
    expect(dataSource.selectionModel.selected).toEqual([]);
  }));

  it('should return empty array on connect, even if data is not loaded yet', fakeAsync(() => {
    const dataSource = new PsTableDataSource<any>(() => <any>NEVER);

    const renderDataUpdates: any[] = [];
    const sub = dataSource.connect().subscribe(data => {
      renderDataUpdates.push(data);
    });
    expect(renderDataUpdates.length).toBe(1);
    expect(renderDataUpdates.pop()).toEqual([]);

    dataSource.disconnect();
    sub.unsubscribe();
  }));

  it('should not start loading data on connect (the table has to triggers this)', fakeAsync(() => {
    const dataSource = new PsTableDataSource<any>(() => <any>NEVER);

    spyOn(dataSource, 'updateData');
    const sub = dataSource.connect().subscribe();
    dataSource.disconnect();
    sub.unsubscribe();

    expect(dataSource.updateData).not.toHaveBeenCalled();
  }));

  it('should reset error/loading/data/selection before updateData and after', fakeAsync(() => {
    const loadedData = [{ prop: 'x' }];
    const dataSource = new PsTableDataSource<any>(() => of(loadedData).pipe(delay(500)));

    let renderDataUpdates: any[] = [];
    dataSource.connect().subscribe(data => {
      renderDataUpdates.push(data);
    });

    const beforeDataItem = {};
    dataSource.loading = false;
    dataSource.error = true;
    dataSource.errorMessage = 'error';
    dataSource.data = [beforeDataItem];
    dataSource.dataLength = 1;
    dataSource.selectionModel.select(beforeDataItem);
    renderDataUpdates = [];

    dataSource.updateData();

    // state should be resetted
    expect(dataSource.loading).toBe(true);
    expect(dataSource.error).toBe(null);
    expect(dataSource.errorMessage).toBe(null);
    expect(dataSource.selectionModel.selected).toEqual([]);
    expect(renderDataUpdates.length).toEqual(1);
    expect(renderDataUpdates.pop()).toEqual([]);

    // data shouldn't have changed, otherwise pagination breaks
    expect(dataSource.data).toEqual([beforeDataItem]);
    expect(dataSource.dataLength).toEqual(1);

    // but visible rows should be empty, so the table doesn't show only entries while loading
    expect(dataSource.visibleRows).toEqual([]);

    tick(500);
    expect(dataSource.loading).toBe(false);
    expect(dataSource.error).toBe(null);
    expect(dataSource.errorMessage).toBe(null);
    expect(dataSource.data).toEqual(loadedData);
    expect(dataSource.dataLength).toEqual(1);
    expect(dataSource.visibleRows).toEqual(loadedData);
    expect(dataSource.selectionModel.selected).toEqual([]);
    expect(renderDataUpdates.length).toEqual(1);
    expect(renderDataUpdates.pop()).toEqual(loadedData);
  }));

  it('should not sort/filter/page, but provide info to loadData when mode is server', () => {
    const loadedData = Array.from(new Array(20).keys()).map(x => ({ prop: x }));
    let lastUpdateInfo: IPsTableUpdateDataInfo = null;
    const dataSource = new PsTableDataSource<any>(updateInfo => {
      lastUpdateInfo = updateInfo;
      return of(loadedData);
    }, 'server');

    spyOn(dataSource, 'filterProperties');
    spyOn(dataSource, 'filterValues');
    spyOn(dataSource, 'filterPredicate');
    spyOn(dataSource, 'sortingDataAccessor');
    spyOn(dataSource, 'sortData');

    let renderData: any[] = [];
    const sub = dataSource.connect().subscribe(data => {
      renderData = data;
    });

    dataSource.pageSize = 2;
    dataSource.pageIndex = 3;
    dataSource.filter = 'a';
    dataSource.sortColumn = 'prop';
    dataSource.sortDirection = 'desc';
    dataSource.updateData();

    expect(lastUpdateInfo).toEqual({
      pageSize: 2,
      currentPage: 3,
      searchText: 'a',
      sortColumn: 'prop',
      sortDirection: 'desc',
    });
    expect(renderData).toBe(loadedData);

    expect(dataSource.filterProperties).not.toHaveBeenCalled();
    expect(dataSource.filterValues).not.toHaveBeenCalled();
    expect(dataSource.filterPredicate).not.toHaveBeenCalled();
    expect(dataSource.sortingDataAccessor).not.toHaveBeenCalled();
    expect(dataSource.sortData).not.toHaveBeenCalled();

    sub.unsubscribe();
  });

  it('should call sortData with the right parameters when mode is client', fakeAsync(() => {
    const loadedData = [{ prop: 'a' }];
    const dataSource = new PsTableDataSource<any>(() => of(loadedData), 'client');

    spyOn(dataSource, 'sortData').and.returnValue([{ x: 'sorted' }]);

    let renderData: any[] = [];
    const sub = dataSource.connect().subscribe(data => {
      renderData = data;
    });

    dataSource.sortColumn = 'prop';
    dataSource.sortDirection = 'asc';
    dataSource.updateData();

    expect(dataSource.sortData).toHaveBeenCalledWith([{ prop: 'a' }], { sortColumn: 'prop', sortDirection: 'asc' });
    expect(renderData).toEqual([{ x: 'sorted' }]);

    dataSource.sortColumn = 'prop_d';
    dataSource.sortDirection = 'desc';
    dataSource.updateData();

    expect(dataSource.sortData).toHaveBeenCalledWith([{ prop: 'a' }], { sortColumn: 'prop_d', sortDirection: 'desc' });
    expect(renderData).toEqual([{ x: 'sorted' }]);

    sub.unsubscribe();
  }));

  describe('sortingDataAccessor', () => {
    it('should return the requested property value', () => {
      const dataSource = new PsTableDataSource<any>(() => of([]), 'client');

      expect(dataSource.sortingDataAccessor({ prop: 5 }, 'prop')).toBe(5);
      expect(dataSource.sortingDataAccessor({ prop: 'a' }, 'prop')).toBe('a');
      const nestedObj = {};
      expect(dataSource.sortingDataAccessor({ prop: nestedObj }, 'prop')).toBe(nestedObj);
      expect(dataSource.sortingDataAccessor({ prop: nestedObj }, 'a')).toBe(undefined);
    });
  });
  describe('sortData', () => {
    function sortAssert<T>(inData: T[], ascExpectedData: T[], descExpectedData: T[]) {
      const dataSource = new PsTableDataSource<any>(() => of([]), 'client');

      const data = inData.map(x => ({ prop: x }));

      const sortedDataAsc = dataSource.sortData(data, { sortColumn: 'prop', sortDirection: 'asc' });
      expect(sortedDataAsc).toEqual(ascExpectedData.map(x => ({ prop: x })));

      const sortedDataDesc = dataSource.sortData(data, { sortColumn: 'prop', sortDirection: 'desc' });
      expect(sortedDataDesc).toEqual(descExpectedData.map(x => ({ prop: x })));
    }
    it('should sort strings', () => {
      sortAssert(['b', 'a', 'c'], ['a', 'b', 'c'], ['c', 'b', 'a']);
    });
    it('should sort numbers', () => {
      sortAssert([2, 1, 3], [1, 2, 3], [3, 2, 1]);
    });
    it('should sort string numbers', () => {
      sortAssert(['2', '10', '3'], ['2', '3', '10'], ['10', '3', '2']);
    });
    it('should sort booleans', () => {
      sortAssert([true, false, true], [false, true, true], [true, true, false]);
    });
    it('should sort dates', () => {
      const now = new Date();
      const future = new Date();
      future.setMinutes(70);
      const past = new Date();
      past.setMinutes(-70);
      sortAssert([now, future, past], [past, now, future], [future, now, past]);
    });
    it('should use sortingDataAccessor to get the sort property', () => {
      const dataSource = new PsTableDataSource<any>(() => of([]), 'client');
      spyOn(dataSource, 'sortingDataAccessor').and.callThrough();

      const data = [{ prop: 'b' }, { prop: 'a' }];
      dataSource.sortData(data, { sortColumn: 'prop', sortDirection: 'asc' });
      expect(dataSource.sortingDataAccessor).toHaveBeenCalledWith({ prop: 'b' }, 'prop');
      expect(dataSource.sortingDataAccessor).toHaveBeenCalledWith({ prop: 'a' }, 'prop');
    });
  });

  it('should call filterPredicate with the right parameters when mode is client', fakeAsync(() => {
    const loadedData = [{ prop: 'a' }];
    const dataSource = new PsTableDataSource<any>(() => of(loadedData), 'client');

    spyOn(dataSource, 'filterPredicate').and.callThrough();

    let renderData: any[] = [];
    const sub = dataSource.connect().subscribe(data => {
      renderData = data;
    });

    dataSource.filter = 'b';
    dataSource.updateData();

    expect(dataSource.filterPredicate).toHaveBeenCalledWith({ prop: 'a' }, 'b');
    expect(renderData).toEqual([]);

    dataSource.filter = 'a';
    dataSource.updateData();

    expect(dataSource.filterPredicate).toHaveBeenCalledWith({ prop: 'a' }, 'a');
    expect(renderData).toEqual([{ prop: 'a' }]);

    sub.unsubscribe();
  }));

  describe('filterProperties', () => {
    it('should return all object keys, but no nested keys', () => {
      const dataSource = new PsTableDataSource<any>(() => of([]), 'client');

      expect(dataSource.filterProperties({ a: 5, b: { b_a: 3 }, 'c c': 4 })).toEqual(['a', 'b', 'c c']);
    });
  });

  describe('filterValues', () => {
    it('should call filterProperties and return the values of the given properties', () => {
      const dataSource = new PsTableDataSource<any>(() => of([]), 'client');
      spyOn(dataSource, 'filterProperties').and.returnValue(['a', 'c c']);

      const obj = { a: 1, b: { b_a: 2 }, 'c c': 3, invisible: 5 };
      expect(dataSource.filterValues(obj)).toEqual([1, 3]);
      expect(dataSource.filterProperties).toHaveBeenCalledWith(obj);
    });
  });

  describe('filterPredicate', () => {
    it('should call filterValues and search for the filter text on the values', () => {
      const dataSource = new PsTableDataSource<any>(() => of([]), 'client');
      spyOn(dataSource, 'filterValues').and.returnValue(['value 1', 'value 2']);

      const obj = { a: 1, b: { b_a: 2 }, 'c c': 3 };
      expect(dataSource.filterPredicate(obj, '1')).toBe(true);
      expect(dataSource.filterPredicate(obj, 'asdf')).toBe(false);
      expect(dataSource.filterValues).toHaveBeenCalledWith(obj);
    });

    it('should work with different casing and values types', () => {
      const dataSource = new PsTableDataSource<any>(() => of([]), 'client');

      expect(dataSource.filterPredicate({ a: 'hallo' }, 'HALLO')).toBe(true);
      expect(dataSource.filterPredicate({ a: true }, 'true')).toBe(true);
      expect(dataSource.filterPredicate({ a: 12 }, '1')).toBe(true);
      expect(dataSource.filterPredicate({ a: new Date(2019, 8, 26) }, '2019')).toBe(true);
    });
  });

  describe('getUpdateDataInfo', () => {
    it('should work', () => {
      const dataSource = new PsTableDataSource<any>(() => of([]), 'client');

      dataSource.pageSize = 33;
      dataSource.pageIndex = 7;
      dataSource.filter = 'asdf';
      dataSource.sortColumn = 'sortProp';
      dataSource.sortDirection = 'desc';

      expect(dataSource.getUpdateDataInfo()).toEqual({
        pageSize: 33,
        currentPage: 7,
        searchText: 'asdf',
        sortColumn: 'sortProp',
        sortDirection: 'desc',
      });

      dataSource.pageSize = 5;
      dataSource.pageIndex = 3;
      dataSource.filter = null;
      dataSource.sortColumn = 'a';
      dataSource.sortDirection = 'asc';

      expect(dataSource.getUpdateDataInfo()).toEqual({
        pageSize: 5,
        currentPage: 3,
        searchText: null,
        sortColumn: 'a',
        sortDirection: 'asc',
      });
    });
  });

  it('selection should work', () => {
    const loadedData = Array.from(new Array(6).keys()).map(x => ({ prop: x }));
    const dataSource = new PsTableDataSource<any>(() => of(loadedData), 'client');
    dataSource.pageIndex = 1;
    dataSource.pageSize = 2;

    let renderData: any[] = [];
    const sub = dataSource.connect().subscribe(data => {
      renderData = data;
    });

    dataSource.updateData();

    expect(dataSource.visibleRows).toEqual([{ prop: 2 }, { prop: 3 }]);
    expect(dataSource.allVisibleRowsSelected).toBe(false);

    dataSource.selectVisibleRows();
    expect(dataSource.selectionModel.selected).toEqual([{ prop: 2 }, { prop: 3 }]);
    expect(dataSource.allVisibleRowsSelected).toBe(true);

    dataSource.toggleVisibleRowSelection();
    expect(dataSource.selectionModel.selected).toEqual([]);
    expect(dataSource.allVisibleRowsSelected).toBe(false);

    dataSource.toggleVisibleRowSelection();
    expect(dataSource.selectionModel.selected).toEqual([{ prop: 2 }, { prop: 3 }]);
    expect(dataSource.allVisibleRowsSelected).toBe(true);

    dataSource.selectionModel.clear();
    dataSource.selectionModel.select(dataSource.visibleRows[0]);
    dataSource.toggleVisibleRowSelection();
    expect(dataSource.selectionModel.selected).toEqual([{ prop: 2 }, { prop: 3 }]);
    expect(dataSource.allVisibleRowsSelected).toBe(true);

    sub.unsubscribe();
  });

  it('should update visibleRows but not data on client pagination', () => {
    const loadedData = Array.from(new Array(6).keys()).map(x => ({ prop: x }));
    const dataSource = new PsTableDataSource<any>(() => of(loadedData), 'client');
    dataSource.pageIndex = 1;
    dataSource.pageSize = 2;

    let renderData: any[] = [];
    const sub = dataSource.connect().subscribe(data => {
      renderData = data;
    });

    dataSource.updateData();

    expect(dataSource.visibleRows).toEqual([{ prop: 2 }, { prop: 3 }]);
    expect(dataSource.visibleRows).toBe(renderData);
    expect(dataSource.data).toBe(loadedData);

    dataSource.pageIndex = 0;
    dataSource.pageSize = 3;
    dataSource.updateData();

    expect(dataSource.visibleRows).toEqual([{ prop: 0 }, { prop: 1 }, { prop: 2 }]);
    expect(dataSource.visibleRows).toBe(renderData);
    expect(dataSource.data).toBe(loadedData);

    sub.unsubscribe();
  });

  it('should update visibleRows, data and dataLength on server pagination', () => {
    const dataSource = new PsTableDataSource<any>(filter => {
      return of({ Items: [{ prop: filter.currentPage }], TotalItems: 100 });
    }, 'server');
    dataSource.pageIndex = 0;
    dataSource.pageSize = 1;

    let renderData: any[] = [];
    const sub = dataSource.connect().subscribe(data => {
      renderData = data;
    });

    dataSource.updateData();

    expect(dataSource.visibleRows).toEqual([{ prop: 0 }]);
    expect(dataSource.visibleRows).toBe(renderData);
    expect(dataSource.data).toEqual([{ prop: 0 }]);
    expect(dataSource.dataLength).toEqual(100);

    dataSource.pageIndex = 5;
    dataSource.updateData();

    expect(dataSource.visibleRows).toEqual([{ prop: 5 }]);
    expect(dataSource.visibleRows).toBe(renderData);
    expect(dataSource.data).toEqual([{ prop: 5 }]);
    expect(dataSource.dataLength).toEqual(100);

    sub.unsubscribe();
  });

  it('should fix pageIndex when currentPage would have no items on server pagination', () => {
    const dataSource = new PsTableDataSource<any>(filter => {
      return of({ Items: [{ prop: filter.currentPage }], TotalItems: 1 });
    }, 'server');
    dataSource.pageIndex = 1;
    dataSource.pageSize = 1;

    let renderData: any[] = [];
    const sub = dataSource.connect().subscribe(data => {
      renderData = data;
    });

    dataSource.updateData();

    expect(dataSource.pageIndex).toEqual(0);
    expect(dataSource.visibleRows).toEqual([{ prop: 0 }]);
    expect(dataSource.visibleRows).toBe(renderData);
    expect(dataSource.data).toEqual([{ prop: 0 }]);
    expect(dataSource.dataLength).toEqual(1);

    dataSource.pageIndex = 5;
    dataSource.updateData();

    expect(dataSource.pageIndex).toEqual(0);
    expect(dataSource.visibleRows).toEqual([{ prop: 0 }]);
    expect(dataSource.visibleRows).toBe(renderData);
    expect(dataSource.data).toEqual([{ prop: 0 }]);
    expect(dataSource.dataLength).toEqual(1);

    sub.unsubscribe();
  });
});
