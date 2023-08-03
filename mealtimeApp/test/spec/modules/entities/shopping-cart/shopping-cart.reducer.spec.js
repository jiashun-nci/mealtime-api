import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/shopping-cart/shopping-cart.reducer';

test('attempt retrieving a single shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.shoppingCart).toEqual({ id: undefined });
});

test('attempt retrieving a list of shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.shoppingCartList).toEqual([]);
});

test('attempt updating a shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.shoppingCart).toEqual({ id: 1 });
});

test('success retrieving a list of shoppingCart', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.shoppingCartAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.shoppingCartList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.shoppingCart).toEqual({ id: 1 });
});
test('success deleting a shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.shoppingCart).toEqual({ id: undefined });
});

test('failure retrieving a shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.shoppingCart).toEqual({ id: undefined });
});

test('failure retrieving a list of shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.shoppingCartList).toEqual([]);
});

test('failure updating a shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.shoppingCart).toEqual(INITIAL_STATE.shoppingCart);
});
test('failure deleting a shoppingCart', () => {
  const state = reducer(INITIAL_STATE, Actions.shoppingCartDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.shoppingCart).toEqual(INITIAL_STATE.shoppingCart);
});

test('resetting state for shoppingCart', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.shoppingCartReset());
  expect(state).toEqual(INITIAL_STATE);
});
