import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ProductCategorySagas from '../../../../../app/modules/entities/product-category/product-category.sagas';
import ProductCategoryActions from '../../../../../app/modules/entities/product-category/product-category.reducer';

const { getProductCategory, getAllProductCategories, updateProductCategory, deleteProductCategory } = ProductCategorySagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getProductCategory(1);
  const step = stepper(getProductCategory(FixtureAPI, { productCategoryId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductCategoryActions.productCategorySuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getProductCategory(FixtureAPI, { productCategoryId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductCategoryActions.productCategoryFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllProductCategories();
  const step = stepper(getAllProductCategories(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductCategoryActions.productCategoryAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllProductCategories(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductCategoryActions.productCategoryAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateProductCategory({ id: 1 });
  const step = stepper(updateProductCategory(FixtureAPI, { productCategory: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductCategoryActions.productCategoryUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateProductCategory(FixtureAPI, { productCategory: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductCategoryActions.productCategoryUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteProductCategory({ id: 1 });
  const step = stepper(deleteProductCategory(FixtureAPI, { productCategoryId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductCategoryActions.productCategoryDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteProductCategory(FixtureAPI, { productCategoryId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductCategoryActions.productCategoryDeleteFailure()));
});
