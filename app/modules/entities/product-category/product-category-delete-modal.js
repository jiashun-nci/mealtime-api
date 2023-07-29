import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ProductCategoryActions from './product-category.reducer';

import styles from './product-category-styles';

function ProductCategoryDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteProductCategory(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ProductCategory');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ProductCategory {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    productCategory: state.productCategories.productCategory,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryDeleteModal);
