import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/order-item/order-item.reducer';

test('attempt retrieving a single orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.orderItem).toEqual({ id: undefined });
});

test('attempt retrieving a list of orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.orderItemList).toEqual([]);
});

test('attempt updating a orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.orderItem).toEqual({ id: 1 });
});

test('success retrieving a list of orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.orderItemList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.orderItem).toEqual({ id: 1 });
});
test('success deleting a orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.orderItem).toEqual({ id: undefined });
});

test('failure retrieving a orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.orderItem).toEqual({ id: undefined });
});

test('failure retrieving a list of orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.orderItemList).toEqual([]);
});

test('failure updating a orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.orderItem).toEqual(INITIAL_STATE.orderItem);
});
test('failure deleting a orderItem', () => {
  const state = reducer(INITIAL_STATE, Actions.orderItemDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.orderItem).toEqual(INITIAL_STATE.orderItem);
});

test('resetting state for orderItem', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.orderItemReset());
  expect(state).toEqual(INITIAL_STATE);
});
