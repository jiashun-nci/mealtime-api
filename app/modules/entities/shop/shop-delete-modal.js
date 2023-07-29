import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ShopActions from './shop.reducer';

import styles from './shop-styles';

function ShopDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteShop(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Shop');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Shop {entity.id}?</Text>
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
    shop: state.shops.shop,
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopDeleteModal);
