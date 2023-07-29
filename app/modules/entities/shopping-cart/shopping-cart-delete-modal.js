import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ShoppingCartActions from './shopping-cart.reducer';

import styles from './shopping-cart-styles';

function ShoppingCartDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteShoppingCart(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ShoppingCart');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ShoppingCart {entity.id}?</Text>
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
    shoppingCart: state.shoppingCarts.shoppingCart,
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartDeleteModal);
