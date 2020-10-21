// import { QueryList } from '@angular/core';
// import { fakeAsync, tick } from '@angular/core/testing';
// import { FormControl } from '@angular/forms';
// import { MatSelect } from '@angular/material/select';
// import { of, Subject } from 'rxjs';
// import { PsSelectItem } from './models';
// import { PsSelectDataSource } from './select-data-source';
// import { PsSelectDataComponent } from './select-data.component';
// import { PsSelectService } from './select.service';

// function createMatSelect(): MatSelect {
//   const matSelect = <any>{
//     value: null,
//     stateChanges: new Subject<void>(),
//     openedChange: new Subject<void>(),
//     close: () => {},
//     _onChange: () => {},
//     _onTouched: null,
//     ngControl: new FormControl(),
//     options: new QueryList(),
//     writeValue: () => {},
//   };

//   matSelect.writeValue = (val: any) => {
//     matSelect.value = val;
//   };
//   matSelect.registerOnChange = (val: any) => {
//     matSelect._onChange = val;
//   };
//   matSelect.registerOnTouched = (val: any) => {
//     matSelect._onTouched = val;
//   };

//   return matSelect;
// }

// function createSelectService(): PsSelectService {
//   const service = <PsSelectService>{
//     createDataSource: (ds: any) => ds,
//   };

//   return service;
// }

// function createDataSource(items: PsSelectItem[] = []): PsSelectDataSource {
//   const dataSource = <PsSelectDataSource>{
//     connect: () => of<PsSelectItem[]>(items),
//     disconnect: () => {},
//     selectedValuesChanged: (_: any | any[]) => {},
//     panelOpenChanged: (_: boolean) => {},
//     searchTextChanged: (_: string) => {},
//   };

//   return dataSource;
// }

// describe('PsSelectDataComponent', () => {
//   let matSelect: MatSelect;
//   let dataSource: PsSelectDataSource;
//   let service: PsSelectService;
//   let component: PsSelectDataComponent;
//   beforeEach(() => {
//     matSelect = createMatSelect();
//     dataSource = createDataSource();
//     service = createSelectService();
//     component = new PsSelectDataComponent(matSelect, <any>{ control: null }, service, <any>{ markForCheck: () => {} });
//     component.options = new QueryList();
//     component.dataSource = dataSource;
//   });

// });
