import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/shop/shop.reducer';

test('attempt retrieving a single shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.shop).toEqual({ id: undefined });
});

test('attempt retrieving a list of shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.shopList).toEqual([]);
});

test('attempt updating a shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.shop).toEqual({ id: 1 });
});

test('success retrieving a list of shop', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.shopAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.shopList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.shop).toEqual({ id: 1 });
});
test('success deleting a shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.shop).toEqual({ id: undefined });
});

test('failure retrieving a shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.shop).toEqual({ id: undefined });
});

test('failure retrieving a list of shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.shopList).toEqual([]);
});

test('failure updating a shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.shop).toEqual(INITIAL_STATE.shop);
});
test('failure deleting a shop', () => {
  const state = reducer(INITIAL_STATE, Actions.shopDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.shop).toEqual(INITIAL_STATE.shop);
});

test('resetting state for shop', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.shopReset());
  expect(state).toEqual(INITIAL_STATE);
});
