import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { IPsTableIntlTexts } from '@prosoft/components/core';
import { of, Subject, timer } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';
import { PsTableDataSource } from '../data/table-data-source';

@Component({
  selector: 'ps-table-pagination',
  template: `
    <mat-card class="mat-elevation-z0" class="ps-table-pagination__card">
      <mat-paginator
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        [length]="dataSource.dataLength"
        [showFirstLastButtons]="true"
        (page)="onPage($event)"
      >
      </mat-paginator>
      <div class="mat-paginator-page-size" style="font-size: 12px;">
        <mat-form-field *ngIf="pages.length > 2" class="mat-paginator-page-size-select">
          <mat-select id="goToPageSelect" [ngModel]="pageIndex + 1" (selectionChange)="goToPage($event)">
            <mat-option *ngFor="let page of pages" [value]="page"> {{ page }}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .ps-table-pagination__card {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PsTablePaginationComponent implements OnInit, OnDestroy {
  public pages: number[] = [];
  public pageSize: number;
  public dataLength: number;

  @Input() public dataSource: PsTableDataSource<any>;
  @Input() public pageIndex: number;
  @Input() public pageSizeOptions: number;
  @Input() public intl: IPsTableIntlTexts;
  @Input() public pageDebounce: number;

  @Output() public page = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator, { static: false }) public set paginator(value: MatPaginator | null) {
    this._paginator = value;
    this.updatePaginatorIntl();
  }
  public get paginator(): MatPaginator | null {
    return this._paginator;
  }

  private _paginator: MatPaginator | null = null;
  private _onPage$ = new Subject<PageEvent>();
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private cd: ChangeDetectorRef) {
    this._onPage$
      .pipe(
        debounce(() => (this.pageDebounce == null ? of(null) : timer(this.pageDebounce))),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(pageEvent => this.page.emit(pageEvent));
  }

  public ngOnInit() {
    this.dataSource._internalDetectChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.pages = [];
      for (let i = 0; i < this.dataSource.pages; i++) {
        this.pages.push(i + 1);
      }

      this.pageSize = this.dataSource.pageSize;
      this.dataLength = this.dataSource.dataLength;

      this.cd.markForCheck();
    });
  }

  public onPage(event: PageEvent) {
    this._onPage$.next(event);
  }

  public goToPage(event: MatSelectChange) {
    const nextPage = event.value - 1;
    this._onPage$.next({
      length: this.dataSource.dataLength,
      pageIndex: nextPage,
      pageSize: this.pageSize,
      previousPageIndex: nextPage - 1,
    } as PageEvent);
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();

    this._onPage$.complete();
  }

  private updatePaginatorIntl() {
    if (this.paginator && this.intl) {
      this.paginator._intl.firstPageLabel = this.intl.firstPageLabel;
      this.paginator._intl.lastPageLabel = this.intl.lastPageLabel;
      this.paginator._intl.previousPageLabel = this.intl.previousPageLabel;
      this.paginator._intl.nextPageLabel = this.intl.nextPageLabel;
      this.paginator._intl.itemsPerPageLabel = this.intl.itemsPerPageLabel;
      this.paginator._intl.getRangeLabel = this.intl.getRangeLabel;
      this.paginator._intl.changes.next();
    }
  }
}
