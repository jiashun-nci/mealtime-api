import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ProductAttributeActions from './product-attribute.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ProductAttributeDeleteModal from './product-attribute-delete-modal';
import styles from './product-attribute-styles';

function ProductAttributeDetailScreen(props) {
  const { route, getProductAttribute, navigation, productAttribute, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = productAttribute?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('ProductAttribute');
      } else {
        setDeleteModalVisible(false);
        getProductAttribute(routeEntityId);
      }
    }, [routeEntityId, getProductAttribute, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the ProductAttribute.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="productAttributeDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{productAttribute.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{productAttribute.name}</Text>
      {/* Value Field */}
      <Text style={styles.label}>Value:</Text>
      <Text testID="value">{productAttribute.value}</Text>
      {/* PriceExtra Field */}
      <Text style={styles.label}>PriceExtra:</Text>
      <Text testID="priceExtra">{productAttribute.priceExtra}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ProductAttributeEdit', { entityId })}
          accessibilityLabel={'ProductAttribute Edit Button'}
          testID="productAttributeEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'ProductAttribute Delete Button'}
          testID="productAttributeDeleteButton"
        />
        {deleteModalVisible && (
          <ProductAttributeDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={productAttribute}
            testID="productAttributeDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    productAttribute: state.productAttributes.productAttribute,
    error: state.productAttributes.errorOne,
    fetching: state.productAttributes.fetchingOne,
    deleting: state.productAttributes.deleting,
    errorDeleting: state.productAttributes.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductAttribute: (id) => dispatch(ProductAttributeActions.productAttributeRequest(id)),
    getAllProductAttributes: (options) => dispatch(ProductAttributeActions.productAttributeAllRequest(options)),
    deleteProductAttribute: (id) => dispatch(ProductAttributeActions.productAttributeDeleteRequest(id)),
    resetProductAttributes: () => dispatch(ProductAttributeActions.productAttributeReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributeDetailScreen);
