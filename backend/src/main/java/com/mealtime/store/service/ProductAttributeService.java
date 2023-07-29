package com.mealtime.store.service;

import com.mealtime.store.domain.ProductAttribute;
import com.mealtime.store.repository.ProductAttributeRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ProductAttribute}.
 */
@Service
@Transactional
public class ProductAttributeService {

    private final Logger log = LoggerFactory.getLogger(ProductAttributeService.class);

    private final ProductAttributeRepository productAttributeRepository;

    public ProductAttributeService(ProductAttributeRepository productAttributeRepository) {
        this.productAttributeRepository = productAttributeRepository;
    }

    /**
     * Save a productAttribute.
     *
     * @param productAttribute the entity to save.
     * @return the persisted entity.
     */
    public ProductAttribute save(ProductAttribute productAttribute) {
        log.debug("Request to save ProductAttribute : {}", productAttribute);
        return productAttributeRepository.save(productAttribute);
    }

    /**
     * Update a productAttribute.
     *
     * @param productAttribute the entity to save.
     * @return the persisted entity.
     */
    public ProductAttribute update(ProductAttribute productAttribute) {
        log.debug("Request to update ProductAttribute : {}", productAttribute);
        return productAttributeRepository.save(productAttribute);
    }

    /**
     * Partially update a productAttribute.
     *
     * @param productAttribute the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProductAttribute> partialUpdate(ProductAttribute productAttribute) {
        log.debug("Request to partially update ProductAttribute : {}", productAttribute);

        return productAttributeRepository
            .findById(productAttribute.getId())
            .map(existingProductAttribute -> {
                if (productAttribute.getName() != null) {
                    existingProductAttribute.setName(productAttribute.getName());
                }
                if (productAttribute.getValue() != null) {
                    existingProductAttribute.setValue(productAttribute.getValue());
                }
                if (productAttribute.getPriceExtra() != null) {
                    existingProductAttribute.setPriceExtra(productAttribute.getPriceExtra());
                }

                return existingProductAttribute;
            })
            .map(productAttributeRepository::save);
    }

    /**
     * Get all the productAttributes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ProductAttribute> findAll(Pageable pageable) {
        log.debug("Request to get all ProductAttributes");
        return productAttributeRepository.findAll(pageable);
    }

    /**
     * Get one productAttribute by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductAttribute> findOne(Long id) {
        log.debug("Request to get ProductAttribute : {}", id);
        return productAttributeRepository.findById(id);
    }

    /**
     * Delete the productAttribute by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductAttribute : {}", id);
        productAttributeRepository.deleteById(id);
    }
}
