import { Observable } from 'rxjs';

//TODO Vielleicht mit dem interface aus ps-form mergen und in beiden verwenden
export interface IPsViewException {
  errorObject: any;
  icon?: string;
  alignCenter?: boolean;
}

export interface IPsViewDataSource {
  readonly contentVisible: boolean;
  readonly contentBlocked: boolean;
  readonly exception: IPsViewException;
  connect(): Observable<void>;
  disconnect(): void;
}
