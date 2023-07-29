import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/product">
        <Translate contentKey="global.menu.entities.product" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/product-category">
        <Translate contentKey="global.menu.entities.productCategory" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/product-attribute">
        <Translate contentKey="global.menu.entities.productAttribute" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/shop">
        <Translate contentKey="global.menu.entities.shop" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/customer-details">
        <Translate contentKey="global.menu.entities.customerDetails" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/shopping-cart">
        <Translate contentKey="global.menu.entities.shoppingCart" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/order">
        <Translate contentKey="global.menu.entities.order" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/order-item">
        <Translate contentKey="global.menu.entities.orderItem" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/rider">
        <Translate contentKey="global.menu.entities.rider" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
