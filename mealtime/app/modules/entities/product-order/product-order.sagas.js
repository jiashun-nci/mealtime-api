import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProductOrderActions from './product-order.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getProductOrder(api, action) {
  const { productOrderId } = action;
  // make the call to the api
  const apiCall = call(api.getProductOrder, productOrderId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(ProductOrderActions.productOrderSuccess(response.data));
  } else {
    yield put(ProductOrderActions.productOrderFailure(response.data));
  }
}

function* getAllProductOrders(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProductOrders, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductOrderActions.productOrderAllSuccess(response.data, response.headers));
  } else {
    yield put(ProductOrderActions.productOrderAllFailure(response.data));
  }
}

function* updateProductOrder(api, action) {
  const { productOrder } = action;
  // make the call to the api
  const idIsNotNull = !(productOrder.id === null || productOrder.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProductOrder : api.createProductOrder, productOrder);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(ProductOrderActions.productOrderUpdateSuccess(response.data));
  } else {
    yield put(ProductOrderActions.productOrderUpdateFailure(response.data));
  }
}

function* deleteProductOrder(api, action) {
  const { productOrderId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProductOrder, productOrderId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductOrderActions.productOrderDeleteSuccess());
  } else {
    yield put(ProductOrderActions.productOrderDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.placedDate = convertDateTimeFromServer(data.placedDate);
  return data;
}

export default {
  getAllProductOrders,
  getProductOrder,
  deleteProductOrder,
  updateProductOrder,
};
