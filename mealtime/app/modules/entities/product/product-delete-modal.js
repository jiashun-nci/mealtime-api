import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ProductActions from './product.reducer';

import styles from './product-styles';

function ProductDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteProduct(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Product');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Product {entity.id}?</Text>
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
    product: state.products.product,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDeleteModal);
