import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/rider/rider.reducer';

test('attempt retrieving a single rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.rider).toEqual({ id: undefined });
});

test('attempt retrieving a list of rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.riderList).toEqual([]);
});

test('attempt updating a rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.rider).toEqual({ id: 1 });
});

test('success retrieving a list of rider', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.riderAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.riderList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.rider).toEqual({ id: 1 });
});
test('success deleting a rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.rider).toEqual({ id: undefined });
});

test('failure retrieving a rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.rider).toEqual({ id: undefined });
});

test('failure retrieving a list of rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.riderList).toEqual([]);
});

test('failure updating a rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.rider).toEqual(INITIAL_STATE.rider);
});
test('failure deleting a rider', () => {
  const state = reducer(INITIAL_STATE, Actions.riderDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.rider).toEqual(INITIAL_STATE.rider);
});

test('resetting state for rider', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.riderReset());
  expect(state).toEqual(INITIAL_STATE);
});
