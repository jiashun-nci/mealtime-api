import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProductCategoryActions from './product-category.reducer';

function* getProductCategory(api, action) {
  const { productCategoryId } = action;
  // make the call to the api
  const apiCall = call(api.getProductCategory, productCategoryId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductCategoryActions.productCategorySuccess(response.data));
  } else {
    yield put(ProductCategoryActions.productCategoryFailure(response.data));
  }
}

function* getAllProductCategories(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProductCategories, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductCategoryActions.productCategoryAllSuccess(response.data, response.headers));
  } else {
    yield put(ProductCategoryActions.productCategoryAllFailure(response.data));
  }
}

function* updateProductCategory(api, action) {
  const { productCategory } = action;
  // make the call to the api
  const idIsNotNull = !(productCategory.id === null || productCategory.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProductCategory : api.createProductCategory, productCategory);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductCategoryActions.productCategoryUpdateSuccess(response.data));
  } else {
    yield put(ProductCategoryActions.productCategoryUpdateFailure(response.data));
  }
}

function* deleteProductCategory(api, action) {
  const { productCategoryId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProductCategory, productCategoryId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductCategoryActions.productCategoryDeleteSuccess());
  } else {
    yield put(ProductCategoryActions.productCategoryDeleteFailure(response.data));
  }
}

export default {
  getAllProductCategories,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};
