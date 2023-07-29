import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProductActions from './product.reducer';
import styles from './product-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ProductScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { product, productList, getAllProducts, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Product entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchProducts();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [product, fetchProducts]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Products Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchProducts = React.useCallback(() => {
    getAllProducts({ page: page - 1, sort, size });
  }, [getAllProducts, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchProducts();
  };
  return (
    <View style={styles.container} testID="productScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={productList}
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
    productList: state.products.productList,
    product: state.products.product,
    fetching: state.products.fetchingAll,
    error: state.products.errorAll,
    links: state.products.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
