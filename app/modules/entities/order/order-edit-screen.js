import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import OrderActions from './order.reducer';
import RiderActions from '../rider/rider.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import ShoppingCartActions from '../shopping-cart/shopping-cart.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './order-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  placedDate: Yup.date().required(),
  quantity: Yup.number().required().min(0),
  totalPrice: Yup.number().required().min(0),
  status: Yup.string().required(),
  paymentMethod: Yup.string().required(),
  rider: Yup.mixed().required(),
  user: Yup.mixed().required(),
  cart: Yup.mixed().required(),
});

const OrderStatus = [
  {
    label: 'COMPLETED',
    value: 'COMPLETED',
  },
  {
    label: 'PAID',
    value: 'PAID',
  },
  {
    label: 'PENDING',
    value: 'PENDING',
  },
  {
    label: 'CANCELLED',
    value: 'CANCELLED',
  },
  {
    label: 'REFUNDED',
    value: 'REFUNDED',
  },
];
const PaymentMethod = [
  {
    label: 'CREDIT_CARD (card)',
    value: 'CREDIT_CARD (card)',
  },
  {
    label: 'CASH (cash)',
    value: 'CASH (cash)',
  },
];

function OrderEditScreen(props) {
  const {
    getOrder,
    updateOrder,
    route,
    order,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllRiders,
    riderList,
    getAllUsers,
    userList,
    getAllShoppingCarts,
    shoppingCartList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getOrder(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getOrder, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(order));
    }
  }, [order, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllRiders();
    getAllUsers();
    getAllShoppingCarts();
  }, [getAllRiders, getAllUsers, getAllShoppingCarts]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('OrderDetail', { entityId: order?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateOrder(formValueToEntity(data));

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
  const totalPriceRef = createRef();
  const statusRef = createRef();
  const paymentMethodRef = createRef();
  const paymentReferenceRef = createRef();
  const riderRef = createRef();
  const userRef = createRef();
  const cartRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="orderEditScrollView"
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
              onSubmitEditing={() => totalPriceRef.current?.focus()}
            />
            <FormField
              name="totalPrice"
              ref={totalPriceRef}
              label="Total Price"
              placeholder="Enter Total Price"
              testID="totalPriceInput"
              inputType="number"
            />
            <FormField
              name="status"
              ref={statusRef}
              label="Status"
              placeholder="Enter Status"
              testID="statusInput"
              inputType="select-one"
              listItems={OrderStatus}
            />
            <FormField
              name="paymentMethod"
              ref={paymentMethodRef}
              label="Payment Method"
              placeholder="Enter Payment Method"
              testID="paymentMethodInput"
              inputType="select-one"
              listItems={PaymentMethod}
              onSubmitEditing={() => paymentReferenceRef.current?.focus()}
            />
            <FormField
              name="paymentReference"
              ref={paymentReferenceRef}
              label="Payment Reference"
              placeholder="Enter Payment Reference"
              testID="paymentReferenceInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="rider"
              inputType="select-one"
              ref={riderRef}
              listItems={riderList}
              listItemLabelField="name"
              label="Rider"
              placeholder="Select Rider"
              testID="riderSelectInput"
            />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="name"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
            />
            <FormField
              name="cart"
              inputType="select-one"
              ref={cartRef}
              listItems={shoppingCartList}
              listItemLabelField="id"
              label="Cart"
              placeholder="Select Cart"
              testID="shoppingCartSelectInput"
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
    totalPrice: value.totalPrice ?? null,
    status: value.status ?? null,
    paymentMethod: value.paymentMethod ?? null,
    paymentReference: value.paymentReference ?? null,
    rider: value.rider && value.rider.id ? value.rider.id : null,
    user: value.user && value.user.id ? value.user.id : null,
    cart: value.cart && value.cart.id ? value.cart.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    placedDate: value.placedDate ?? null,
    quantity: value.quantity ?? null,
    totalPrice: value.totalPrice ?? null,
    status: value.status ?? null,
    paymentMethod: value.paymentMethod ?? null,
    paymentReference: value.paymentReference ?? null,
  };
  entity.rider = value.rider ? { id: value.rider } : null;
  entity.user = value.user ? { id: value.user } : null;
  entity.cart = value.cart ? { id: value.cart } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    riderList: state.riders.riderList ?? [],
    userList: state.users.userList ?? [],
    shoppingCartList: state.shoppingCarts.shoppingCartList ?? [],
    order: state.orders.order,
    fetching: state.orders.fetchingOne,
    updating: state.orders.updating,
    updateSuccess: state.orders.updateSuccess,
    errorUpdating: state.orders.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRiders: (options) => dispatch(RiderActions.riderAllRequest(options)),
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getAllShoppingCarts: (options) => dispatch(ShoppingCartActions.shoppingCartAllRequest(options)),
    getOrder: (id) => dispatch(OrderActions.orderRequest(id)),
    getAllOrders: (options) => dispatch(OrderActions.orderAllRequest(options)),
    updateOrder: (order) => dispatch(OrderActions.orderUpdateRequest(order)),
    reset: () => dispatch(OrderActions.orderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditScreen);
