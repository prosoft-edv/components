import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { PsTableDataSource } from '../..';
import { PsTablePaginationComponent } from './table-pagination.component';

describe('PsTablePaginationComponent', () => {
  it('should debounce pageEvent, if pageDebounce-Property is set', fakeAsync(() => {
    const paginator = createPaginationInstance();
    paginator.pageDebounce = 300;

    spyOn(paginator.page, 'emit');

    paginator.onPage({ length: 9999 } as PageEvent);

    expect(paginator.page.emit).not.toHaveBeenCalled();
    tick(301);
    expect(paginator.page.emit).toHaveBeenCalledTimes(1);
    expect(paginator.page.emit).toHaveBeenCalledWith({ length: 9999 } as PageEvent);
  }));

  it('should have the correct amount of pages', fakeAsync(() => {
    const paginator = createPaginationInstance();
    paginator.ngOnInit();
    spyOn(paginator.dataSource._internalDetectChanges, 'next').and.callThrough();
    paginator.dataSource.updateData();

    expect(paginator.dataSource._internalDetectChanges.next).toHaveBeenCalledWith();
    expect(paginator.dataSource.pages).toEqual(3);
    expect(paginator.pages.length).toBe(3);
    expect(paginator.pages).toEqual([1, 2, 3]);
  }));
});

function createPaginationInstance(): PsTablePaginationComponent {
  const cd: any = { markForCheck: () => {} };
  const pagination = new PsTablePaginationComponent(cd);
  pagination.dataSource = new PsTableDataSource(
    () => of(Array.from({ length: 50 }, (_, i: number) => ({ id: i, str: `item ${i}` }))),
    'client'
  );

  return pagination;
}
