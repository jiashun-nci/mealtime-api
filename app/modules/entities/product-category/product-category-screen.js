import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProductCategoryActions from './product-category.reducer';
import styles from './product-category-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ProductCategoryScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { productCategory, productCategoryList, getAllProductCategories, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('ProductCategory entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchProductCategories();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [productCategory, fetchProductCategories]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductCategoryDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No ProductCategories Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchProductCategories = React.useCallback(() => {
    getAllProductCategories({ page: page - 1, sort, size });
  }, [getAllProductCategories, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchProductCategories();
  };
  return (
    <View style={styles.container} testID="productCategoryScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={productCategoryList}
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
    productCategoryList: state.productCategories.productCategoryList,
    productCategory: state.productCategories.productCategory,
    fetching: state.productCategories.fetchingAll,
    error: state.productCategories.errorAll,
    links: state.productCategories.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductCategories: (options) => dispatch(ProductCategoryActions.productCategoryAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryScreen);
