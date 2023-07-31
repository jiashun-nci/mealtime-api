import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import RiderActions from './rider.reducer';

import styles from './rider-styles';

function RiderDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteRider(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Rider');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Rider {entity.id}?</Text>
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
    rider: state.riders.rider,
    fetching: state.riders.fetchingOne,
    deleting: state.riders.deleting,
    errorDeleting: state.riders.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRider: (id) => dispatch(RiderActions.riderRequest(id)),
    getAllRiders: (options) => dispatch(RiderActions.riderAllRequest(options)),
    deleteRider: (id) => dispatch(RiderActions.riderDeleteRequest(id)),
    resetRiders: () => dispatch(RiderActions.riderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiderDeleteModal);
