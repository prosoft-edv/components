import { fakeAsync, tick } from '@angular/core/testing';
import { NEVER, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PsTableDataSource } from '../data/table-data-source';

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

  it('should return empty array on connect, even is data is not loaded yet', fakeAsync(() => {
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
});
