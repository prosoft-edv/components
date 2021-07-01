import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { IPsTableIntlTexts } from '@prosoft/components/core';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PsTableAction, PsTableActionScope } from '../models';

@Component({
  selector: 'ps-table-actions',
  templateUrl: './table-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsTableActionsComponent implements OnDestroy {
  @Input()
  public get actions(): PsTableAction<unknown>[] {
    return this._actions;
  }
  public set actions(value: PsTableAction<unknown>[]) {
    this._actions = value || [];
    this._subscription?.unsubscribe();
    const observables = this.actions?.filter((x) => x.isObservable).map((x) => x.children$);

    if (observables) {
      this._subscription = merge(observables)
        .pipe(tap(() => this.cd.markForCheck()))
        .subscribe();
    }
  }
  private _actions: PsTableAction<unknown>[];
  @Input() public items: unknown[];
  @Input() public refreshable: boolean;
  @Input() public settingsEnabled: boolean;
  @Input() public intl: IPsTableIntlTexts;
  @Input() public scope: PsTableActionScope;

  public psTableActionScopes = PsTableActionScope;

  @Output() public refreshData = new EventEmitter<void>();
  @Output() public showSettings = new EventEmitter<void>();

  @ViewChild('menu', { static: true }) menu: MatMenu;

  private _subscription: Subscription = Subscription.EMPTY;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
