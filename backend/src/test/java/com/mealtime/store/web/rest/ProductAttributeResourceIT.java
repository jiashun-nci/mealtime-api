package com.mealtime.store.web.rest;

import static com.mealtime.store.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mealtime.store.IntegrationTest;
import com.mealtime.store.domain.ProductAttribute;
import com.mealtime.store.repository.ProductAttributeRepository;
import java.math.BigDecimal;
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
 * Integration tests for the {@link ProductAttributeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProductAttributeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE_EXTRA = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRICE_EXTRA = new BigDecimal(1);

    private static final String ENTITY_API_URL = "/api/product-attributes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProductAttributeRepository productAttributeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductAttributeMockMvc;

    private ProductAttribute productAttribute;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductAttribute createEntity(EntityManager em) {
        ProductAttribute productAttribute = new ProductAttribute().name(DEFAULT_NAME).value(DEFAULT_VALUE).priceExtra(DEFAULT_PRICE_EXTRA);
        return productAttribute;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductAttribute createUpdatedEntity(EntityManager em) {
        ProductAttribute productAttribute = new ProductAttribute().name(UPDATED_NAME).value(UPDATED_VALUE).priceExtra(UPDATED_PRICE_EXTRA);
        return productAttribute;
    }

    @BeforeEach
    public void initTest() {
        productAttribute = createEntity(em);
    }

    @Test
    @Transactional
    void createProductAttribute() throws Exception {
        int databaseSizeBeforeCreate = productAttributeRepository.findAll().size();
        // Create the ProductAttribute
        restProductAttributeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isCreated());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeCreate + 1);
        ProductAttribute testProductAttribute = productAttributeList.get(productAttributeList.size() - 1);
        assertThat(testProductAttribute.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProductAttribute.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testProductAttribute.getPriceExtra()).isEqualByComparingTo(DEFAULT_PRICE_EXTRA);
    }

    @Test
    @Transactional
    void createProductAttributeWithExistingId() throws Exception {
        // Create the ProductAttribute with an existing ID
        productAttribute.setId(1L);

        int databaseSizeBeforeCreate = productAttributeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductAttributeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = productAttributeRepository.findAll().size();
        // set the field null
        productAttribute.setName(null);

        // Create the ProductAttribute, which fails.

        restProductAttributeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isBadRequest());

        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPriceExtraIsRequired() throws Exception {
        int databaseSizeBeforeTest = productAttributeRepository.findAll().size();
        // set the field null
        productAttribute.setPriceExtra(null);

        // Create the ProductAttribute, which fails.

        restProductAttributeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isBadRequest());

        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllProductAttributes() throws Exception {
        // Initialize the database
        productAttributeRepository.saveAndFlush(productAttribute);

        // Get all the productAttributeList
        restProductAttributeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productAttribute.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].priceExtra").value(hasItem(sameNumber(DEFAULT_PRICE_EXTRA))));
    }

    @Test
    @Transactional
    void getProductAttribute() throws Exception {
        // Initialize the database
        productAttributeRepository.saveAndFlush(productAttribute);

        // Get the productAttribute
        restProductAttributeMockMvc
            .perform(get(ENTITY_API_URL_ID, productAttribute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productAttribute.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.priceExtra").value(sameNumber(DEFAULT_PRICE_EXTRA)));
    }

    @Test
    @Transactional
    void getNonExistingProductAttribute() throws Exception {
        // Get the productAttribute
        restProductAttributeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingProductAttribute() throws Exception {
        // Initialize the database
        productAttributeRepository.saveAndFlush(productAttribute);

        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();

        // Update the productAttribute
        ProductAttribute updatedProductAttribute = productAttributeRepository.findById(productAttribute.getId()).get();
        // Disconnect from session so that the updates on updatedProductAttribute are not directly saved in db
        em.detach(updatedProductAttribute);
        updatedProductAttribute.name(UPDATED_NAME).value(UPDATED_VALUE).priceExtra(UPDATED_PRICE_EXTRA);

        restProductAttributeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProductAttribute.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProductAttribute))
            )
            .andExpect(status().isOk());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
        ProductAttribute testProductAttribute = productAttributeList.get(productAttributeList.size() - 1);
        assertThat(testProductAttribute.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProductAttribute.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testProductAttribute.getPriceExtra()).isEqualByComparingTo(UPDATED_PRICE_EXTRA);
    }

    @Test
    @Transactional
    void putNonExistingProductAttribute() throws Exception {
        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();
        productAttribute.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductAttributeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, productAttribute.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProductAttribute() throws Exception {
        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();
        productAttribute.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductAttributeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProductAttribute() throws Exception {
        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();
        productAttribute.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductAttributeMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProductAttributeWithPatch() throws Exception {
        // Initialize the database
        productAttributeRepository.saveAndFlush(productAttribute);

        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();

        // Update the productAttribute using partial update
        ProductAttribute partialUpdatedProductAttribute = new ProductAttribute();
        partialUpdatedProductAttribute.setId(productAttribute.getId());

        partialUpdatedProductAttribute.value(UPDATED_VALUE).priceExtra(UPDATED_PRICE_EXTRA);

        restProductAttributeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProductAttribute.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProductAttribute))
            )
            .andExpect(status().isOk());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
        ProductAttribute testProductAttribute = productAttributeList.get(productAttributeList.size() - 1);
        assertThat(testProductAttribute.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProductAttribute.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testProductAttribute.getPriceExtra()).isEqualByComparingTo(UPDATED_PRICE_EXTRA);
    }

    @Test
    @Transactional
    void fullUpdateProductAttributeWithPatch() throws Exception {
        // Initialize the database
        productAttributeRepository.saveAndFlush(productAttribute);

        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();

        // Update the productAttribute using partial update
        ProductAttribute partialUpdatedProductAttribute = new ProductAttribute();
        partialUpdatedProductAttribute.setId(productAttribute.getId());

        partialUpdatedProductAttribute.name(UPDATED_NAME).value(UPDATED_VALUE).priceExtra(UPDATED_PRICE_EXTRA);

        restProductAttributeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProductAttribute.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProductAttribute))
            )
            .andExpect(status().isOk());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
        ProductAttribute testProductAttribute = productAttributeList.get(productAttributeList.size() - 1);
        assertThat(testProductAttribute.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProductAttribute.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testProductAttribute.getPriceExtra()).isEqualByComparingTo(UPDATED_PRICE_EXTRA);
    }

    @Test
    @Transactional
    void patchNonExistingProductAttribute() throws Exception {
        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();
        productAttribute.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductAttributeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, productAttribute.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProductAttribute() throws Exception {
        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();
        productAttribute.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductAttributeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProductAttribute() throws Exception {
        int databaseSizeBeforeUpdate = productAttributeRepository.findAll().size();
        productAttribute.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductAttributeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productAttribute))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProductAttribute in the database
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProductAttribute() throws Exception {
        // Initialize the database
        productAttributeRepository.saveAndFlush(productAttribute);

        int databaseSizeBeforeDelete = productAttributeRepository.findAll().size();

        // Delete the productAttribute
        restProductAttributeMockMvc
            .perform(delete(ENTITY_API_URL_ID, productAttribute.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductAttribute> productAttributeList = productAttributeRepository.findAll();
        assertThat(productAttributeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
