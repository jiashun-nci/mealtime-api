import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import OrderItemActions from './order-item.reducer';

import styles from './order-item-styles';

function OrderItemDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteOrderItem(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('OrderItem');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete OrderItem {entity.id}?</Text>
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
    orderItem: state.orderItems.orderItem,
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemDeleteModal);
