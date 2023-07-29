import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import OrderActions from './order.reducer';
import styles from './order-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function OrderScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { order, orderList, getAllOrders, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Order entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchOrders();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [order, fetchOrders]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Orders Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchOrders = React.useCallback(() => {
    getAllOrders({ page: page - 1, sort, size });
  }, [getAllOrders, page, sort, size]);

  const handleLoadMore = () => {
    if (orderList.length) {
      return;
    }
    setPage(page + 1);
    fetchOrders();
  };
  return (
    <View style={styles.container} testID="orderScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={orderList}
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
    orderList: state.orders.orderList,
    order: state.orders.order,
    fetching: state.orders.fetchingAll,
    error: state.orders.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: (options) => dispatch(OrderActions.orderAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
