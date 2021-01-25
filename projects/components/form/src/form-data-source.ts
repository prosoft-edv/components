import { FormGroup } from '@angular/forms';
import { IPsException } from '@prosoft/components/core';
import { IPsButton } from '@prosoft/components/core/src/button';
import { IPsSavebarMode } from '@prosoft/components/savebar';
import { Observable } from 'rxjs';

/**
 * @deprecated Will be replaced with IPsBtton
 * @export
 * @interface IPsFormButton
 * @extends {IPsButton}
 */
export interface IPsFormButton extends IPsButton {}

/**
 * @deprecated Will be replaced with IPsException
 * @export
 * @interface IPsFormException
 * @extends {IPsException}
 */
export interface IPsFormException extends IPsException {}

export interface IPsFormDataSourceConnectOptions {
  errorInView$: Observable<boolean>;
  scrollToError(): void;
}

export interface IPsFormDataSource {
  readonly form: FormGroup;
  readonly autocomplete: 'on' | 'off';
  readonly buttons: IPsFormButton[];
  readonly contentVisible: boolean;
  readonly contentBlocked: boolean;
  readonly exception: IPsFormException;
  readonly savebarMode: IPsSavebarMode;
  connect(options: IPsFormDataSourceConnectOptions): Observable<void>;
  disconnect(): void;
}
