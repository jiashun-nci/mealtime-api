import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productAttributeRequest: ['productAttributeId'],
  productAttributeAllRequest: ['options'],
  productAttributeUpdateRequest: ['productAttribute'],
  productAttributeDeleteRequest: ['productAttributeId'],

  productAttributeSuccess: ['productAttribute'],
  productAttributeAllSuccess: ['productAttributeList', 'headers'],
  productAttributeUpdateSuccess: ['productAttribute'],
  productAttributeDeleteSuccess: [],

  productAttributeFailure: ['error'],
  productAttributeAllFailure: ['error'],
  productAttributeUpdateFailure: ['error'],
  productAttributeDeleteFailure: ['error'],

  productAttributeReset: [],
});

export const ProductAttributeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  productAttribute: { id: undefined },
  productAttributeList: [],
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
    productAttribute: INITIAL_STATE.productAttribute,
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
  const { productAttribute } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    productAttribute,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { productAttributeList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    productAttributeList: loadMoreDataWhenScrolled(state.productAttributeList, productAttributeList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { productAttribute } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    productAttribute,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    productAttribute: INITIAL_STATE.productAttribute,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    productAttribute: INITIAL_STATE.productAttribute,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    productAttributeList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    productAttribute: state.productAttribute,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    productAttribute: state.productAttribute,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_ATTRIBUTE_REQUEST]: request,
  [Types.PRODUCT_ATTRIBUTE_ALL_REQUEST]: allRequest,
  [Types.PRODUCT_ATTRIBUTE_UPDATE_REQUEST]: updateRequest,
  [Types.PRODUCT_ATTRIBUTE_DELETE_REQUEST]: deleteRequest,

  [Types.PRODUCT_ATTRIBUTE_SUCCESS]: success,
  [Types.PRODUCT_ATTRIBUTE_ALL_SUCCESS]: allSuccess,
  [Types.PRODUCT_ATTRIBUTE_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCT_ATTRIBUTE_DELETE_SUCCESS]: deleteSuccess,

  [Types.PRODUCT_ATTRIBUTE_FAILURE]: failure,
  [Types.PRODUCT_ATTRIBUTE_ALL_FAILURE]: allFailure,
  [Types.PRODUCT_ATTRIBUTE_UPDATE_FAILURE]: updateFailure,
  [Types.PRODUCT_ATTRIBUTE_DELETE_FAILURE]: deleteFailure,
  [Types.PRODUCT_ATTRIBUTE_RESET]: reset,
});
