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
});

function createPaginationInstance(): PsTablePaginationComponent {
  const pagination = new PsTablePaginationComponent(null);
  pagination.dataSource = new PsTableDataSource<any>(() => of([{ a: 'asdfg' }, { a: 'gasdf' }, { a: 'asdas' }, { a: '32424rw' }]));

  return pagination;
}
