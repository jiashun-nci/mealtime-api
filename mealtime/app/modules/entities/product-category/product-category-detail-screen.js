import React from 'react';
import { ActivityIndicator, ScrollView, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ProductCategoryActions from './product-category.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ProductCategoryDeleteModal from './product-category-delete-modal';
import styles from './product-category-styles';

function ProductCategoryDetailScreen(props) {
  const { route, getProductCategory, navigation, productCategory, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = productCategory?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('ProductCategory');
      } else {
        setDeleteModalVisible(false);
        getProductCategory(routeEntityId);
      }
    }, [routeEntityId, getProductCategory, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the ProductCategory.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="productCategoryDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{productCategory.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{productCategory.name}</Text>
      {/* Description Field */}
      <Text style={styles.label}>Description:</Text>
      <Text testID="description">{productCategory.description}</Text>
      {/* CategoryImage Field */}
      <Text style={styles.label}>CategoryImage:</Text>
      <Text testID="categoryImageContentType">{productCategory.categoryImageContentType}</Text>
      <Image
        testID="categoryImage"
        style={styles.imageBlob}
        source={{ uri: `data:${productCategory.categoryImageContentType};base64,${productCategory.categoryImage}` }}
      />

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ProductCategoryEdit', { entityId })}
          accessibilityLabel={'ProductCategory Edit Button'}
          testID="productCategoryEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'ProductCategory Delete Button'}
          testID="productCategoryDeleteButton"
        />
        {deleteModalVisible && (
          <ProductCategoryDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={productCategory}
            testID="productCategoryDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    productCategory: state.productCategories.productCategory,
    error: state.productCategories.errorOne,
    fetching: state.productCategories.fetchingOne,
    deleting: state.productCategories.deleting,
    errorDeleting: state.productCategories.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductCategory: (id) => dispatch(ProductCategoryActions.productCategoryRequest(id)),
    getAllProductCategories: (options) => dispatch(ProductCategoryActions.productCategoryAllRequest(options)),
    deleteProductCategory: (id) => dispatch(ProductCategoryActions.productCategoryDeleteRequest(id)),
    resetProductCategories: () => dispatch(ProductCategoryActions.productCategoryReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryDetailScreen);
