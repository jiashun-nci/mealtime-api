package com.mealtime.store.web.rest;

import static com.mealtime.store.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mealtime.store.IntegrationTest;
import com.mealtime.store.domain.ShoppingCart;
import com.mealtime.store.repository.ShoppingCartRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ShoppingCartResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ShoppingCartResourceIT {

    private static final Instant DEFAULT_PLACED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PLACED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_QUANTITY = 0;
    private static final Integer UPDATED_QUANTITY = 1;

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(1);

    private static final String ENTITY_API_URL = "/api/shopping-carts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShoppingCartMockMvc;

    private ShoppingCart shoppingCart;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShoppingCart createEntity(EntityManager em) {
        ShoppingCart shoppingCart = new ShoppingCart().placedDate(DEFAULT_PLACED_DATE).quantity(DEFAULT_QUANTITY).price(DEFAULT_PRICE);
        return shoppingCart;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShoppingCart createUpdatedEntity(EntityManager em) {
        ShoppingCart shoppingCart = new ShoppingCart().placedDate(UPDATED_PLACED_DATE).quantity(UPDATED_QUANTITY).price(UPDATED_PRICE);
        return shoppingCart;
    }

    @BeforeEach
    public void initTest() {
        shoppingCart = createEntity(em);
    }

    @Test
    @Transactional
    void createShoppingCart() throws Exception {
        int databaseSizeBeforeCreate = shoppingCartRepository.findAll().size();
        // Create the ShoppingCart
        restShoppingCartMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shoppingCart)))
            .andExpect(status().isCreated());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeCreate + 1);
        ShoppingCart testShoppingCart = shoppingCartList.get(shoppingCartList.size() - 1);
        assertThat(testShoppingCart.getPlacedDate()).isEqualTo(DEFAULT_PLACED_DATE);
        assertThat(testShoppingCart.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testShoppingCart.getPrice()).isEqualByComparingTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    void createShoppingCartWithExistingId() throws Exception {
        // Create the ShoppingCart with an existing ID
        shoppingCart.setId(1L);

        int databaseSizeBeforeCreate = shoppingCartRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restShoppingCartMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shoppingCart)))
            .andExpect(status().isBadRequest());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllShoppingCarts() throws Exception {
        // Initialize the database
        shoppingCartRepository.saveAndFlush(shoppingCart);

        // Get all the shoppingCartList
        restShoppingCartMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shoppingCart.getId().intValue())))
            .andExpect(jsonPath("$.[*].placedDate").value(hasItem(DEFAULT_PLACED_DATE.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(sameNumber(DEFAULT_PRICE))));
    }

    @Test
    @Transactional
    void getShoppingCart() throws Exception {
        // Initialize the database
        shoppingCartRepository.saveAndFlush(shoppingCart);

        // Get the shoppingCart
        restShoppingCartMockMvc
            .perform(get(ENTITY_API_URL_ID, shoppingCart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shoppingCart.getId().intValue()))
            .andExpect(jsonPath("$.placedDate").value(DEFAULT_PLACED_DATE.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.price").value(sameNumber(DEFAULT_PRICE)));
    }

    @Test
    @Transactional
    void getNonExistingShoppingCart() throws Exception {
        // Get the shoppingCart
        restShoppingCartMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingShoppingCart() throws Exception {
        // Initialize the database
        shoppingCartRepository.saveAndFlush(shoppingCart);

        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();

        // Update the shoppingCart
        ShoppingCart updatedShoppingCart = shoppingCartRepository.findById(shoppingCart.getId()).get();
        // Disconnect from session so that the updates on updatedShoppingCart are not directly saved in db
        em.detach(updatedShoppingCart);
        updatedShoppingCart.placedDate(UPDATED_PLACED_DATE).quantity(UPDATED_QUANTITY).price(UPDATED_PRICE);

        restShoppingCartMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedShoppingCart.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedShoppingCart))
            )
            .andExpect(status().isOk());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
        ShoppingCart testShoppingCart = shoppingCartList.get(shoppingCartList.size() - 1);
        assertThat(testShoppingCart.getPlacedDate()).isEqualTo(UPDATED_PLACED_DATE);
        assertThat(testShoppingCart.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testShoppingCart.getPrice()).isEqualByComparingTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    void putNonExistingShoppingCart() throws Exception {
        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();
        shoppingCart.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShoppingCartMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shoppingCart.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shoppingCart))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchShoppingCart() throws Exception {
        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();
        shoppingCart.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShoppingCartMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shoppingCart))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamShoppingCart() throws Exception {
        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();
        shoppingCart.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShoppingCartMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shoppingCart)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateShoppingCartWithPatch() throws Exception {
        // Initialize the database
        shoppingCartRepository.saveAndFlush(shoppingCart);

        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();

        // Update the shoppingCart using partial update
        ShoppingCart partialUpdatedShoppingCart = new ShoppingCart();
        partialUpdatedShoppingCart.setId(shoppingCart.getId());

        partialUpdatedShoppingCart.quantity(UPDATED_QUANTITY);

        restShoppingCartMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShoppingCart.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShoppingCart))
            )
            .andExpect(status().isOk());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
        ShoppingCart testShoppingCart = shoppingCartList.get(shoppingCartList.size() - 1);
        assertThat(testShoppingCart.getPlacedDate()).isEqualTo(DEFAULT_PLACED_DATE);
        assertThat(testShoppingCart.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testShoppingCart.getPrice()).isEqualByComparingTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    void fullUpdateShoppingCartWithPatch() throws Exception {
        // Initialize the database
        shoppingCartRepository.saveAndFlush(shoppingCart);

        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();

        // Update the shoppingCart using partial update
        ShoppingCart partialUpdatedShoppingCart = new ShoppingCart();
        partialUpdatedShoppingCart.setId(shoppingCart.getId());

        partialUpdatedShoppingCart.placedDate(UPDATED_PLACED_DATE).quantity(UPDATED_QUANTITY).price(UPDATED_PRICE);

        restShoppingCartMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShoppingCart.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShoppingCart))
            )
            .andExpect(status().isOk());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
        ShoppingCart testShoppingCart = shoppingCartList.get(shoppingCartList.size() - 1);
        assertThat(testShoppingCart.getPlacedDate()).isEqualTo(UPDATED_PLACED_DATE);
        assertThat(testShoppingCart.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testShoppingCart.getPrice()).isEqualByComparingTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    void patchNonExistingShoppingCart() throws Exception {
        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();
        shoppingCart.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShoppingCartMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, shoppingCart.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shoppingCart))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchShoppingCart() throws Exception {
        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();
        shoppingCart.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShoppingCartMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shoppingCart))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamShoppingCart() throws Exception {
        int databaseSizeBeforeUpdate = shoppingCartRepository.findAll().size();
        shoppingCart.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShoppingCartMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(shoppingCart))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ShoppingCart in the database
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteShoppingCart() throws Exception {
        // Initialize the database
        shoppingCartRepository.saveAndFlush(shoppingCart);

        int databaseSizeBeforeDelete = shoppingCartRepository.findAll().size();

        // Delete the shoppingCart
        restShoppingCartMockMvc
            .perform(delete(ENTITY_API_URL_ID, shoppingCart.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ShoppingCart> shoppingCartList = shoppingCartRepository.findAll();
        assertThat(shoppingCartList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
