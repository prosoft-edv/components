import { Injectable } from '@angular/core';
import {
  IPsFormCancelParams,
  IPsFormLoadErrorParams,
  IPsFormLoadSuccessParams,
  IPsFormSaveErrorParams,
  IPsFormSaveSuccessParams,
  PsFormActionService,
} from '@prosoft/components/form';
import { BasePsFormService, IPsFormError, IPsFormErrorData } from '@prosoft/components/form-base';
import { Observable, of, Subject } from 'rxjs';

export class DemoPsFormsService extends BasePsFormService {
  public getLabel(formControl: any): Observable<string> {
    return formControl.psLabel ? of(formControl.psLabel) : null;
  }
  protected mapDataToError(errorData: IPsFormErrorData[]): Observable<IPsFormError[]> {
    return of(
      errorData.map(data => ({
        errorText: `${data.controlPath} - ${data.errorKey} - ${JSON.stringify(data.errorValue)}`,
        data: data,
      }))
    );
  }
}

@Injectable()
export class DemoPsFormActionService extends PsFormActionService {
  public static logStream$ = new Subject<string>();
  public defaultLoadSuccessHandler(params: IPsFormLoadSuccessParams): void {
    this.log('action service load success handler', params);
  }
  public defaultLoadErrorHandler(params: IPsFormLoadErrorParams): void {
    this.log('action service load error handler', params);
  }
  public defaultSaveSuccessHandler(params: IPsFormSaveSuccessParams): void {
    this.log('action service save success handler', params);
  }
  public defaultSaveErrorHandler(params: IPsFormSaveErrorParams): void {
    this.log('action service save error handler', params);
  }
  public defaultCancelHandler(params: IPsFormCancelParams): void {
    this.log('action service cancel handler', params);
  }

  private log(message: string, params: any) {
    console.log(message, params);
    DemoPsFormActionService.logStream$.next(message);
  }
}
