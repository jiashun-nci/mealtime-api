import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CustomerDetailsSagas from '../../../../../app/modules/entities/customer-details/customer-details.sagas';
import CustomerDetailsActions from '../../../../../app/modules/entities/customer-details/customer-details.reducer';

const { getCustomerDetails, getAllCustomerDetails, updateCustomerDetails, deleteCustomerDetails } = CustomerDetailsSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCustomerDetails(1);
  const step = stepper(getCustomerDetails(FixtureAPI, { customerDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CustomerDetailsActions.customerDetailsSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCustomerDetails(FixtureAPI, { customerDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CustomerDetailsActions.customerDetailsFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCustomerDetails();
  const step = stepper(getAllCustomerDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CustomerDetailsActions.customerDetailsAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCustomerDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CustomerDetailsActions.customerDetailsAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCustomerDetails({ id: 1 });
  const step = stepper(updateCustomerDetails(FixtureAPI, { customerDetails: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CustomerDetailsActions.customerDetailsUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCustomerDetails(FixtureAPI, { customerDetails: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CustomerDetailsActions.customerDetailsUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCustomerDetails({ id: 1 });
  const step = stepper(deleteCustomerDetails(FixtureAPI, { customerDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CustomerDetailsActions.customerDetailsDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCustomerDetails(FixtureAPI, { customerDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CustomerDetailsActions.customerDetailsDeleteFailure()));
});
