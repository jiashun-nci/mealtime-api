import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ProductAttributeSagas from '../../../../../app/modules/entities/product-attribute/product-attribute.sagas';
import ProductAttributeActions from '../../../../../app/modules/entities/product-attribute/product-attribute.reducer';

const { getProductAttribute, getAllProductAttributes, updateProductAttribute, deleteProductAttribute } = ProductAttributeSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getProductAttribute(1);
  const step = stepper(getProductAttribute(FixtureAPI, { productAttributeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductAttributeActions.productAttributeSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getProductAttribute(FixtureAPI, { productAttributeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductAttributeActions.productAttributeFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllProductAttributes();
  const step = stepper(getAllProductAttributes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductAttributeActions.productAttributeAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllProductAttributes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductAttributeActions.productAttributeAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateProductAttribute({ id: 1 });
  const step = stepper(updateProductAttribute(FixtureAPI, { productAttribute: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductAttributeActions.productAttributeUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateProductAttribute(FixtureAPI, { productAttribute: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductAttributeActions.productAttributeUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteProductAttribute({ id: 1 });
  const step = stepper(deleteProductAttribute(FixtureAPI, { productAttributeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductAttributeActions.productAttributeDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteProductAttribute(FixtureAPI, { productAttributeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductAttributeActions.productAttributeDeleteFailure()));
});
