import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';

interface EntityObjectLiteral extends ObjectLiteral {}

export const pagination = <T extends EntityObjectLiteral>(
  pageSize: number,
  page: number,
  searchQuery: SelectQueryBuilder<T>
): SelectQueryBuilder<T> => {
  if (pageSize && page) {
    const skippedItems = (+page - 1) * +pageSize;
    return searchQuery.skip(+skippedItems).take(+pageSize);
  }
  return searchQuery;
};
