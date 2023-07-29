import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import RiderSagas from '../../../../../app/modules/entities/rider/rider.sagas';
import RiderActions from '../../../../../app/modules/entities/rider/rider.reducer';

const { getRider, getAllRiders, updateRider, deleteRider } = RiderSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getRider(1);
  const step = stepper(getRider(FixtureAPI, { riderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RiderActions.riderSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getRider(FixtureAPI, { riderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RiderActions.riderFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllRiders();
  const step = stepper(getAllRiders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RiderActions.riderAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllRiders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RiderActions.riderAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateRider({ id: 1 });
  const step = stepper(updateRider(FixtureAPI, { rider: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RiderActions.riderUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateRider(FixtureAPI, { rider: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RiderActions.riderUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteRider({ id: 1 });
  const step = stepper(deleteRider(FixtureAPI, { riderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RiderActions.riderDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteRider(FixtureAPI, { riderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RiderActions.riderDeleteFailure()));
});
