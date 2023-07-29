import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import ProductScreen from '../modules/entities/product/product-screen';
import ProductDetailScreen from '../modules/entities/product/product-detail-screen';
import ProductEditScreen from '../modules/entities/product/product-edit-screen';
import ProductCategoryScreen from '../modules/entities/product-category/product-category-screen';
import ProductCategoryDetailScreen from '../modules/entities/product-category/product-category-detail-screen';
import ProductCategoryEditScreen from '../modules/entities/product-category/product-category-edit-screen';
import ProductAttributeScreen from '../modules/entities/product-attribute/product-attribute-screen';
import ProductAttributeDetailScreen from '../modules/entities/product-attribute/product-attribute-detail-screen';
import ProductAttributeEditScreen from '../modules/entities/product-attribute/product-attribute-edit-screen';
import ShopScreen from '../modules/entities/shop/shop-screen';
import ShopDetailScreen from '../modules/entities/shop/shop-detail-screen';
import ShopEditScreen from '../modules/entities/shop/shop-edit-screen';
import CustomerDetailsScreen from '../modules/entities/customer-details/customer-details-screen';
import CustomerDetailsDetailScreen from '../modules/entities/customer-details/customer-details-detail-screen';
import CustomerDetailsEditScreen from '../modules/entities/customer-details/customer-details-edit-screen';
import ShoppingCartScreen from '../modules/entities/shopping-cart/shopping-cart-screen';
import ShoppingCartDetailScreen from '../modules/entities/shopping-cart/shopping-cart-detail-screen';
import ShoppingCartEditScreen from '../modules/entities/shopping-cart/shopping-cart-edit-screen';
import OrderScreen from '../modules/entities/order/order-screen';
import OrderDetailScreen from '../modules/entities/order/order-detail-screen';
import OrderEditScreen from '../modules/entities/order/order-edit-screen';
import OrderItemScreen from '../modules/entities/order-item/order-item-screen';
import OrderItemDetailScreen from '../modules/entities/order-item/order-item-detail-screen';
import OrderItemEditScreen from '../modules/entities/order-item/order-item-edit-screen';
import RiderScreen from '../modules/entities/rider/rider-screen';
import RiderDetailScreen from '../modules/entities/rider/rider-detail-screen';
import RiderEditScreen from '../modules/entities/rider/rider-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Product',
    route: 'product',
    component: ProductScreen,
    options: {
      title: 'Products',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ProductEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ProductDetail',
    route: 'product/detail',
    component: ProductDetailScreen,
    options: { title: 'View Product', headerLeft: () => <HeaderBackButton onPress={() => navigate('Product')} /> },
  },
  {
    name: 'ProductEdit',
    route: 'product/edit',
    component: ProductEditScreen,
    options: {
      title: 'Edit Product',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ProductDetail', 'Product')} />,
    },
  },
  {
    name: 'ProductCategory',
    route: 'product-category',
    component: ProductCategoryScreen,
    options: {
      title: 'ProductCategories',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ProductCategoryEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ProductCategoryDetail',
    route: 'product-category/detail',
    component: ProductCategoryDetailScreen,
    options: { title: 'View ProductCategory', headerLeft: () => <HeaderBackButton onPress={() => navigate('ProductCategory')} /> },
  },
  {
    name: 'ProductCategoryEdit',
    route: 'product-category/edit',
    component: ProductCategoryEditScreen,
    options: {
      title: 'Edit ProductCategory',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ProductCategoryDetail', 'ProductCategory')} />,
    },
  },
  {
    name: 'ProductAttribute',
    route: 'product-attribute',
    component: ProductAttributeScreen,
    options: {
      title: 'ProductAttributes',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ProductAttributeEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ProductAttributeDetail',
    route: 'product-attribute/detail',
    component: ProductAttributeDetailScreen,
    options: { title: 'View ProductAttribute', headerLeft: () => <HeaderBackButton onPress={() => navigate('ProductAttribute')} /> },
  },
  {
    name: 'ProductAttributeEdit',
    route: 'product-attribute/edit',
    component: ProductAttributeEditScreen,
    options: {
      title: 'Edit ProductAttribute',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ProductAttributeDetail', 'ProductAttribute')} />,
    },
  },
  {
    name: 'Shop',
    route: 'shop',
    component: ShopScreen,
    options: {
      title: 'Shops',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ShopEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ShopDetail',
    route: 'shop/detail',
    component: ShopDetailScreen,
    options: { title: 'View Shop', headerLeft: () => <HeaderBackButton onPress={() => navigate('Shop')} /> },
  },
  {
    name: 'ShopEdit',
    route: 'shop/edit',
    component: ShopEditScreen,
    options: { title: 'Edit Shop', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ShopDetail', 'Shop')} /> },
  },
  {
    name: 'CustomerDetails',
    route: 'customer-details',
    component: CustomerDetailsScreen,
    options: {
      title: 'CustomerDetails',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CustomerDetailsEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CustomerDetailsDetail',
    route: 'customer-details/detail',
    component: CustomerDetailsDetailScreen,
    options: { title: 'View CustomerDetails', headerLeft: () => <HeaderBackButton onPress={() => navigate('CustomerDetails')} /> },
  },
  {
    name: 'CustomerDetailsEdit',
    route: 'customer-details/edit',
    component: CustomerDetailsEditScreen,
    options: {
      title: 'Edit CustomerDetails',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CustomerDetailsDetail', 'CustomerDetails')} />,
    },
  },
  {
    name: 'ShoppingCart',
    route: 'shopping-cart',
    component: ShoppingCartScreen,
    options: {
      title: 'ShoppingCarts',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ShoppingCartEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ShoppingCartDetail',
    route: 'shopping-cart/detail',
    component: ShoppingCartDetailScreen,
    options: { title: 'View ShoppingCart', headerLeft: () => <HeaderBackButton onPress={() => navigate('ShoppingCart')} /> },
  },
  {
    name: 'ShoppingCartEdit',
    route: 'shopping-cart/edit',
    component: ShoppingCartEditScreen,
    options: {
      title: 'Edit ShoppingCart',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ShoppingCartDetail', 'ShoppingCart')} />,
    },
  },
  {
    name: 'Order',
    route: 'order',
    component: OrderScreen,
    options: {
      title: 'Orders',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('OrderEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'OrderDetail',
    route: 'order/detail',
    component: OrderDetailScreen,
    options: { title: 'View Order', headerLeft: () => <HeaderBackButton onPress={() => navigate('Order')} /> },
  },
  {
    name: 'OrderEdit',
    route: 'order/edit',
    component: OrderEditScreen,
    options: {
      title: 'Edit Order',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('OrderDetail', 'Order')} />,
    },
  },
  {
    name: 'OrderItem',
    route: 'order-item',
    component: OrderItemScreen,
    options: {
      title: 'OrderItems',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('OrderItemEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'OrderItemDetail',
    route: 'order-item/detail',
    component: OrderItemDetailScreen,
    options: { title: 'View OrderItem', headerLeft: () => <HeaderBackButton onPress={() => navigate('OrderItem')} /> },
  },
  {
    name: 'OrderItemEdit',
    route: 'order-item/edit',
    component: OrderItemEditScreen,
    options: {
      title: 'Edit OrderItem',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('OrderItemDetail', 'OrderItem')} />,
    },
  },
  {
    name: 'Rider',
    route: 'rider',
    component: RiderScreen,
    options: {
      title: 'Riders',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('RiderEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'RiderDetail',
    route: 'rider/detail',
    component: RiderDetailScreen,
    options: { title: 'View Rider', headerLeft: () => <HeaderBackButton onPress={() => navigate('Rider')} /> },
  },
  {
    name: 'RiderEdit',
    route: 'rider/edit',
    component: RiderEditScreen,
    options: {
      title: 'Edit Rider',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('RiderDetail', 'Rider')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
