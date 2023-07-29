import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/product-attribute/product-attribute.reducer';

test('attempt retrieving a single productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.productAttribute).toEqual({ id: undefined });
});

test('attempt retrieving a list of productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.productAttributeList).toEqual([]);
});

test('attempt updating a productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.productAttribute).toEqual({ id: 1 });
});

test('success retrieving a list of productAttribute', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.productAttributeAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.productAttributeList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.productAttribute).toEqual({ id: 1 });
});
test('success deleting a productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.productAttribute).toEqual({ id: undefined });
});

test('failure retrieving a productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.productAttribute).toEqual({ id: undefined });
});

test('failure retrieving a list of productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.productAttributeList).toEqual([]);
});

test('failure updating a productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.productAttribute).toEqual(INITIAL_STATE.productAttribute);
});
test('failure deleting a productAttribute', () => {
  const state = reducer(INITIAL_STATE, Actions.productAttributeDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.productAttribute).toEqual(INITIAL_STATE.productAttribute);
});

test('resetting state for productAttribute', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.productAttributeReset());
  expect(state).toEqual(INITIAL_STATE);
});
