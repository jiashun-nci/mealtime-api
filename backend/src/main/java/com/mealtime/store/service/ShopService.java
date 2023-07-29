package com.mealtime.store.service;

import com.mealtime.store.domain.Shop;
import com.mealtime.store.repository.ShopRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Shop}.
 */
@Service
@Transactional
public class ShopService {

    private final Logger log = LoggerFactory.getLogger(ShopService.class);

    private final ShopRepository shopRepository;

    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    /**
     * Save a shop.
     *
     * @param shop the entity to save.
     * @return the persisted entity.
     */
    public Shop save(Shop shop) {
        log.debug("Request to save Shop : {}", shop);
        return shopRepository.save(shop);
    }

    /**
     * Update a shop.
     *
     * @param shop the entity to save.
     * @return the persisted entity.
     */
    public Shop update(Shop shop) {
        log.debug("Request to update Shop : {}", shop);
        return shopRepository.save(shop);
    }

    /**
     * Partially update a shop.
     *
     * @param shop the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Shop> partialUpdate(Shop shop) {
        log.debug("Request to partially update Shop : {}", shop);

        return shopRepository
            .findById(shop.getId())
            .map(existingShop -> {
                if (shop.getName() != null) {
                    existingShop.setName(shop.getName());
                }
                if (shop.getPhone() != null) {
                    existingShop.setPhone(shop.getPhone());
                }
                if (shop.getAddressLine1() != null) {
                    existingShop.setAddressLine1(shop.getAddressLine1());
                }
                if (shop.getAddressLine2() != null) {
                    existingShop.setAddressLine2(shop.getAddressLine2());
                }
                if (shop.getCity() != null) {
                    existingShop.setCity(shop.getCity());
                }
                if (shop.getCountry() != null) {
                    existingShop.setCountry(shop.getCountry());
                }
                if (shop.getShopImage() != null) {
                    existingShop.setShopImage(shop.getShopImage());
                }
                if (shop.getShopImageContentType() != null) {
                    existingShop.setShopImageContentType(shop.getShopImageContentType());
                }
                if (shop.getDeliveryFee() != null) {
                    existingShop.setDeliveryFee(shop.getDeliveryFee());
                }

                return existingShop;
            })
            .map(shopRepository::save);
    }

    /**
     * Get all the shops.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Shop> findAll(Pageable pageable) {
        log.debug("Request to get all Shops");
        return shopRepository.findAll(pageable);
    }

    /**
     * Get all the shops with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Shop> findAllWithEagerRelationships(Pageable pageable) {
        return shopRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one shop by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Shop> findOne(Long id) {
        log.debug("Request to get Shop : {}", id);
        return shopRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the shop by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Shop : {}", id);
        shopRepository.deleteById(id);
    }
}
