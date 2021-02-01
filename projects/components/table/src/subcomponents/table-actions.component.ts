import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { IPsTableAction } from '../models';

@Component({
  selector: 'ps-table-actions',
  templateUrl: './table-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsTableActionsComponent {
  @Input() public actions: IPsTableAction<any>[];
  @Input() public data: any[];

  @ViewChild('menu', { static: true }) menu: MatMenu;
}
