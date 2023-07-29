import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ShoppingCartActions from './shopping-cart.reducer';
import CustomerDetailsActions from '../customer-details/customer-details.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './shopping-cart-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  placedDate: Yup.date().required(),
  quantity: Yup.number().required().min(0),
  price: Yup.number().required().min(0),
  customerDetails: Yup.mixed().required(),
});

function ShoppingCartEditScreen(props) {
  const {
    getShoppingCart,
    updateShoppingCart,
    route,
    shoppingCart,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllCustomerDetails,
    customerDetailsList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getShoppingCart(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getShoppingCart, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(shoppingCart));
    }
  }, [shoppingCart, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllCustomerDetails();
  }, [getAllCustomerDetails]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('ShoppingCartDetail', { entityId: shoppingCart?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateShoppingCart(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const placedDateRef = createRef();
  const quantityRef = createRef();
  const priceRef = createRef();
  const customerDetailsRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="shoppingCartEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="placedDate"
              ref={placedDateRef}
              label="Placed Date"
              placeholder="Enter Placed Date"
              testID="placedDateInput"
              inputType="datetime"
              onSubmitEditing={() => quantityRef.current?.focus()}
            />
            <FormField
              name="quantity"
              ref={quantityRef}
              label="Quantity"
              placeholder="Enter Quantity"
              testID="quantityInput"
              inputType="number"
              onSubmitEditing={() => priceRef.current?.focus()}
            />
            <FormField name="price" ref={priceRef} label="Price" placeholder="Enter Price" testID="priceInput" inputType="number" />
            <FormField
              name="customerDetails"
              inputType="select-one"
              ref={customerDetailsRef}
              listItems={customerDetailsList}
              listItemLabelField="id"
              label="Customer Details"
              placeholder="Select Customer Details"
              testID="customerDetailsSelectInput"
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
    placedDate: value.placedDate ?? null,
    quantity: value.quantity ?? null,
    price: value.price ?? null,
    customerDetails: value.customerDetails && value.customerDetails.id ? value.customerDetails.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    placedDate: value.placedDate ?? null,
    quantity: value.quantity ?? null,
    price: value.price ?? null,
  };
  entity.customerDetails = value.customerDetails ? { id: value.customerDetails } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    customerDetailsList: state.customerDetails.customerDetailsList ?? [],
    shoppingCart: state.shoppingCarts.shoppingCart,
    fetching: state.shoppingCarts.fetchingOne,
    updating: state.shoppingCarts.updating,
    updateSuccess: state.shoppingCarts.updateSuccess,
    errorUpdating: state.shoppingCarts.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomerDetails: (options) => dispatch(CustomerDetailsActions.customerDetailsAllRequest(options)),
    getShoppingCart: (id) => dispatch(ShoppingCartActions.shoppingCartRequest(id)),
    getAllShoppingCarts: (options) => dispatch(ShoppingCartActions.shoppingCartAllRequest(options)),
    updateShoppingCart: (shoppingCart) => dispatch(ShoppingCartActions.shoppingCartUpdateRequest(shoppingCart)),
    reset: () => dispatch(ShoppingCartActions.shoppingCartReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartEditScreen);
