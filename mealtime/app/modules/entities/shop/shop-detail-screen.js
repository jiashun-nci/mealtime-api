import React from 'react';
import { ActivityIndicator, ScrollView, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ShopActions from './shop.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ShopDeleteModal from './shop-delete-modal';
import styles from './shop-styles';

function ShopDetailScreen(props) {
  const { route, getShop, navigation, shop, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = shop?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Shop');
      } else {
        setDeleteModalVisible(false);
        getShop(routeEntityId);
      }
    }, [routeEntityId, getShop, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Shop.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="shopDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{shop.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{shop.name}</Text>
      {/* Phone Field */}
      <Text style={styles.label}>Phone:</Text>
      <Text testID="phone">{shop.phone}</Text>
      {/* AddressLine1 Field */}
      <Text style={styles.label}>AddressLine1:</Text>
      <Text testID="addressLine1">{shop.addressLine1}</Text>
      {/* AddressLine2 Field */}
      <Text style={styles.label}>AddressLine2:</Text>
      <Text testID="addressLine2">{shop.addressLine2}</Text>
      {/* City Field */}
      <Text style={styles.label}>City:</Text>
      <Text testID="city">{shop.city}</Text>
      {/* Country Field */}
      <Text style={styles.label}>Country:</Text>
      <Text testID="country">{shop.country}</Text>
      {/* ShopImage Field */}
      <Text style={styles.label}>ShopImage:</Text>
      <Text testID="shopImageContentType">{shop.shopImageContentType}</Text>
      <Image testID="shopImage" style={styles.imageBlob} source={{ uri: `data:${shop.shopImageContentType};base64,${shop.shopImage}` }} />
      {/* DeliveryFee Field */}
      <Text style={styles.label}>DeliveryFee:</Text>
      <Text testID="deliveryFee">{shop.deliveryFee}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(shop.user ? shop.user.login : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ShopEdit', { entityId })}
          accessibilityLabel={'Shop Edit Button'}
          testID="shopEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Shop Delete Button'}
          testID="shopDeleteButton"
        />
        {deleteModalVisible && (
          <ShopDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={shop}
            testID="shopDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    shop: state.shops.shop,
    error: state.shops.errorOne,
    fetching: state.shops.fetchingOne,
    deleting: state.shops.deleting,
    errorDeleting: state.shops.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShop: (id) => dispatch(ShopActions.shopRequest(id)),
    getAllShops: (options) => dispatch(ShopActions.shopAllRequest(options)),
    deleteShop: (id) => dispatch(ShopActions.shopDeleteRequest(id)),
    resetShops: () => dispatch(ShopActions.shopReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailScreen);
