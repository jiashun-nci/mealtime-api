import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/customer-details/customer-details.reducer';

test('attempt retrieving a single customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.customerDetails).toEqual({ id: undefined });
});

test('attempt retrieving a list of customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.customerDetailsList).toEqual([]);
});

test('attempt updating a customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.customerDetails).toEqual({ id: 1 });
});

test('success retrieving a list of customerDetails', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.customerDetailsAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.customerDetailsList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.customerDetails).toEqual({ id: 1 });
});
test('success deleting a customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.customerDetails).toEqual({ id: undefined });
});

test('failure retrieving a customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.customerDetails).toEqual({ id: undefined });
});

test('failure retrieving a list of customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.customerDetailsList).toEqual([]);
});

test('failure updating a customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.customerDetails).toEqual(INITIAL_STATE.customerDetails);
});
test('failure deleting a customerDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.customerDetailsDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.customerDetails).toEqual(INITIAL_STATE.customerDetails);
});

test('resetting state for customerDetails', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.customerDetailsReset());
  expect(state).toEqual(INITIAL_STATE);
});
