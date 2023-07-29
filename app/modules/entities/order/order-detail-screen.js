import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import OrderActions from './order.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import OrderDeleteModal from './order-delete-modal';
import styles from './order-styles';

function OrderDetailScreen(props) {
  const { route, getOrder, navigation, order, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = order?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Order');
      } else {
        setDeleteModalVisible(false);
        getOrder(routeEntityId);
      }
    }, [routeEntityId, getOrder, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Order.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="orderDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{order.id}</Text>
      {/* PlacedDate Field */}
      <Text style={styles.label}>PlacedDate:</Text>
      <Text testID="placedDate">{String(order.placedDate)}</Text>
      {/* Quantity Field */}
      <Text style={styles.label}>Quantity:</Text>
      <Text testID="quantity">{order.quantity}</Text>
      {/* TotalPrice Field */}
      <Text style={styles.label}>TotalPrice:</Text>
      <Text testID="totalPrice">{order.totalPrice}</Text>
      {/* Status Field */}
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{order.status}</Text>
      {/* PaymentMethod Field */}
      <Text style={styles.label}>PaymentMethod:</Text>
      <Text testID="paymentMethod">{order.paymentMethod}</Text>
      {/* PaymentReference Field */}
      <Text style={styles.label}>PaymentReference:</Text>
      <Text testID="paymentReference">{order.paymentReference}</Text>
      <Text style={styles.label}>Rider:</Text>
      <Text testID="rider">{String(order.rider ? order.rider.name : '')}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(order.user ? order.user.name : '')}</Text>
      <Text style={styles.label}>Cart:</Text>
      <Text testID="cart">{String(order.cart ? order.cart.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('OrderEdit', { entityId })}
          accessibilityLabel={'Order Edit Button'}
          testID="orderEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Order Delete Button'}
          testID="orderDeleteButton"
        />
        {deleteModalVisible && (
          <OrderDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={order}
            testID="orderDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    order: state.orders.order,
    error: state.orders.errorOne,
    fetching: state.orders.fetchingOne,
    deleting: state.orders.deleting,
    errorDeleting: state.orders.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(OrderActions.orderRequest(id)),
    getAllOrders: (options) => dispatch(OrderActions.orderAllRequest(options)),
    deleteOrder: (id) => dispatch(OrderActions.orderDeleteRequest(id)),
    resetOrders: () => dispatch(OrderActions.orderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
