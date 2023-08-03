import React from 'react';
import { ActivityIndicator, ScrollView, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ProductActions from './product.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ProductDeleteModal from './product-delete-modal';
import styles from './product-styles';

function ProductDetailScreen(props) {
  const { route, getProduct, navigation, product, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = product?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Product');
      } else {
        setDeleteModalVisible(false);
        getProduct(routeEntityId);
      }
    }, [routeEntityId, getProduct, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Product.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="productDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{product.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{product.name}</Text>
      {/* Description Field */}
      <Text style={styles.label}>Description:</Text>
      <Text testID="description">{product.description}</Text>
      {/* Price Field */}
      <Text style={styles.label}>Price:</Text>
      <Text testID="price">{product.price}</Text>
      {/* ProductImage Field */}
      <Text style={styles.label}>ProductImage:</Text>
      <Text testID="productImageContentType">{product.productImageContentType}</Text>
      <Image
        testID="productImage"
        style={styles.imageBlob}
        source={{ uri: `data:${product.productImageContentType};base64,${product.productImage}` }}
      />
      {/* Featured Field */}
      <Text style={styles.label}>Featured:</Text>
      <Text testID="featured">{String(product.featured)}</Text>
      <Text style={styles.label}>Shop:</Text>
      <Text testID="shop">{String(product.shop ? product.shop.name : '')}</Text>
      <Text style={styles.label}>Product Category:</Text>
      <Text testID="productCategory">{String(product.productCategory ? product.productCategory.name : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ProductEdit', { entityId })}
          accessibilityLabel={'Product Edit Button'}
          testID="productEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Product Delete Button'}
          testID="productDeleteButton"
        />
        {deleteModalVisible && (
          <ProductDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={product}
            testID="productDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.products.product,
    error: state.products.errorOne,
    fetching: state.products.fetchingOne,
    deleting: state.products.deleting,
    errorDeleting: state.products.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(ProductActions.productRequest(id)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    deleteProduct: (id) => dispatch(ProductActions.productDeleteRequest(id)),
    resetProducts: () => dispatch(ProductActions.productReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);
