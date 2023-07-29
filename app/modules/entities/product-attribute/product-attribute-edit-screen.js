import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ProductAttributeActions from './product-attribute.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './product-attribute-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  priceExtra: Yup.number().required().min(0),
});

function ProductAttributeEditScreen(props) {
  const {
    getProductAttribute,
    updateProductAttribute,
    route,
    productAttribute,
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
      getProductAttribute(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getProductAttribute, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(productAttribute));
    }
  }, [productAttribute, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('ProductAttributeDetail', { entityId: productAttribute?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateProductAttribute(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const valueRef = createRef();
  const priceExtraRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="productAttributeEditScrollView"
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
              onSubmitEditing={() => valueRef.current?.focus()}
            />
            <FormField
              name="value"
              ref={valueRef}
              label="Value"
              placeholder="Enter Value"
              testID="valueInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => priceExtraRef.current?.focus()}
            />
            <FormField
              name="priceExtra"
              ref={priceExtraRef}
              label="Price Extra"
              placeholder="Enter Price Extra"
              testID="priceExtraInput"
              inputType="number"
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
    value: value.value ?? null,
    priceExtra: value.priceExtra ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    value: value.value ?? null,
    priceExtra: value.priceExtra ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    productAttribute: state.productAttributes.productAttribute,
    fetching: state.productAttributes.fetchingOne,
    updating: state.productAttributes.updating,
    updateSuccess: state.productAttributes.updateSuccess,
    errorUpdating: state.productAttributes.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductAttribute: (id) => dispatch(ProductAttributeActions.productAttributeRequest(id)),
    getAllProductAttributes: (options) => dispatch(ProductAttributeActions.productAttributeAllRequest(options)),
    updateProductAttribute: (productAttribute) => dispatch(ProductAttributeActions.productAttributeUpdateRequest(productAttribute)),
    reset: () => dispatch(ProductAttributeActions.productAttributeReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributeEditScreen);
