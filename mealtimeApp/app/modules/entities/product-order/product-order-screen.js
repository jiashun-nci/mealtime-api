import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProductOrderActions from './product-order.reducer';
import styles from './product-order-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ProductOrderScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { productOrder, productOrderList, getAllProductOrders, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('ProductOrder entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchProductOrders();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [productOrder, fetchProductOrders]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductOrderDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No ProductOrders Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchProductOrders = React.useCallback(() => {
    getAllProductOrders({ page: page - 1, sort, size });
  }, [getAllProductOrders, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchProductOrders();
  };
  return (
    <View style={styles.container} testID="productOrderScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={productOrderList}
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
    productOrderList: state.productOrders.productOrderList,
    productOrder: state.productOrders.productOrder,
    fetching: state.productOrders.fetchingAll,
    error: state.productOrders.errorAll,
    links: state.productOrders.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductOrders: (options) => dispatch(ProductOrderActions.productOrderAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrderScreen);
