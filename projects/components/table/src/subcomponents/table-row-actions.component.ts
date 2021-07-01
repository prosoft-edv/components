import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

import { PsTableAction, PsTableActionScope } from '../models';

@Component({
  selector: 'ps-table-row-actions',
  templateUrl: './table-row-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsTableRowActionsComponent implements OnChanges {
  @Input() public actions: PsTableAction<any>[];
  @Input() public actionsTemplate: TemplateRef<any> | null = null;
  @Input() public moreMenuThreshold: number;
  @Input() public item: any;

  public psTableActionScopes = PsTableActionScope;

  public itemAsArray: any[];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.item) {
      this.itemAsArray = [this.item];
    }
  }
}
