import { ChangeDetectorRef, Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IPsTableIntlTexts } from '../..';
import { PsTablePaginationComponent } from './table-pagination.component';
import { useMatSelect } from '../table.component.spec';

const testIntl: IPsTableIntlTexts = {
  firstPageLabel: 'a',
  lastPageLabel: 'b',
  previousPageLabel: 'c',
  nextPageLabel: 'd',
  itemsPerPageLabel: 'e',
  getRangeLabel: () => 'fnc',
  searchLabel: 'f',
  sortLabel: 'g',
  refreshListLabel: 'h',
  settingsLabel: 'i',
  noEntriesLabel: 'j',
  saveLabel: 'k',
  cancelLabel: 'l',
  displayedColumnsLabel: 'm',
};

@Component({
  template: `
    <ps-table-pagination
      [pageSize]="pageSize"
      [dataLength]="dataLength"
      [pageIndex]="pageIndex"
      [pageSizeOptions]="pageSizeOptions"
      [intl]="intl"
      [pageDebounce]="pageDebounce"
      (page)="onPage($event)"
    ></ps-table-pagination>
  `,
})
class PaginationTestComponent {
  public pageSize = 5;
  public dataLength = 15;
  public pageIndex = 0;
  public intl = testIntl;
  public pageDebounce: number;

  @ViewChild(PsTablePaginationComponent, { static: false })
  public pagination: PsTablePaginationComponent;

  public onPage = (_: PageEvent) => {};
}

fdescribe('PsTablePaginationComponent', () => {
  describe('Unit tests', () => {
    let component: PsTablePaginationComponent;
    const cd = { markForCheck: () => {} } as ChangeDetectorRef;
    beforeEach(() => {
      component = new PsTablePaginationComponent(cd);
    });

    it('should set Intl correctly', () => {
      component.intl = testIntl;
      component.paginator = new MatPaginator(new MatPaginatorIntl(), cd);

      expect(component.paginator._intl.firstPageLabel).toEqual('a');
      expect(component.paginator._intl.lastPageLabel).toEqual('b');
      expect(component.paginator._intl.previousPageLabel).toEqual('c');
    });

    it('should debounce pageEvent, if pageDebounce-Property is set', fakeAsync(() => {
      const pageEmitSpy = spyOn(component.page, 'emit');
      component.pageDebounce = 300;
      component.onPage({ length: 9999 } as PageEvent);

      expect(pageEmitSpy).not.toHaveBeenCalled();
      tick(301);
      expect(pageEmitSpy).toHaveBeenCalledTimes(1);
      expect(pageEmitSpy).toHaveBeenCalledWith({ length: 9999 } as PageEvent);
    }));
  });

  describe('Integration tests', () => {
    let component: PaginationTestComponent;
    let fixture: ComponentFixture<PaginationTestComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PaginationTestComponent, PsTablePaginationComponent],
        imports: [BrowserAnimationsModule, FormsModule, MatPaginatorModule, MatSelectModule, MatCardModule],
      });

      fixture = TestBed.createComponent(PaginationTestComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement.query(By.directive(PsTablePaginationComponent));

      fixture.detectChanges();
    });

    it('should bind the page events correctly', fakeAsync(() => {
      const onPageSpy = spyOn(component, 'onPage');

      const paginatorNextButtonEl = debugElement.nativeElement
        .querySelectorAll('.mat-paginator-navigation-next')
        .item(0) as HTMLButtonElement;
      paginatorNextButtonEl.dispatchEvent(new MouseEvent('click'));

      expect(onPageSpy).toHaveBeenCalledWith({ previousPageIndex: 0, pageIndex: 1, pageSize: 5, length: 15 });
    }));

    it('should calculate pages correctly', () => {
      for (const data of [[15, 5, 3], [11, 5, 3], [15, 10, 2]]) {
        component.dataLength = data[0];
        component.pageSize = data[1];
        fixture.detectChanges();

        expect(component.pagination.pages.length).toEqual(data[2]);
      }
    });

    it('should update pages correctly', () => {
      component.dataLength = 15;
      component.pageSize = 5;
      fixture.detectChanges();
      fixture.detectChanges();
      expect(component.pagination.pages.length).toEqual(3);
    });

    it('should update Intl correctly', () => {
      const updateIntlSpy = spyOn<any>(component.pagination, 'updatePaginatorIntl').and.callThrough();
      component.intl = { ...testIntl, firstPageLabel: 'changed' };
      fixture.detectChanges();

      expect(updateIntlSpy).toHaveBeenCalled();
      expect(component.pagination.intl.firstPageLabel).toEqual('changed');
    });
  });
});
