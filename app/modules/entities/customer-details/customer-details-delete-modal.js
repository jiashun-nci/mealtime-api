import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CustomerDetailsActions from './customer-details.reducer';

import styles from './customer-details-styles';

function CustomerDetailsDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCustomerDetails(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('CustomerDetails');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete CustomerDetails {entity.id}?</Text>
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
    customerDetails: state.customerDetails.customerDetails,
    fetching: state.customerDetails.fetchingOne,
    deleting: state.customerDetails.deleting,
    errorDeleting: state.customerDetails.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerDetails: (id) => dispatch(CustomerDetailsActions.customerDetailsRequest(id)),
    getAllCustomerDetails: (options) => dispatch(CustomerDetailsActions.customerDetailsAllRequest(options)),
    deleteCustomerDetails: (id) => dispatch(CustomerDetailsActions.customerDetailsDeleteRequest(id)),
    resetCustomerDetails: () => dispatch(CustomerDetailsActions.customerDetailsReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsDeleteModal);
