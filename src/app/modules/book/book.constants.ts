export const bookFilterableFields = ['searchTerm', 'id', 'categoryId'];

export const bookSearchAbleFields = ['title', 'author', 'price', 'genre'];

export const bookRelationalFields = ['categoryId'];

export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'categoryId',
};
