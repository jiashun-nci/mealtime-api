import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productCategoryRequest: ['productCategoryId'],
  productCategoryAllRequest: ['options'],
  productCategoryUpdateRequest: ['productCategory'],
  productCategoryDeleteRequest: ['productCategoryId'],

  productCategorySuccess: ['productCategory'],
  productCategoryAllSuccess: ['productCategoryList', 'headers'],
  productCategoryUpdateSuccess: ['productCategory'],
  productCategoryDeleteSuccess: [],

  productCategoryFailure: ['error'],
  productCategoryAllFailure: ['error'],
  productCategoryUpdateFailure: ['error'],
  productCategoryDeleteFailure: ['error'],

  productCategoryReset: [],
});

export const ProductCategoryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  productCategory: { id: undefined },
  productCategoryList: [],
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
    productCategory: INITIAL_STATE.productCategory,
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
  const { productCategory } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    productCategory,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { productCategoryList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    productCategoryList: loadMoreDataWhenScrolled(state.productCategoryList, productCategoryList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { productCategory } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    productCategory,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    productCategory: INITIAL_STATE.productCategory,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    productCategory: INITIAL_STATE.productCategory,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    productCategoryList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    productCategory: state.productCategory,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    productCategory: state.productCategory,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_CATEGORY_REQUEST]: request,
  [Types.PRODUCT_CATEGORY_ALL_REQUEST]: allRequest,
  [Types.PRODUCT_CATEGORY_UPDATE_REQUEST]: updateRequest,
  [Types.PRODUCT_CATEGORY_DELETE_REQUEST]: deleteRequest,

  [Types.PRODUCT_CATEGORY_SUCCESS]: success,
  [Types.PRODUCT_CATEGORY_ALL_SUCCESS]: allSuccess,
  [Types.PRODUCT_CATEGORY_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCT_CATEGORY_DELETE_SUCCESS]: deleteSuccess,

  [Types.PRODUCT_CATEGORY_FAILURE]: failure,
  [Types.PRODUCT_CATEGORY_ALL_FAILURE]: allFailure,
  [Types.PRODUCT_CATEGORY_UPDATE_FAILURE]: updateFailure,
  [Types.PRODUCT_CATEGORY_DELETE_FAILURE]: deleteFailure,
  [Types.PRODUCT_CATEGORY_RESET]: reset,
});
