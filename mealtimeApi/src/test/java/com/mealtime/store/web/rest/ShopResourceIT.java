package com.mealtime.store.web.rest;

import static com.mealtime.store.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mealtime.store.IntegrationTest;
import com.mealtime.store.domain.Shop;
import com.mealtime.store.domain.User;
import com.mealtime.store.repository.ShopRepository;
import com.mealtime.store.service.ShopService;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link ShopResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ShopResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_SHOP_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_SHOP_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_SHOP_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_SHOP_IMAGE_CONTENT_TYPE = "image/png";

    private static final BigDecimal DEFAULT_DELIVERY_FEE = new BigDecimal(0);
    private static final BigDecimal UPDATED_DELIVERY_FEE = new BigDecimal(1);

    private static final String ENTITY_API_URL = "/api/shops";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ShopRepository shopRepository;

    @Mock
    private ShopRepository shopRepositoryMock;

    @Mock
    private ShopService shopServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShopMockMvc;

    private Shop shop;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shop createEntity(EntityManager em) {
        Shop shop = new Shop()
            .name(DEFAULT_NAME)
            .phone(DEFAULT_PHONE)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY)
            .shopImage(DEFAULT_SHOP_IMAGE)
            .shopImageContentType(DEFAULT_SHOP_IMAGE_CONTENT_TYPE)
            .deliveryFee(DEFAULT_DELIVERY_FEE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        shop.setUser(user);
        return shop;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shop createUpdatedEntity(EntityManager em) {
        Shop shop = new Shop()
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .shopImage(UPDATED_SHOP_IMAGE)
            .shopImageContentType(UPDATED_SHOP_IMAGE_CONTENT_TYPE)
            .deliveryFee(UPDATED_DELIVERY_FEE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        shop.setUser(user);
        return shop;
    }

    @BeforeEach
    public void initTest() {
        shop = createEntity(em);
    }

    @Test
    @Transactional
    void createShop() throws Exception {
        int databaseSizeBeforeCreate = shopRepository.findAll().size();
        // Create the Shop
        restShopMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isCreated());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeCreate + 1);
        Shop testShop = shopList.get(shopList.size() - 1);
        assertThat(testShop.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShop.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testShop.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testShop.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testShop.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testShop.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testShop.getShopImage()).isEqualTo(DEFAULT_SHOP_IMAGE);
        assertThat(testShop.getShopImageContentType()).isEqualTo(DEFAULT_SHOP_IMAGE_CONTENT_TYPE);
        assertThat(testShop.getDeliveryFee()).isEqualByComparingTo(DEFAULT_DELIVERY_FEE);
    }

    @Test
    @Transactional
    void createShopWithExistingId() throws Exception {
        // Create the Shop with an existing ID
        shop.setId(1L);

        int databaseSizeBeforeCreate = shopRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restShopMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isBadRequest());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = shopRepository.findAll().size();
        // set the field null
        shop.setName(null);

        // Create the Shop, which fails.

        restShopMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isBadRequest());

        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = shopRepository.findAll().size();
        // set the field null
        shop.setPhone(null);

        // Create the Shop, which fails.

        restShopMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isBadRequest());

        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAddressLine1IsRequired() throws Exception {
        int databaseSizeBeforeTest = shopRepository.findAll().size();
        // set the field null
        shop.setAddressLine1(null);

        // Create the Shop, which fails.

        restShopMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isBadRequest());

        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllShops() throws Exception {
        // Initialize the database
        shopRepository.saveAndFlush(shop);

        // Get all the shopList
        restShopMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shop.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1)))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].shopImageContentType").value(hasItem(DEFAULT_SHOP_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].shopImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_SHOP_IMAGE))))
            .andExpect(jsonPath("$.[*].deliveryFee").value(hasItem(sameNumber(DEFAULT_DELIVERY_FEE))));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllShopsWithEagerRelationshipsIsEnabled() throws Exception {
        when(shopServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restShopMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(shopServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllShopsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(shopServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restShopMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(shopRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getShop() throws Exception {
        // Initialize the database
        shopRepository.saveAndFlush(shop);

        // Get the shop
        restShopMockMvc
            .perform(get(ENTITY_API_URL_ID, shop.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shop.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.shopImageContentType").value(DEFAULT_SHOP_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.shopImage").value(Base64Utils.encodeToString(DEFAULT_SHOP_IMAGE)))
            .andExpect(jsonPath("$.deliveryFee").value(sameNumber(DEFAULT_DELIVERY_FEE)));
    }

    @Test
    @Transactional
    void getNonExistingShop() throws Exception {
        // Get the shop
        restShopMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingShop() throws Exception {
        // Initialize the database
        shopRepository.saveAndFlush(shop);

        int databaseSizeBeforeUpdate = shopRepository.findAll().size();

        // Update the shop
        Shop updatedShop = shopRepository.findById(shop.getId()).get();
        // Disconnect from session so that the updates on updatedShop are not directly saved in db
        em.detach(updatedShop);
        updatedShop
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .shopImage(UPDATED_SHOP_IMAGE)
            .shopImageContentType(UPDATED_SHOP_IMAGE_CONTENT_TYPE)
            .deliveryFee(UPDATED_DELIVERY_FEE);

        restShopMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedShop.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedShop))
            )
            .andExpect(status().isOk());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
        Shop testShop = shopList.get(shopList.size() - 1);
        assertThat(testShop.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShop.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testShop.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testShop.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testShop.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testShop.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testShop.getShopImage()).isEqualTo(UPDATED_SHOP_IMAGE);
        assertThat(testShop.getShopImageContentType()).isEqualTo(UPDATED_SHOP_IMAGE_CONTENT_TYPE);
        assertThat(testShop.getDeliveryFee()).isEqualByComparingTo(UPDATED_DELIVERY_FEE);
    }

    @Test
    @Transactional
    void putNonExistingShop() throws Exception {
        int databaseSizeBeforeUpdate = shopRepository.findAll().size();
        shop.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShopMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shop.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shop))
            )
            .andExpect(status().isBadRequest());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchShop() throws Exception {
        int databaseSizeBeforeUpdate = shopRepository.findAll().size();
        shop.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShopMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shop))
            )
            .andExpect(status().isBadRequest());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamShop() throws Exception {
        int databaseSizeBeforeUpdate = shopRepository.findAll().size();
        shop.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShopMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateShopWithPatch() throws Exception {
        // Initialize the database
        shopRepository.saveAndFlush(shop);

        int databaseSizeBeforeUpdate = shopRepository.findAll().size();

        // Update the shop using partial update
        Shop partialUpdatedShop = new Shop();
        partialUpdatedShop.setId(shop.getId());

        partialUpdatedShop.addressLine1(UPDATED_ADDRESS_LINE_1).addressLine2(UPDATED_ADDRESS_LINE_2).country(UPDATED_COUNTRY);

        restShopMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShop.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShop))
            )
            .andExpect(status().isOk());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
        Shop testShop = shopList.get(shopList.size() - 1);
        assertThat(testShop.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShop.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testShop.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testShop.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testShop.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testShop.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testShop.getShopImage()).isEqualTo(DEFAULT_SHOP_IMAGE);
        assertThat(testShop.getShopImageContentType()).isEqualTo(DEFAULT_SHOP_IMAGE_CONTENT_TYPE);
        assertThat(testShop.getDeliveryFee()).isEqualByComparingTo(DEFAULT_DELIVERY_FEE);
    }

    @Test
    @Transactional
    void fullUpdateShopWithPatch() throws Exception {
        // Initialize the database
        shopRepository.saveAndFlush(shop);

        int databaseSizeBeforeUpdate = shopRepository.findAll().size();

        // Update the shop using partial update
        Shop partialUpdatedShop = new Shop();
        partialUpdatedShop.setId(shop.getId());

        partialUpdatedShop
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .shopImage(UPDATED_SHOP_IMAGE)
            .shopImageContentType(UPDATED_SHOP_IMAGE_CONTENT_TYPE)
            .deliveryFee(UPDATED_DELIVERY_FEE);

        restShopMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShop.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShop))
            )
            .andExpect(status().isOk());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
        Shop testShop = shopList.get(shopList.size() - 1);
        assertThat(testShop.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShop.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testShop.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testShop.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testShop.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testShop.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testShop.getShopImage()).isEqualTo(UPDATED_SHOP_IMAGE);
        assertThat(testShop.getShopImageContentType()).isEqualTo(UPDATED_SHOP_IMAGE_CONTENT_TYPE);
        assertThat(testShop.getDeliveryFee()).isEqualByComparingTo(UPDATED_DELIVERY_FEE);
    }

    @Test
    @Transactional
    void patchNonExistingShop() throws Exception {
        int databaseSizeBeforeUpdate = shopRepository.findAll().size();
        shop.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShopMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, shop.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shop))
            )
            .andExpect(status().isBadRequest());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchShop() throws Exception {
        int databaseSizeBeforeUpdate = shopRepository.findAll().size();
        shop.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShopMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shop))
            )
            .andExpect(status().isBadRequest());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamShop() throws Exception {
        int databaseSizeBeforeUpdate = shopRepository.findAll().size();
        shop.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShopMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteShop() throws Exception {
        // Initialize the database
        shopRepository.saveAndFlush(shop);

        int databaseSizeBeforeDelete = shopRepository.findAll().size();

        // Delete the shop
        restShopMockMvc
            .perform(delete(ENTITY_API_URL_ID, shop.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
