import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ProductOrderActions from './product-order.reducer';

import styles from './product-order-styles';

function ProductOrderDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteProductOrder(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ProductOrder');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ProductOrder {entity.id}?</Text>
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
    productOrder: state.productOrders.productOrder,
    fetching: state.productOrders.fetchingOne,
    deleting: state.productOrders.deleting,
    errorDeleting: state.productOrders.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductOrder: (id) => dispatch(ProductOrderActions.productOrderRequest(id)),
    getAllProductOrders: (options) => dispatch(ProductOrderActions.productOrderAllRequest(options)),
    deleteProductOrder: (id) => dispatch(ProductOrderActions.productOrderDeleteRequest(id)),
    resetProductOrders: () => dispatch(ProductOrderActions.productOrderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrderDeleteModal);
