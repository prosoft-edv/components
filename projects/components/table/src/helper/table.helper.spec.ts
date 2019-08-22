import { IPsTableUpdateDataInfo } from '../data/table-data-source';
import { asQueryParams, fromQueryParams } from './table.helper';

describe('asQueryParams', () => {
  it('createsQueryParamsString', () => {
    const settings = <IPsTableUpdateDataInfo>{
      pageSize: 22,
      currentPage: 2,
      searchText: 'asdf',
      sortColumn: 'Column1',
      sortDirection: 'desc',
    };

    const paramsString = asQueryParams(settings);

    expect(paramsString).toEqual('22◬2◬asdf◬Column1◬desc');
  });
});

describe('fromQueryParams', () => {
  it('should return data when all values are valid', () => {
    const tableDataInfo = fromQueryParams('22◬2◬asdf◬Column1◬desc');

    expect(tableDataInfo.pageSize).toEqual(22);
    expect(tableDataInfo.currentPage).toEqual(2);
    expect(tableDataInfo.searchText).toEqual('asdf');
    expect(tableDataInfo.sortColumn).toEqual('Column1');
    expect(tableDataInfo.sortDirection).toEqual('desc');
  });

  it('should return partial data when some values are set', () => {
    const tableDataInfo = fromQueryParams('22◬2◬◬◬desc');

    expect(tableDataInfo.pageSize).toEqual(22);
    expect(tableDataInfo.currentPage).toEqual(2);
    expect(tableDataInfo.searchText).toEqual('');
    expect(tableDataInfo.sortColumn).toEqual('');
    expect(tableDataInfo.sortDirection).toEqual('desc');
  });

  it('should return undefined when all values are empty', () => {
    const tableDataInfo = fromQueryParams('◬◬◬◬');

    expect(tableDataInfo).toBe(undefined);
  });

  it('should return undefined when the input is empty', () => {
    const tableDataInfo = fromQueryParams('');

    expect(tableDataInfo).toBe(undefined);
  });
});
