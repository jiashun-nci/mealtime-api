import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ProductCategoryActions from './product-category.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './product-category-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
});

function ProductCategoryEditScreen(props) {
  const {
    getProductCategory,
    updateProductCategory,
    route,
    productCategory,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getProductCategory(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getProductCategory, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(productCategory));
    }
  }, [productCategory, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('ProductCategoryDetail', { entityId: productCategory?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateProductCategory(formValueToEntity(data));

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
  const categoryImageRef = createRef();
  const categoryImageContentTypeRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="productCategoryEditScrollView"
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
              onSubmitEditing={() => categoryImageRef.current?.focus()}
            />
            <FormField
              name="categoryImage"
              ref={categoryImageRef}
              label="Category Image"
              placeholder="Enter Category Image"
              testID="categoryImageInput"
              inputType="image-base64"
              onSubmitEditing={() => categoryImageContentTypeRef.current?.focus()}
            />
            <FormField
              name="categoryImageContentType"
              ref={categoryImageContentTypeRef}
              label="Category Image Content Type"
              placeholder="Enter Category Image Content Type"
              testID="categoryImageContentTypeInput"
              inputType="text"
              autoCapitalize="none"
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
    categoryImage: value.categoryImage ?? null,
    categoryImageContentType: value.categoryImageContentType ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    description: value.description ?? null,
    categoryImage: value.categoryImage ?? null,
    categoryImageContentType: value.categoryImageContentType ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    productCategory: state.productCategories.productCategory,
    fetching: state.productCategories.fetchingOne,
    updating: state.productCategories.updating,
    updateSuccess: state.productCategories.updateSuccess,
    errorUpdating: state.productCategories.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductCategory: (id) => dispatch(ProductCategoryActions.productCategoryRequest(id)),
    getAllProductCategories: (options) => dispatch(ProductCategoryActions.productCategoryAllRequest(options)),
    updateProductCategory: (productCategory) => dispatch(ProductCategoryActions.productCategoryUpdateRequest(productCategory)),
    reset: () => dispatch(ProductCategoryActions.productCategoryReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryEditScreen);
