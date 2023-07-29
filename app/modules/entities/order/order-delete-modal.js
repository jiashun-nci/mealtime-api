import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import OrderActions from './order.reducer';

import styles from './order-styles';

function OrderDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteOrder(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Order');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Order {entity.id}?</Text>
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
    order: state.orders.order,
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDeleteModal);
