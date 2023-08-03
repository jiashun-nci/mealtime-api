import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/product-order/product-order.reducer';

test('attempt retrieving a single productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.productOrder).toEqual({ id: undefined });
});

test('attempt retrieving a list of productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.productOrderList).toEqual([]);
});

test('attempt updating a productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.productOrder).toEqual({ id: 1 });
});

test('success retrieving a list of productOrder', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.productOrderAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.productOrderList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.productOrder).toEqual({ id: 1 });
});
test('success deleting a productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.productOrder).toEqual({ id: undefined });
});

test('failure retrieving a productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.productOrder).toEqual({ id: undefined });
});

test('failure retrieving a list of productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.productOrderList).toEqual([]);
});

test('failure updating a productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.productOrder).toEqual(INITIAL_STATE.productOrder);
});
test('failure deleting a productOrder', () => {
  const state = reducer(INITIAL_STATE, Actions.productOrderDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.productOrder).toEqual(INITIAL_STATE.productOrder);
});

test('resetting state for productOrder', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.productOrderReset());
  expect(state).toEqual(INITIAL_STATE);
});
