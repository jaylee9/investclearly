import { SelectQueryBuilder } from 'typeorm';

export const pagination = (pageSize: number, page: number, searchQuery:  SelectQueryBuilder<any>) => {
  if (pageSize && page) {
    const skippedItems = (page - 1) * pageSize;
    return searchQuery = searchQuery.skip(skippedItems).take(pageSize);
  }
  return searchQuery;
}
