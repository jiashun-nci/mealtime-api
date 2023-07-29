package com.mealtime.store.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mealtime.store.IntegrationTest;
import com.mealtime.store.domain.Rider;
import com.mealtime.store.repository.RiderRepository;
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
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link RiderResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RiderResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_AVATAR = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_AVATAR = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_AVATAR_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_AVATAR_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/riders";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RiderRepository riderRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRiderMockMvc;

    private Rider rider;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rider createEntity(EntityManager em) {
        Rider rider = new Rider()
            .name(DEFAULT_NAME)
            .phone(DEFAULT_PHONE)
            .avatar(DEFAULT_AVATAR)
            .avatarContentType(DEFAULT_AVATAR_CONTENT_TYPE);
        return rider;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rider createUpdatedEntity(EntityManager em) {
        Rider rider = new Rider()
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE)
            .avatar(UPDATED_AVATAR)
            .avatarContentType(UPDATED_AVATAR_CONTENT_TYPE);
        return rider;
    }

    @BeforeEach
    public void initTest() {
        rider = createEntity(em);
    }

    @Test
    @Transactional
    void createRider() throws Exception {
        int databaseSizeBeforeCreate = riderRepository.findAll().size();
        // Create the Rider
        restRiderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rider)))
            .andExpect(status().isCreated());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeCreate + 1);
        Rider testRider = riderList.get(riderList.size() - 1);
        assertThat(testRider.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRider.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testRider.getAvatar()).isEqualTo(DEFAULT_AVATAR);
        assertThat(testRider.getAvatarContentType()).isEqualTo(DEFAULT_AVATAR_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createRiderWithExistingId() throws Exception {
        // Create the Rider with an existing ID
        rider.setId(1L);

        int databaseSizeBeforeCreate = riderRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRiderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rider)))
            .andExpect(status().isBadRequest());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = riderRepository.findAll().size();
        // set the field null
        rider.setName(null);

        // Create the Rider, which fails.

        restRiderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rider)))
            .andExpect(status().isBadRequest());

        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = riderRepository.findAll().size();
        // set the field null
        rider.setPhone(null);

        // Create the Rider, which fails.

        restRiderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rider)))
            .andExpect(status().isBadRequest());

        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllRiders() throws Exception {
        // Initialize the database
        riderRepository.saveAndFlush(rider);

        // Get all the riderList
        restRiderMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rider.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].avatarContentType").value(hasItem(DEFAULT_AVATAR_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].avatar").value(hasItem(Base64Utils.encodeToString(DEFAULT_AVATAR))));
    }

    @Test
    @Transactional
    void getRider() throws Exception {
        // Initialize the database
        riderRepository.saveAndFlush(rider);

        // Get the rider
        restRiderMockMvc
            .perform(get(ENTITY_API_URL_ID, rider.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rider.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.avatarContentType").value(DEFAULT_AVATAR_CONTENT_TYPE))
            .andExpect(jsonPath("$.avatar").value(Base64Utils.encodeToString(DEFAULT_AVATAR)));
    }

    @Test
    @Transactional
    void getNonExistingRider() throws Exception {
        // Get the rider
        restRiderMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRider() throws Exception {
        // Initialize the database
        riderRepository.saveAndFlush(rider);

        int databaseSizeBeforeUpdate = riderRepository.findAll().size();

        // Update the rider
        Rider updatedRider = riderRepository.findById(rider.getId()).get();
        // Disconnect from session so that the updates on updatedRider are not directly saved in db
        em.detach(updatedRider);
        updatedRider.name(UPDATED_NAME).phone(UPDATED_PHONE).avatar(UPDATED_AVATAR).avatarContentType(UPDATED_AVATAR_CONTENT_TYPE);

        restRiderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRider.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRider))
            )
            .andExpect(status().isOk());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
        Rider testRider = riderList.get(riderList.size() - 1);
        assertThat(testRider.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRider.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testRider.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testRider.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingRider() throws Exception {
        int databaseSizeBeforeUpdate = riderRepository.findAll().size();
        rider.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRiderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, rider.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rider))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRider() throws Exception {
        int databaseSizeBeforeUpdate = riderRepository.findAll().size();
        rider.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRiderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rider))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRider() throws Exception {
        int databaseSizeBeforeUpdate = riderRepository.findAll().size();
        rider.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRiderMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rider)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRiderWithPatch() throws Exception {
        // Initialize the database
        riderRepository.saveAndFlush(rider);

        int databaseSizeBeforeUpdate = riderRepository.findAll().size();

        // Update the rider using partial update
        Rider partialUpdatedRider = new Rider();
        partialUpdatedRider.setId(rider.getId());

        partialUpdatedRider.name(UPDATED_NAME).avatar(UPDATED_AVATAR).avatarContentType(UPDATED_AVATAR_CONTENT_TYPE);

        restRiderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRider.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRider))
            )
            .andExpect(status().isOk());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
        Rider testRider = riderList.get(riderList.size() - 1);
        assertThat(testRider.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRider.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testRider.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testRider.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateRiderWithPatch() throws Exception {
        // Initialize the database
        riderRepository.saveAndFlush(rider);

        int databaseSizeBeforeUpdate = riderRepository.findAll().size();

        // Update the rider using partial update
        Rider partialUpdatedRider = new Rider();
        partialUpdatedRider.setId(rider.getId());

        partialUpdatedRider.name(UPDATED_NAME).phone(UPDATED_PHONE).avatar(UPDATED_AVATAR).avatarContentType(UPDATED_AVATAR_CONTENT_TYPE);

        restRiderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRider.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRider))
            )
            .andExpect(status().isOk());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
        Rider testRider = riderList.get(riderList.size() - 1);
        assertThat(testRider.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRider.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testRider.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testRider.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingRider() throws Exception {
        int databaseSizeBeforeUpdate = riderRepository.findAll().size();
        rider.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRiderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, rider.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rider))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRider() throws Exception {
        int databaseSizeBeforeUpdate = riderRepository.findAll().size();
        rider.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRiderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rider))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRider() throws Exception {
        int databaseSizeBeforeUpdate = riderRepository.findAll().size();
        rider.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRiderMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(rider)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rider in the database
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRider() throws Exception {
        // Initialize the database
        riderRepository.saveAndFlush(rider);

        int databaseSizeBeforeDelete = riderRepository.findAll().size();

        // Delete the rider
        restRiderMockMvc
            .perform(delete(ENTITY_API_URL_ID, rider.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rider> riderList = riderRepository.findAll();
        assertThat(riderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
