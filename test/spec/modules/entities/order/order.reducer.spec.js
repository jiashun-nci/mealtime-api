import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/order/order.reducer';

test('attempt retrieving a single order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.order).toEqual({ id: undefined });
});

test('attempt retrieving a list of order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.orderList).toEqual([]);
});

test('attempt updating a order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.order).toEqual({ id: 1 });
});

test('success retrieving a list of order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.orderList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.order).toEqual({ id: 1 });
});
test('success deleting a order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.order).toEqual({ id: undefined });
});

test('failure retrieving a order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.order).toEqual({ id: undefined });
});

test('failure retrieving a list of order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.orderList).toEqual([]);
});

test('failure updating a order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.order).toEqual(INITIAL_STATE.order);
});
test('failure deleting a order', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.order).toEqual(INITIAL_STATE.order);
});

test('resetting state for order', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.orderReset());
  expect(state).toEqual(INITIAL_STATE);
});
