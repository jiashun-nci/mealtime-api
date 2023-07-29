import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ProductAttributeActions from './product-attribute.reducer';

import styles from './product-attribute-styles';

function ProductAttributeDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteProductAttribute(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ProductAttribute');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ProductAttribute {entity.id}?</Text>
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
    productAttribute: state.productAttributes.productAttribute,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributeDeleteModal);
