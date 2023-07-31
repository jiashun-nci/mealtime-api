import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CustomerDetailsActions from './customer-details.reducer';
import styles from './customer-details-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CustomerDetailsScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { customerDetails, customerDetailsList, getAllCustomerDetails, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('CustomerDetails entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCustomerDetails();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [customerDetails, fetchCustomerDetails]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CustomerDetailsDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No CustomerDetails Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCustomerDetails = React.useCallback(() => {
    getAllCustomerDetails({ page: page - 1, sort, size });
  }, [getAllCustomerDetails, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchCustomerDetails();
  };
  return (
    <View style={styles.container} testID="customerDetailsScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={customerDetailsList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    customerDetailsList: state.customerDetails.customerDetailsList,
    customerDetails: state.customerDetails.customerDetails,
    fetching: state.customerDetails.fetchingAll,
    error: state.customerDetails.errorAll,
    links: state.customerDetails.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomerDetails: (options) => dispatch(CustomerDetailsActions.customerDetailsAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsScreen);
