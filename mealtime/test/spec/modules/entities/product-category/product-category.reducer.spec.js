import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/product-category/product-category.reducer';

test('attempt retrieving a single productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.productCategory).toEqual({ id: undefined });
});

test('attempt retrieving a list of productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.productCategoryList).toEqual([]);
});

test('attempt updating a productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategorySuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.productCategory).toEqual({ id: 1 });
});

test('success retrieving a list of productCategory', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.productCategoryAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.productCategoryList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.productCategory).toEqual({ id: 1 });
});
test('success deleting a productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.productCategory).toEqual({ id: undefined });
});

test('failure retrieving a productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.productCategory).toEqual({ id: undefined });
});

test('failure retrieving a list of productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.productCategoryList).toEqual([]);
});

test('failure updating a productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.productCategory).toEqual(INITIAL_STATE.productCategory);
});
test('failure deleting a productCategory', () => {
  const state = reducer(INITIAL_STATE, Actions.productCategoryDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.productCategory).toEqual(INITIAL_STATE.productCategory);
});

test('resetting state for productCategory', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.productCategoryReset());
  expect(state).toEqual(INITIAL_STATE);
});
