import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProductAttributeActions from './product-attribute.reducer';

function* getProductAttribute(api, action) {
  const { productAttributeId } = action;
  // make the call to the api
  const apiCall = call(api.getProductAttribute, productAttributeId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductAttributeActions.productAttributeSuccess(response.data));
  } else {
    yield put(ProductAttributeActions.productAttributeFailure(response.data));
  }
}

function* getAllProductAttributes(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProductAttributes, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductAttributeActions.productAttributeAllSuccess(response.data, response.headers));
  } else {
    yield put(ProductAttributeActions.productAttributeAllFailure(response.data));
  }
}

function* updateProductAttribute(api, action) {
  const { productAttribute } = action;
  // make the call to the api
  const idIsNotNull = !(productAttribute.id === null || productAttribute.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProductAttribute : api.createProductAttribute, productAttribute);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductAttributeActions.productAttributeUpdateSuccess(response.data));
  } else {
    yield put(ProductAttributeActions.productAttributeUpdateFailure(response.data));
  }
}

function* deleteProductAttribute(api, action) {
  const { productAttributeId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProductAttribute, productAttributeId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductAttributeActions.productAttributeDeleteSuccess());
  } else {
    yield put(ProductAttributeActions.productAttributeDeleteFailure(response.data));
  }
}

export default {
  getAllProductAttributes,
  getProductAttribute,
  deleteProductAttribute,
  updateProductAttribute,
};
