import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CustomerDetailsActions from './customer-details.reducer';
import { convertLocalDateFromServer } from '../../../shared/util/date-transforms';

function* getCustomerDetails(api, action) {
  const { customerDetailsId } = action;
  // make the call to the api
  const apiCall = call(api.getCustomerDetails, customerDetailsId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(CustomerDetailsActions.customerDetailsSuccess(response.data));
  } else {
    yield put(CustomerDetailsActions.customerDetailsFailure(response.data));
  }
}

function* getAllCustomerDetails(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCustomerDetails, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CustomerDetailsActions.customerDetailsAllSuccess(response.data, response.headers));
  } else {
    yield put(CustomerDetailsActions.customerDetailsAllFailure(response.data));
  }
}

function* updateCustomerDetails(api, action) {
  const { customerDetails } = action;
  // make the call to the api
  const idIsNotNull = !(customerDetails.id === null || customerDetails.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCustomerDetails : api.createCustomerDetails, customerDetails);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(CustomerDetailsActions.customerDetailsUpdateSuccess(response.data));
  } else {
    yield put(CustomerDetailsActions.customerDetailsUpdateFailure(response.data));
  }
}

function* deleteCustomerDetails(api, action) {
  const { customerDetailsId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCustomerDetails, customerDetailsId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CustomerDetailsActions.customerDetailsDeleteSuccess());
  } else {
    yield put(CustomerDetailsActions.customerDetailsDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.birthday = convertLocalDateFromServer(data.birthday);
  return data;
}

export default {
  getAllCustomerDetails,
  getCustomerDetails,
  deleteCustomerDetails,
  updateCustomerDetails,
};
