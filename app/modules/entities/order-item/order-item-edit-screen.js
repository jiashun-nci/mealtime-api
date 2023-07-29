import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import OrderItemActions from './order-item.reducer';
import OrderActions from '../order/order.reducer';
import ProductActions from '../product/product.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './order-item-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  placedDate: Yup.date().required(),
  quantity: Yup.number().required().min(0),
  price: Yup.number().required().min(0),
  order: Yup.mixed().required(),
  product: Yup.mixed().required(),
});

function OrderItemEditScreen(props) {
  const {
    getOrderItem,
    updateOrderItem,
    route,
    orderItem,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllOrders,
    orderList,
    getAllProducts,
    productList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getOrderItem(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getOrderItem, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(orderItem));
    }
  }, [orderItem, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllOrders();
    getAllProducts();
  }, [getAllOrders, getAllProducts]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('OrderItemDetail', { entityId: orderItem?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateOrderItem(formValueToEntity(data));

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
  const orderRef = createRef();
  const productRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="orderItemEditScrollView"
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
              name="order"
              inputType="select-one"
              ref={orderRef}
              listItems={orderList}
              listItemLabelField="id"
              label="Order"
              placeholder="Select Order"
              testID="orderSelectInput"
            />
            <FormField
              name="product"
              inputType="select-one"
              ref={productRef}
              listItems={productList}
              listItemLabelField="name"
              label="Product"
              placeholder="Select Product"
              testID="productSelectInput"
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
    order: value.order && value.order.id ? value.order.id : null,
    product: value.product && value.product.id ? value.product.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    placedDate: value.placedDate ?? null,
    quantity: value.quantity ?? null,
    price: value.price ?? null,
  };
  entity.order = value.order ? { id: value.order } : null;
  entity.product = value.product ? { id: value.product } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    orderList: state.orders.orderList ?? [],
    productList: state.products.productList ?? [],
    orderItem: state.orderItems.orderItem,
    fetching: state.orderItems.fetchingOne,
    updating: state.orderItems.updating,
    updateSuccess: state.orderItems.updateSuccess,
    errorUpdating: state.orderItems.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: (options) => dispatch(OrderActions.orderAllRequest(options)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    getOrderItem: (id) => dispatch(OrderItemActions.orderItemRequest(id)),
    getAllOrderItems: (options) => dispatch(OrderItemActions.orderItemAllRequest(options)),
    updateOrderItem: (orderItem) => dispatch(OrderItemActions.orderItemUpdateRequest(orderItem)),
    reset: () => dispatch(OrderItemActions.orderItemReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemEditScreen);
