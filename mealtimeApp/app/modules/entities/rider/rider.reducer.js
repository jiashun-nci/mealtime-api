import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  riderRequest: ['riderId'],
  riderAllRequest: ['options'],
  riderUpdateRequest: ['rider'],
  riderDeleteRequest: ['riderId'],

  riderSuccess: ['rider'],
  riderAllSuccess: ['riderList', 'headers'],
  riderUpdateSuccess: ['rider'],
  riderDeleteSuccess: [],

  riderFailure: ['error'],
  riderAllFailure: ['error'],
  riderUpdateFailure: ['error'],
  riderDeleteFailure: ['error'],

  riderReset: [],
});

export const RiderTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  rider: { id: undefined },
  riderList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    rider: INITIAL_STATE.rider,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { rider } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    rider,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { riderList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    riderList: loadMoreDataWhenScrolled(state.riderList, riderList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { rider } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    rider,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    rider: INITIAL_STATE.rider,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    rider: INITIAL_STATE.rider,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    riderList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    rider: state.rider,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    rider: state.rider,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RIDER_REQUEST]: request,
  [Types.RIDER_ALL_REQUEST]: allRequest,
  [Types.RIDER_UPDATE_REQUEST]: updateRequest,
  [Types.RIDER_DELETE_REQUEST]: deleteRequest,

  [Types.RIDER_SUCCESS]: success,
  [Types.RIDER_ALL_SUCCESS]: allSuccess,
  [Types.RIDER_UPDATE_SUCCESS]: updateSuccess,
  [Types.RIDER_DELETE_SUCCESS]: deleteSuccess,

  [Types.RIDER_FAILURE]: failure,
  [Types.RIDER_ALL_FAILURE]: allFailure,
  [Types.RIDER_UPDATE_FAILURE]: updateFailure,
  [Types.RIDER_DELETE_FAILURE]: deleteFailure,
  [Types.RIDER_RESET]: reset,
});
