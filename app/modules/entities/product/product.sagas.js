import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProductActions from './product.reducer';

function* getProduct(api, action) {
  const { productId } = action;
  // make the call to the api
  const apiCall = call(api.getProduct, productId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productSuccess(response.data));
  } else {
    yield put(ProductActions.productFailure(response.data));
  }
}

function* getAllProducts(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProducts, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productAllSuccess(response.data, response.headers));
  } else {
    yield put(ProductActions.productAllFailure(response.data));
  }
}

function* updateProduct(api, action) {
  const { product } = action;
  // make the call to the api
  const idIsNotNull = !(product.id === null || product.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProduct : api.createProduct, product);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productUpdateSuccess(response.data));
  } else {
    yield put(ProductActions.productUpdateFailure(response.data));
  }
}

function* deleteProduct(api, action) {
  const { productId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProduct, productId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productDeleteSuccess());
  } else {
    yield put(ProductActions.productDeleteFailure(response.data));
  }
}

export default {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
