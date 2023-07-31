import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ShoppingCartActions from './shopping-cart.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ShoppingCartDeleteModal from './shopping-cart-delete-modal';
import styles from './shopping-cart-styles';

function ShoppingCartDetailScreen(props) {
  const { route, getShoppingCart, navigation, shoppingCart, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = shoppingCart?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('ShoppingCart');
      } else {
        setDeleteModalVisible(false);
        getShoppingCart(routeEntityId);
      }
    }, [routeEntityId, getShoppingCart, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the ShoppingCart.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="shoppingCartDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{shoppingCart.id}</Text>
      {/* PlacedDate Field */}
      <Text style={styles.label}>PlacedDate:</Text>
      <Text testID="placedDate">{String(shoppingCart.placedDate)}</Text>
      {/* Quantity Field */}
      <Text style={styles.label}>Quantity:</Text>
      <Text testID="quantity">{shoppingCart.quantity}</Text>
      {/* Price Field */}
      <Text style={styles.label}>Price:</Text>
      <Text testID="price">{shoppingCart.price}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ShoppingCartEdit', { entityId })}
          accessibilityLabel={'ShoppingCart Edit Button'}
          testID="shoppingCartEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'ShoppingCart Delete Button'}
          testID="shoppingCartDeleteButton"
        />
        {deleteModalVisible && (
          <ShoppingCartDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={shoppingCart}
            testID="shoppingCartDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCarts.shoppingCart,
    error: state.shoppingCarts.errorOne,
    fetching: state.shoppingCarts.fetchingOne,
    deleting: state.shoppingCarts.deleting,
    errorDeleting: state.shoppingCarts.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShoppingCart: (id) => dispatch(ShoppingCartActions.shoppingCartRequest(id)),
    getAllShoppingCarts: (options) => dispatch(ShoppingCartActions.shoppingCartAllRequest(options)),
    deleteShoppingCart: (id) => dispatch(ShoppingCartActions.shoppingCartDeleteRequest(id)),
    resetShoppingCarts: () => dispatch(ShoppingCartActions.shoppingCartReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartDetailScreen);
