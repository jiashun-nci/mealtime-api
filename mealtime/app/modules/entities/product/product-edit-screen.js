import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ProductActions from './product.reducer';
import ShopActions from '../shop/shop.reducer';
import ProductCategoryActions from '../product-category/product-category.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './product-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required().min(0),
});

function ProductEditScreen(props) {
  const {
    getProduct,
    updateProduct,
    route,
    product,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllShops,
    shopList,
    getAllProductCategories,
    productCategoryList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getProduct(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getProduct, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(product));
    }
  }, [product, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllShops();
    getAllProductCategories();
  }, [getAllShops, getAllProductCategories]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ProductDetail', { entityId: product?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateProduct(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();
  const productImageRef = createRef();
  const productImageContentTypeRef = createRef();
  const featuredRef = createRef();
  const shopRef = createRef();
  const productCategoryRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="productEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
            <FormField
              name="description"
              ref={descriptionRef}
              label="Description"
              placeholder="Enter Description"
              testID="descriptionInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => priceRef.current?.focus()}
            />
            <FormField
              name="price"
              ref={priceRef}
              label="Price"
              placeholder="Enter Price"
              testID="priceInput"
              inputType="number"
              onSubmitEditing={() => productImageRef.current?.focus()}
            />
            <FormField
              name="productImage"
              ref={productImageRef}
              label="Product Image"
              placeholder="Enter Product Image"
              testID="productImageInput"
              inputType="image-base64"
              onSubmitEditing={() => productImageContentTypeRef.current?.focus()}
            />
            <FormField
              name="productImageContentType"
              ref={productImageContentTypeRef}
              label="Product Image Content Type"
              placeholder="Enter Product Image Content Type"
              testID="productImageContentTypeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => featuredRef.current?.focus()}
            />
            <FormField
              name="featured"
              ref={featuredRef}
              label="Featured"
              placeholder="Enter Featured"
              testID="featuredInput"
              inputType="boolean"
            />
            <FormField
              name="shop"
              inputType="select-one"
              ref={shopRef}
              listItems={shopList}
              listItemLabelField="name"
              label="Shop"
              placeholder="Select Shop"
              testID="shopSelectInput"
            />
            <FormField
              name="productCategory"
              inputType="select-one"
              ref={productCategoryRef}
              listItems={productCategoryList}
              listItemLabelField="id"
              label="Product Category"
              placeholder="Select Product Category"
              testID="productCategorySelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    name: value.name ?? null,
    description: value.description ?? null,
    price: value.price ?? null,
    productImage: value.productImage ?? null,
    productImageContentType: value.productImageContentType ?? null,
    featured: value.featured ?? null,
    shop: value.shop && value.shop.id ? value.shop.id : null,
    productCategory: value.productCategory && value.productCategory.id ? value.productCategory.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    description: value.description ?? null,
    price: value.price ?? null,
    productImage: value.productImage ?? null,
    productImageContentType: value.productImageContentType ?? null,
    featured: value.featured === null ? false : Boolean(value.featured),
  };
  entity.shop = value.shop ? { id: value.shop } : null;
  entity.productCategory = value.productCategory ? { id: value.productCategory } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    shopList: state.shops.shopList ?? [],
    productCategoryList: state.productCategories.productCategoryList ?? [],
    product: state.products.product,
    fetching: state.products.fetchingOne,
    updating: state.products.updating,
    updateSuccess: state.products.updateSuccess,
    errorUpdating: state.products.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllShops: (options) => dispatch(ShopActions.shopAllRequest(options)),
    getAllProductCategories: (options) => dispatch(ProductCategoryActions.productCategoryAllRequest(options)),
    getProduct: (id) => dispatch(ProductActions.productRequest(id)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    updateProduct: (product) => dispatch(ProductActions.productUpdateRequest(product)),
    reset: () => dispatch(ProductActions.productReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditScreen);
