import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  customerDetailsRequest: ['customerDetailsId'],
  customerDetailsAllRequest: ['options'],
  customerDetailsUpdateRequest: ['customerDetails'],
  customerDetailsDeleteRequest: ['customerDetailsId'],

  customerDetailsSuccess: ['customerDetails'],
  customerDetailsAllSuccess: ['customerDetailsList', 'headers'],
  customerDetailsUpdateSuccess: ['customerDetails'],
  customerDetailsDeleteSuccess: [],

  customerDetailsFailure: ['error'],
  customerDetailsAllFailure: ['error'],
  customerDetailsUpdateFailure: ['error'],
  customerDetailsDeleteFailure: ['error'],

  customerDetailsReset: [],
});

export const CustomerDetailsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  customerDetails: { id: undefined },
  customerDetailsList: [],
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
    customerDetails: INITIAL_STATE.customerDetails,
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
  const { customerDetails } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    customerDetails,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { customerDetailsList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    customerDetailsList: loadMoreDataWhenScrolled(state.customerDetailsList, customerDetailsList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { customerDetails } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    customerDetails,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    customerDetails: INITIAL_STATE.customerDetails,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    customerDetails: INITIAL_STATE.customerDetails,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    customerDetailsList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    customerDetails: state.customerDetails,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    customerDetails: state.customerDetails,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CUSTOMER_DETAILS_REQUEST]: request,
  [Types.CUSTOMER_DETAILS_ALL_REQUEST]: allRequest,
  [Types.CUSTOMER_DETAILS_UPDATE_REQUEST]: updateRequest,
  [Types.CUSTOMER_DETAILS_DELETE_REQUEST]: deleteRequest,

  [Types.CUSTOMER_DETAILS_SUCCESS]: success,
  [Types.CUSTOMER_DETAILS_ALL_SUCCESS]: allSuccess,
  [Types.CUSTOMER_DETAILS_UPDATE_SUCCESS]: updateSuccess,
  [Types.CUSTOMER_DETAILS_DELETE_SUCCESS]: deleteSuccess,

  [Types.CUSTOMER_DETAILS_FAILURE]: failure,
  [Types.CUSTOMER_DETAILS_ALL_FAILURE]: allFailure,
  [Types.CUSTOMER_DETAILS_UPDATE_FAILURE]: updateFailure,
  [Types.CUSTOMER_DETAILS_DELETE_FAILURE]: deleteFailure,
  [Types.CUSTOMER_DETAILS_RESET]: reset,
});
