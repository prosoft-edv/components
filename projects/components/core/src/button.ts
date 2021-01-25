import { ThemePalette } from '@angular/material/core';

export interface IPsButton {
  label?: string;
  type: 'raised' | 'stroked' | 'icon';
  color: ThemePalette;
  icon?: string;
  disabled?: () => boolean;
  click: () => void;
}
