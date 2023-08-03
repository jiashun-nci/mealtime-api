import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/product/product.reducer';

test('attempt retrieving a single product', () => {
  const state = reducer(INITIAL_STATE, Actions.productRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.product).toEqual({ id: undefined });
});

test('attempt retrieving a list of product', () => {
  const state = reducer(INITIAL_STATE, Actions.productAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.productList).toEqual([]);
});

test('attempt updating a product', () => {
  const state = reducer(INITIAL_STATE, Actions.productUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a product', () => {
  const state = reducer(INITIAL_STATE, Actions.productDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a product', () => {
  const state = reducer(INITIAL_STATE, Actions.productSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.product).toEqual({ id: 1 });
});

test('success retrieving a list of product', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.productAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.productList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a product', () => {
  const state = reducer(INITIAL_STATE, Actions.productUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.product).toEqual({ id: 1 });
});
test('success deleting a product', () => {
  const state = reducer(INITIAL_STATE, Actions.productDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.product).toEqual({ id: undefined });
});

test('failure retrieving a product', () => {
  const state = reducer(INITIAL_STATE, Actions.productFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.product).toEqual({ id: undefined });
});

test('failure retrieving a list of product', () => {
  const state = reducer(INITIAL_STATE, Actions.productAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.productList).toEqual([]);
});

test('failure updating a product', () => {
  const state = reducer(INITIAL_STATE, Actions.productUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.product).toEqual(INITIAL_STATE.product);
});
test('failure deleting a product', () => {
  const state = reducer(INITIAL_STATE, Actions.productDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.product).toEqual(INITIAL_STATE.product);
});

test('resetting state for product', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.productReset());
  expect(state).toEqual(INITIAL_STATE);
});
