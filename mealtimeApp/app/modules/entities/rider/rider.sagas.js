import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import RiderActions from './rider.reducer';

function* getRider(api, action) {
  const { riderId } = action;
  // make the call to the api
  const apiCall = call(api.getRider, riderId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RiderActions.riderSuccess(response.data));
  } else {
    yield put(RiderActions.riderFailure(response.data));
  }
}

function* getAllRiders(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllRiders, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RiderActions.riderAllSuccess(response.data, response.headers));
  } else {
    yield put(RiderActions.riderAllFailure(response.data));
  }
}

function* updateRider(api, action) {
  const { rider } = action;
  // make the call to the api
  const idIsNotNull = !(rider.id === null || rider.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateRider : api.createRider, rider);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RiderActions.riderUpdateSuccess(response.data));
  } else {
    yield put(RiderActions.riderUpdateFailure(response.data));
  }
}

function* deleteRider(api, action) {
  const { riderId } = action;
  // make the call to the api
  const apiCall = call(api.deleteRider, riderId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RiderActions.riderDeleteSuccess());
  } else {
    yield put(RiderActions.riderDeleteFailure(response.data));
  }
}

export default {
  getAllRiders,
  getRider,
  deleteRider,
  updateRider,
};
