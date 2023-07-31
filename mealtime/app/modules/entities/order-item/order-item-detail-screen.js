import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import OrderItemActions from './order-item.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import OrderItemDeleteModal from './order-item-delete-modal';
import styles from './order-item-styles';

function OrderItemDetailScreen(props) {
  const { route, getOrderItem, navigation, orderItem, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = orderItem?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('OrderItem');
      } else {
        setDeleteModalVisible(false);
        getOrderItem(routeEntityId);
      }
    }, [routeEntityId, getOrderItem, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the OrderItem.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="orderItemDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{orderItem.id}</Text>
      {/* PlacedDate Field */}
      <Text style={styles.label}>PlacedDate:</Text>
      <Text testID="placedDate">{String(orderItem.placedDate)}</Text>
      {/* Quantity Field */}
      <Text style={styles.label}>Quantity:</Text>
      <Text testID="quantity">{orderItem.quantity}</Text>
      {/* Price Field */}
      <Text style={styles.label}>Price:</Text>
      <Text testID="price">{orderItem.price}</Text>
      <Text style={styles.label}>Product Order:</Text>
      <Text testID="productOrder">{String(orderItem.productOrder ? orderItem.productOrder.id : '')}</Text>
      <Text style={styles.label}>Product:</Text>
      <Text testID="product">{String(orderItem.product ? orderItem.product.name : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('OrderItemEdit', { entityId })}
          accessibilityLabel={'OrderItem Edit Button'}
          testID="orderItemEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'OrderItem Delete Button'}
          testID="orderItemDeleteButton"
        />
        {deleteModalVisible && (
          <OrderItemDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={orderItem}
            testID="orderItemDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    orderItem: state.orderItems.orderItem,
    error: state.orderItems.errorOne,
    fetching: state.orderItems.fetchingOne,
    deleting: state.orderItems.deleting,
    errorDeleting: state.orderItems.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderItem: (id) => dispatch(OrderItemActions.orderItemRequest(id)),
    getAllOrderItems: (options) => dispatch(OrderItemActions.orderItemAllRequest(options)),
    deleteOrderItem: (id) => dispatch(OrderItemActions.orderItemDeleteRequest(id)),
    resetOrderItems: () => dispatch(OrderItemActions.orderItemReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemDetailScreen);
