package com.mealtime.store.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mealtime.store.IntegrationTest;
import com.mealtime.store.domain.CustomerDetails;
import com.mealtime.store.domain.User;
import com.mealtime.store.domain.enumeration.Gender;
import com.mealtime.store.repository.CustomerDetailsRepository;
import com.mealtime.store.service.CustomerDetailsService;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link CustomerDetailsResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CustomerDetailsResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTHDAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTHDAY = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_AVATAR = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_AVATAR = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_AVATAR_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_AVATAR_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/customer-details";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;

    @Mock
    private CustomerDetailsRepository customerDetailsRepositoryMock;

    @Mock
    private CustomerDetailsService customerDetailsServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerDetailsMockMvc;

    private CustomerDetails customerDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerDetails createEntity(EntityManager em) {
        CustomerDetails customerDetails = new CustomerDetails()
            .name(DEFAULT_NAME)
            .gender(DEFAULT_GENDER)
            .phone(DEFAULT_PHONE)
            .birthday(DEFAULT_BIRTHDAY)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY)
            .avatar(DEFAULT_AVATAR)
            .avatarContentType(DEFAULT_AVATAR_CONTENT_TYPE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        customerDetails.setUser(user);
        return customerDetails;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerDetails createUpdatedEntity(EntityManager em) {
        CustomerDetails customerDetails = new CustomerDetails()
            .name(UPDATED_NAME)
            .gender(UPDATED_GENDER)
            .phone(UPDATED_PHONE)
            .birthday(UPDATED_BIRTHDAY)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .avatar(UPDATED_AVATAR)
            .avatarContentType(UPDATED_AVATAR_CONTENT_TYPE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        customerDetails.setUser(user);
        return customerDetails;
    }

    @BeforeEach
    public void initTest() {
        customerDetails = createEntity(em);
    }

    @Test
    @Transactional
    void createCustomerDetails() throws Exception {
        int databaseSizeBeforeCreate = customerDetailsRepository.findAll().size();
        // Create the CustomerDetails
        restCustomerDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isCreated());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerDetails testCustomerDetails = customerDetailsList.get(customerDetailsList.size() - 1);
        assertThat(testCustomerDetails.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCustomerDetails.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testCustomerDetails.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testCustomerDetails.getBirthday()).isEqualTo(DEFAULT_BIRTHDAY);
        assertThat(testCustomerDetails.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testCustomerDetails.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testCustomerDetails.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testCustomerDetails.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testCustomerDetails.getAvatar()).isEqualTo(DEFAULT_AVATAR);
        assertThat(testCustomerDetails.getAvatarContentType()).isEqualTo(DEFAULT_AVATAR_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createCustomerDetailsWithExistingId() throws Exception {
        // Create the CustomerDetails with an existing ID
        customerDetails.setId(1L);

        int databaseSizeBeforeCreate = customerDetailsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerDetailsRepository.findAll().size();
        // set the field null
        customerDetails.setName(null);

        // Create the CustomerDetails, which fails.

        restCustomerDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isBadRequest());

        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCustomerDetails() throws Exception {
        // Initialize the database
        customerDetailsRepository.saveAndFlush(customerDetails);

        // Get all the customerDetailsList
        restCustomerDetailsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].birthday").value(hasItem(DEFAULT_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1)))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].avatarContentType").value(hasItem(DEFAULT_AVATAR_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].avatar").value(hasItem(Base64Utils.encodeToString(DEFAULT_AVATAR))));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCustomerDetailsWithEagerRelationshipsIsEnabled() throws Exception {
        when(customerDetailsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCustomerDetailsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(customerDetailsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCustomerDetailsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(customerDetailsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCustomerDetailsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(customerDetailsRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getCustomerDetails() throws Exception {
        // Initialize the database
        customerDetailsRepository.saveAndFlush(customerDetails);

        // Get the customerDetails
        restCustomerDetailsMockMvc
            .perform(get(ENTITY_API_URL_ID, customerDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customerDetails.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.birthday").value(DEFAULT_BIRTHDAY.toString()))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.avatarContentType").value(DEFAULT_AVATAR_CONTENT_TYPE))
            .andExpect(jsonPath("$.avatar").value(Base64Utils.encodeToString(DEFAULT_AVATAR)));
    }

    @Test
    @Transactional
    void getNonExistingCustomerDetails() throws Exception {
        // Get the customerDetails
        restCustomerDetailsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCustomerDetails() throws Exception {
        // Initialize the database
        customerDetailsRepository.saveAndFlush(customerDetails);

        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();

        // Update the customerDetails
        CustomerDetails updatedCustomerDetails = customerDetailsRepository.findById(customerDetails.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerDetails are not directly saved in db
        em.detach(updatedCustomerDetails);
        updatedCustomerDetails
            .name(UPDATED_NAME)
            .gender(UPDATED_GENDER)
            .phone(UPDATED_PHONE)
            .birthday(UPDATED_BIRTHDAY)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .avatar(UPDATED_AVATAR)
            .avatarContentType(UPDATED_AVATAR_CONTENT_TYPE);

        restCustomerDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCustomerDetails.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCustomerDetails))
            )
            .andExpect(status().isOk());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
        CustomerDetails testCustomerDetails = customerDetailsList.get(customerDetailsList.size() - 1);
        assertThat(testCustomerDetails.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCustomerDetails.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testCustomerDetails.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testCustomerDetails.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testCustomerDetails.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testCustomerDetails.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testCustomerDetails.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testCustomerDetails.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testCustomerDetails.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testCustomerDetails.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingCustomerDetails() throws Exception {
        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();
        customerDetails.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, customerDetails.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCustomerDetails() throws Exception {
        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();
        customerDetails.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCustomerDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCustomerDetails() throws Exception {
        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();
        customerDetails.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCustomerDetailsMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCustomerDetailsWithPatch() throws Exception {
        // Initialize the database
        customerDetailsRepository.saveAndFlush(customerDetails);

        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();

        // Update the customerDetails using partial update
        CustomerDetails partialUpdatedCustomerDetails = new CustomerDetails();
        partialUpdatedCustomerDetails.setId(customerDetails.getId());

        partialUpdatedCustomerDetails
            .gender(UPDATED_GENDER)
            .phone(UPDATED_PHONE)
            .birthday(UPDATED_BIRTHDAY)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .avatar(UPDATED_AVATAR)
            .avatarContentType(UPDATED_AVATAR_CONTENT_TYPE);

        restCustomerDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCustomerDetails.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCustomerDetails))
            )
            .andExpect(status().isOk());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
        CustomerDetails testCustomerDetails = customerDetailsList.get(customerDetailsList.size() - 1);
        assertThat(testCustomerDetails.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCustomerDetails.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testCustomerDetails.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testCustomerDetails.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testCustomerDetails.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testCustomerDetails.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testCustomerDetails.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testCustomerDetails.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testCustomerDetails.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testCustomerDetails.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateCustomerDetailsWithPatch() throws Exception {
        // Initialize the database
        customerDetailsRepository.saveAndFlush(customerDetails);

        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();

        // Update the customerDetails using partial update
        CustomerDetails partialUpdatedCustomerDetails = new CustomerDetails();
        partialUpdatedCustomerDetails.setId(customerDetails.getId());

        partialUpdatedCustomerDetails
            .name(UPDATED_NAME)
            .gender(UPDATED_GENDER)
            .phone(UPDATED_PHONE)
            .birthday(UPDATED_BIRTHDAY)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .avatar(UPDATED_AVATAR)
            .avatarContentType(UPDATED_AVATAR_CONTENT_TYPE);

        restCustomerDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCustomerDetails.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCustomerDetails))
            )
            .andExpect(status().isOk());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
        CustomerDetails testCustomerDetails = customerDetailsList.get(customerDetailsList.size() - 1);
        assertThat(testCustomerDetails.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCustomerDetails.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testCustomerDetails.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testCustomerDetails.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testCustomerDetails.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testCustomerDetails.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testCustomerDetails.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testCustomerDetails.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testCustomerDetails.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testCustomerDetails.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingCustomerDetails() throws Exception {
        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();
        customerDetails.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, customerDetails.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCustomerDetails() throws Exception {
        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();
        customerDetails.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCustomerDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCustomerDetails() throws Exception {
        int databaseSizeBeforeUpdate = customerDetailsRepository.findAll().size();
        customerDetails.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCustomerDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(customerDetails))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CustomerDetails in the database
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCustomerDetails() throws Exception {
        // Initialize the database
        customerDetailsRepository.saveAndFlush(customerDetails);

        int databaseSizeBeforeDelete = customerDetailsRepository.findAll().size();

        // Delete the customerDetails
        restCustomerDetailsMockMvc
            .perform(delete(ENTITY_API_URL_ID, customerDetails.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomerDetails> customerDetailsList = customerDetailsRepository.findAll();
        assertThat(customerDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
